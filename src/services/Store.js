import {
  ELEMENT_TYPE_FIXED_EXPENSE,
  ELEMENT_TYPE_SPENDING
} from '../constants'

import firebase from 'firebase'

class Store {
  constructor () {
    console.log('created')
    this.debug = true
    this.user = null
    this.state = {
      settings: {
        spendings: [],
        salaryDay: 1,
        salary: 0,
        fixedExpenses: [],
        currency: 'CZK',
        language: 'Czech'
      },
      timestamp: null
    }
    if (localStorage.state) {
      console.log('checking localstorage')
      const localState = JSON.parse(localStorage.state)
      const ts = new Date(localState.timestamp)
      if (ts > this.state.timestamp) {
        console.log('updating from local storage')
        this.state = { ...this.state, ...localState }
      }
    }

    setTimeout(() => {
      const user = firebase.auth().currentUser
      if (user && user.uid) {
        console.log('checking firebase')
        const stateRef = firebase.database().ref('users/' + user.uid + '/state')
        stateRef.once('value', stateSnapshot => {
          if (stateSnapshot.exists()) {
            const ts = new Date(stateSnapshot.timestamp)
            if (ts > this.state.timestamp) {
              console.log('Updating from firebase')
              this.state = { ...this.state, ...stateSnapshot }
            }
          }
        })
      }
    }, 1000)
  }

  setUser (user) {
    this.user = user
  }

  addFixedExpense (name, price) {
    this.state.settings.fixedExpenses.push(
      {
        id: this.state.settings.fixedExpenses.length + 1,
        name,
        price,
        currency: this.state.settings.currency,
        type: ELEMENT_TYPE_FIXED_EXPENSE
      }
    )
    this.updateTimestamp()
  }

  removeFixedExpense (id) {
    const expenses = this.state.settings.fixedExpenses
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].id === id) {
        expenses.splice(expenses.indexOf(expenses[i]), 1)
        break
      }
    }
    this.updateTimestamp()
  }

  editFixedExpense (id, name, price) {
    const expenses = this.state.settings.fixedExpenses
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].id === id) {
        expenses[i].name = name
        expenses[i].price = price
        break
      }
    }
    this.updateTimestamp()
  }

  addSpending (name, price) {
    this.state.settings.spendings.push({
      id: this.state.settings.spendings.length + 1,
      name,
      price,
      currency: this.state.settings.currency,
      date: new Date().toLocaleDateString(),
      type: ELEMENT_TYPE_SPENDING
    })
    this.updateTimestamp()
  }

  removeSpending (id) {
    const spendings = this.state.settings.spendings
    for (let i = 0; i < spendings.length; i++) {
      if (spendings[i].id === id) {
        spendings.splice(spendings.indexOf(spendings[i]), 1)
        break
      }
    }
    this.updateTimestamp()
  }

  editSpending (id, name, price) {
    const spendings = this.state.settings.spendings
    for (let i = 0; i < spendings.length; i++) {
      if (spendings[i].id === id) {
        spendings[i].name = name
        spendings[i].price = price
        break
      }
    }
    this.updateTimestamp()
  }

  async createOrSetUser () {
    const user = firebase.auth().currentUser

    const userRef = firebase.database().ref('users/' + user.uid)
    userRef.once('value', userSnapshot => {
      const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      }

      if (!userSnapshot.exists()) {
        userRef.set({
          user: userData
        })
      } else {
        userRef.update({
          user: userData
        })
      }
    })

    const storeRef = firebase.database().ref('users/' + user.uid + '/state')
    storeRef.once('value', storeSnapshot => {
      if (storeSnapshot.exists()) {
        this.state = { ...this.state, ...storeSnapshot.val() }
        this.updateTimestamp()
      }
    })

    this.user = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    }
  }

  updateTimestamp () {
    if (!this.state.settings.spendings || !this.state.settings.fixedExpenses) return
    this.state.timestamp = new Date()
    localStorage.state = JSON.stringify(this.state)
    firebase.database().ref('users/' + this.user.uid).update({ state: this.state })
  }
}

const store = new Store()
export default store

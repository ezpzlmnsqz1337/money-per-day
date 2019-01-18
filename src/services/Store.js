import firebase from 'firebase'

class Store {
  constructor () {
    console.log('created')
    this.debug = true
    this.user = null
    this.state = {
      settings: {
        spendings: [
          {
            name: 'Rohlík',
            price: '16',
            currency: 'CZK',
            date: new Date()
          }
        ],

        salaryDay: 1,
        salary: 0,
        fixedExpenses: [
          {
            name: 'Nájem',
            price: '11900',
            currency: 'CZK'
          }
        ],
        currency: 'CZK',
        language: 'Czech'
      },
      timestamp: null
    }
    if (localStorage.state) {
      console.log('checking localstorage')
      const localState = JSON.parse(localStorage.state)
      const ts = new Date(localState.timestamp)
      if (ts > this.state.timestamp) this.state = { ...this.state, ...localState }
    }

    setTimeout(() => {
      const user = firebase.auth().currentUser
      if (user.uid) {
        console.log('checking firebase')
        const stateRef = firebase.database().ref('users/' + user.uid + '/state')
        stateRef.once('value', stateSnapshot => {
          if (stateSnapshot.exists()) {
            console.log('firebase exists')
            const ts = new Date(stateSnapshot.timestamp)
            if (ts > this.state.timestamp) this.state = { ...this.state, ...stateSnapshot }
          }
        })
      }
    }, 1000)
  }

  setUser (user) {
    this.user = user
  }

  addSpending (name, price) {
    console.log('adding: ', name, price)
    this.state.settings.spendings.push({
      name,
      price,
      currency: this.state.settings.currency,
      date: new Date().toLocaleDateString()
    })
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
    storeRef.on('value', storeSnapshot => {
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
    this.state.timestamp = new Date()
    localStorage.state = JSON.stringify(this.state)
    firebase.database().ref('users/' + this.user.uid).update({ state: this.state })
  }
}

const store = new Store()
export default store

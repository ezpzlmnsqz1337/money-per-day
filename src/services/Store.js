import {
  ELEMENT_TYPE_FIXED_EXPENSE,
  ELEMENT_TYPE_SPENDING
} from '../constants'

import { db } from './DataProvider'

class Store {
  constructor () {
    console.log('created')
    this.debug = true
    this.user = null
    this.state = {}
  }

  init (user) {
    if (user) {
      this.user = user

      const userRef = db.collection('users').doc(user.uid)
      userRef.get().then(doc => {
        if (doc.exists) {
          if (!doc.data().state) {
            const state = {
              settings: {
                spendings: [],
                salaryDay: 1,
                salary: 0,
                fixedExpenses: [],
                currency: 'CZK',
                language: 'Czech'
              }
            }
            userRef.set({ state }, { merge: true })
          } else {
            this.state = doc.data().state
          }
        }
      })
    }
  }

  setUser (user) {
    this.user = user
  }

  _setUserSetting (settingName, settingValue) {
    const userRef = db.collection('users').doc(this.user.uid)
    userRef.get().then(doc => {
      if (doc.exists) {
        userRef.set({
          state: {
            settings: {
              [settingName]: settingValue
            }
          }
        },
        { merge: true })
      }
    })
  }

  setSalaryDay (salaryDay) {
    this._setUserSetting('salaryDay', salaryDay)
  }

  setSalary (salary) {
    this._setUserSetting('salary', salary)
  }

  setCurrency (currency) {
    this._setUserSetting('currency', currency)
  }

  addFixedExpense (name, price) {
    const userRef = db.collection('users').doc(this.user.uid)

    userRef.get().then(doc => {
      if (doc.exists) {
        doc.state.settings.fixedExpenses.push({
          name,
          price,
          currency: doc.state.settings.currency,
          type: ELEMENT_TYPE_FIXED_EXPENSE
        })
      } else {
        console.log('Fixed expenses does not exists')
      }
    })
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

  async createOrSetUser (user) {
    const userRef = db.collection('users').doc(user.uid)

    userRef.get().then(doc => {
      if (doc.exists) {
        this.init(user)
      } else {
        userRef.set({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        })
        this.user = user
      }
    })
  }
}

const store = new Store()
export default store

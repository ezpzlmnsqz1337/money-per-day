import {
  ELEMENT_TYPE_FIXED_EXPENSE,
  ELEMENT_TYPE_SPENDING
} from '../constants'

import firebase from 'firebase'
import { db } from './DataProvider'

class Store {
  init (user) {
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
      }
    })
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
    this._setUserSetting('salaryDay', parseInt(salaryDay))
  }

  setSalary (salary) {
    this._setUserSetting('salary', parseInt(salary))
  }

  setCurrency (currency) {
    this._setUserSetting('currency', currency)
  }

  addFixedExpense (name, price) {
    const uid = firebase.auth().currentUser.uid
    db.collection('settings').doc(uid).get().then(
      snapshot => {
        const currency = snapshot.data().currency

        db.collection('fixedExpenses').add({
          uid,
          name,
          price: parseFloat(price),
          currency,
          type: ELEMENT_TYPE_FIXED_EXPENSE
        })
      }
    )
  }

  removeFixedExpense (id) {
    db.collection('fixedExpenses').doc(id).delete().then(() => console.log('Fixed expense deleted'))
      .catch(err => console.log('Error while deleting fixed expense. ', err))
  }

  editFixedExpense (id, name, price) {
    db.collection('fixedExpenses').doc(id).update({ name, price: parseFloat(price) })
  }

  addSpending (name, price) {
    const uid = firebase.auth().currentUser.uid
    db.collection('settings').doc(uid).get().then(
      snapshot => {
        const currency = snapshot.data().currency

        db.collection('spendings').add({
          uid,
          name,
          price: parseFloat(price),
          currency,
          date: new Date(),
          type: ELEMENT_TYPE_SPENDING
        })
      }
    )
  }

  removeSpending (id) {
    db.collection('spendings').doc(id).delete().then(() => console.log('Spending deleted'))
      .catch(err => console.log('Error while deleting spending. ', err))
  }

  editSpending (id, name, price) {
    db.collection('spendings').doc(id).update({ name, price: parseFloat(price) })
  }
}

const store = new Store()
export default store

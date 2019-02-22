import {
  ELEMENT_TYPE_FIXED_EXPENSE,
  ELEMENT_TYPE_SPENDING,
  ELEMENT_TYPE_EXTRA_INCOME
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
              extraIncomes: [],
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

  addSpendingsImport (items) {
    const uid = firebase.auth().currentUser.uid

    const batch = db.batch()

    items.forEach(i => {
      const spendingsRef = db.collection('spendings').doc()
      batch.set(spendingsRef, {
        uid,
        name: i.name,
        price: parseFloat(i.price),
        currency: i.currency,
        date: i.date,
        type: ELEMENT_TYPE_SPENDING
      })
    })
    // Commit the batch
    batch.commit().then(() => {
      console.log(items.length + ' spendins have been imported.')
    })
  }

  removeSpending (id) {
    db.collection('spendings').doc(id).delete().then(() => console.log('Spending deleted'))
      .catch(err => console.log('Error while deleting spending. ', err))
  }

  editSpending (id, name, price) {
    db.collection('spendings').doc(id).update({ name, price: parseFloat(price) })
  }

  addExtraIncome (name, price) {
    const uid = firebase.auth().currentUser.uid
    db.collection('settings').doc(uid).get().then(
      snapshot => {
        const currency = snapshot.data().currency

        db.collection('extraIncomes').add({
          uid,
          name,
          price: parseFloat(price),
          currency,
          date: new Date(),
          type: ELEMENT_TYPE_EXTRA_INCOME
        })
      }
    )
  }

  addExtraIncomesImport (items) {
    const uid = firebase.auth().currentUser.uid

    const batch = db.batch()

    items.forEach(i => {
      const spendingsRef = db.collection('extraIncomes').doc()
      batch.set(spendingsRef, {
        uid,
        name: i.name,
        price: parseFloat(i.price),
        currency: i.currency,
        date: i.date,
        type: ELEMENT_TYPE_EXTRA_INCOME
      })
    })
    // Commit the batch
    batch.commit().then(() => {
      console.log(items.length + ' extra incomes have been imported.')
    })
  }

  removeExtraIncome (id) {
    db.collection('extraIncomes').doc(id).delete().then(() => console.log('Extra income deleted'))
      .catch(err => console.log('Error while deleting extra income. ', err))
  }

  editExtraIncome (id, name, price) {
    db.collection('extraIncomes').doc(id).update({ name, price: parseFloat(price) })
  }
}

const store = new Store()
export default store

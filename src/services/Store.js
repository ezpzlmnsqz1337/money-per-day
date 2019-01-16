import firebase from 'firebase'

class Store {
  constructor () {
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
  }

  setUser (user) {
    this.user = user
  }

  addSpending (name, price) {
    this.state.settings.spendings.push({
      name,
      price,
      currency: this.state.settings.currency,
      date: new Date().toLocaleDateString()
    })
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
      if (storeSnapshot.exists()) this.state = { ...this.state, ...storeSnapshot.val() }
    })

    this.user = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    }
  }
}

const store = new Store()
export default store

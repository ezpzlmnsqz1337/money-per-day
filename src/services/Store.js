import firebase from 'firebase'

class Store {
  constructor () {
    this.debug = true
    this.state = {
      user: null,
      settings: {
        salaryDay: 1,
        salary: 0,
        fixedExpenses: 0,
        currency: '€',
        language: 'Czech'
      }
    }
  }

  setUser (user) {
    this.state.user = user
  }

  createOrSetUser () {
    const user = firebase.auth().currentUser

    const userRef = firebase.database().ref('users/' + user.uid)
    userRef.once('value', userSnapshot => {
      const userData = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL
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
      console.log(storeSnapshot.val())
      if (storeSnapshot.exists()) this.state = { ...this.state, ...storeSnapshot.val() }
    })
  }
}

const store = new Store()
export default store

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import firebase from 'firebase'
import { config } from './services/DataProvider'
import store from './services/Store'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueFire)
Vue.use(firebase)

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore()

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.user) {
      console.log('There is a token, resume. (' + to.path + ')')
      next()
    } else {
      console.log('There is no token, redirect to login. (' + to.path + ')')
      next('login')
    }
  } else {
    console.log('You\'re on the login page')
    next()
  }
})

Object.defineProperty(Vue.prototype, '$store', { value: store })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  created: function () {
    firebase.initializeApp(config)
    firebase.auth().useDeviceLanguage()
    firebase.firestore().enablePersistence()
      .catch(err => {
        if (err.code === 'failed-precondition') {
          console.log('something wrong')
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
        } else if (err.code === 'unimplemented') {
          console.log('something else wrong')
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
        }
      })
    // Subsequent queries will use persistence, if it was enabled successfully
    this.authenticate()
  },
  data () {
    return {}
  },
  methods: {
    authenticate () {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          store.createOrSetUser()
          this.$router.push('/home')
        } else {
          this.$router.push('/login')
        }
      })
    }
  },
  components: { App },
  template: '<App/>'
})

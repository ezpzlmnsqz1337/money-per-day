// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import store from './services/Store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(firestorePlugin)

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (firebase.auth().currentUser) {
      console.log('There is a token, resume. (' + to.path + ')')
      next()
    } else {
      console.log('There is no token, redirect to login. (' + to.path + ')')
      next('login')
    }
  } else {
    console.log("You're on the login page")
    next()
  }
})

Object.defineProperty(Vue.prototype, '$store', { value: store })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },

  data: function() {
    return {}
  },

  created: function() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        await store.createOrSetUser(user)
        this.$router.push('/home')
      } else {
        this.$router.push('/login')
      }
    })
  },

  methods: {},
  vuetify,
  template: '<App/>'
})

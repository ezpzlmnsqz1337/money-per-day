// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import firebase from 'firebase'
import store from './services/Store'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueFire)
Vue.use(firebase)

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
    this.authenticate()
  },
  data: function () {
    return {}
  },
  methods: {
    authenticate () {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          store.createOrSetUser(user)
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

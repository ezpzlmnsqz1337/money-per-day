<template>
  <v-layout justify-center>
    <div>
      <div class="__header">
        <v-avatar size="16rem">
          <img v-bind:src="user.photoURL" alt="user icon">
        </v-avatar>
        <h2>{{ user.displayName }}</h2>
      </div>
      <div class="__content">
        <div class="label">Email:
          <span>{{ user.email }}</span>
        </div>
        <v-flex xs6>
          <v-subheader>Language:</v-subheader>
        </v-flex>
        <v-flex xs6>
          <v-select
            :items="languages"
            v-model="language" />
        </v-flex>
      </div>
    </div>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
import { languages } from 'countries-list'
import store from '../../services/Store'

export default {
  name: 'profile',
  data () {
    return {
      user: firebase.auth().currentUser,
      languages: Object.keys(languages).map(lang => lang.toUpperCase())
    }
  },
  computed: {
    language: {
      get: function () {
        console.log(languages)
        console.log(this.user)
        return store.state.settings.language
      },
      set: function (newVal) {
        store.state.settings.language = newVal
        firebase.database().ref('users/' + this.user.uid).update({ state: store.state })
      }
    }
  },
  methods: {
    itemClick () {
      console.log('item click')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>

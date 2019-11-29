<template>
  <v-layout v-if="user" justify-center>
    <div>
      <div class="__header">
        <v-avatar size="16rem">
          <img :src="user.photoURL" alt="user icon" />
        </v-avatar>
        <h2>{{ user.displayName }}</h2>
      </div>
      <div class="__content">
        <div class="label">
          Email:
          <span>{{ user.email }}</span>
        </div>
        <v-flex xs6>
          <v-subheader>Language:</v-subheader>
        </v-flex>
        <v-flex xs6>
          <v-select v-model="language" :items="languages" />
        </v-flex>
      </div>
    </div>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
import { languages } from 'countries-list'
import { db } from '@/services/DataProvider'

export default {
  name: 'Profile',
  data() {
    return {
      user: null,
      languages: Object.keys(languages).map(lang => lang.toUpperCase())
    }
  },
  firestore: function() {
    return {
      user: db.collection('users').doc(firebase.auth().currentUser.uid)
    }
  },
  computed: {
    language: {
      get: function() {
        return 'CZ'
      },
      set: function(newVal) {
        console.log('Set language')
      }
    }
  },
  methods: {
    itemClick() {
      console.log('item click')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped></style>

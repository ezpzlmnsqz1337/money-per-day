<template>
  <v-layout v-if="user && settings" row>
    <Header text="Settings"></Header>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs6>
          <v-subheader>Salary day of month:</v-subheader>
        </v-flex>
        <v-flex xs6>
          <v-select v-model="salaryDay" :items="days" item-value="text" />
        </v-flex>
        <v-flex xs6>
          <v-subheader>Salary</v-subheader>
        </v-flex>
        <v-flex xs6>
          <v-text-field v-model="salary" type="number" />
        </v-flex>

        <v-flex xs6>
          <v-subheader>Currency:</v-subheader>
        </v-flex>
        <v-flex xs6>
          <v-select v-model="currency" :items="currencies" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import { currencies } from '@/assets/currencies'
import firebase from 'firebase'
import { db } from '@/services/DataProvider'

export default {
  name: 'Settings',
  data: function() {
    return {
      user: null,
      settings: null,
      days: [],
      dialog: false,
      currencies: Object.keys(currencies)
    }
  },
  computed: {
    salaryDay: {
      get: function() {
        return this.settings.salaryDay
      },
      set: function(newVal) {
        db.collection('settings')
          .doc(this.user.uid)
          .set({ salaryDay: parseInt(newVal) }, { merge: true })
          .then(() => console.log('Salary day updated'))
          .catch(err => console.log('Salary day not updated: ', err))
      }
    },
    salary: {
      get: function() {
        return this.settings.salary
      },
      set: function(newVal) {
        db.collection('settings')
          .doc(this.user.uid)
          .set({ salary: parseInt(newVal) }, { merge: true })
          .then(() => console.log('Salary updated'))
          .catch(err => console.log('Salary not updated: ', err))
      }
    },
    currency: {
      get: function() {
        return this.settings.currency
      },
      set: function(newVal) {
        db.collection('settings')
          .doc(this.user.uid)
          .set({ currency: newVal }, { merge: true })
          .then(() => console.log('Currency updated'))
          .catch(err => console.log('Currency not updated: ', err))
      }
    }
  },
  created: function() {
    for (let i = 1; i < 32; i++) {
      this.days.push(i)
    }
  },
  mounted: function() {
    console.log(this.$store)
  },
  firestore: function() {
    return {
      user: db.collection('users').doc(firebase.auth().currentUser.uid),
      settings: db.collection('settings').doc(firebase.auth().currentUser.uid)
    }
  },
  methods: {
    updateSettings() {
      console.log('Updating setttings: ', this.settings.salaryDay)
      setTimeout(() => {
        console.log('Updating setttings: ', this.settings.salaryDay)
      }, 300)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.__align-right {
  text-align: right;
}

.__delete_button:hover {
  color: #f44336 !important;
}
</style>

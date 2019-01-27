<template>
  <v-layout row v-if="user && settings">
      <Header text="Settings"></Header>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs6>
            <v-subheader>Salary day of month:</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="days"
              v-model="salaryDay"
              item-value="text" />
          </v-flex>
          <v-flex xs6>
            <v-subheader>Salary</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              type="number"
              v-model="salary" />
          </v-flex>

          <v-flex xs6>
            <v-subheader>Currency:</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="currencies"
              v-model="currency"/>
          </v-flex>
          <v-flex xs6 v-for="(fe, index) in fixedExpenses" :key="index">
            {{ fe.name + fe.price }}
          </v-flex>
        </v-layout>
      </v-container>
  </v-layout>
</template>

<script>
import { currencies } from '../../assets/currencies'
import firebase from 'firebase'
import { db } from '../../services/DataProvider'

export default {
  name: 'settings',
  created: function () {
    for (let i = 1; i < 32; i++) {
      this.days.push(i)
    }
  },
  mounted: function () {
    console.log(this.$store)
  },
  data: function () {
    return {
      user: null,
      settings: null,
      fixedExpenses: [],
      days: [],
      dialog: false,
      currencies: Object.keys(currencies)
    }
  },
  firestore: function () {
    return {
      user: db.collection('users').doc(firebase.auth().currentUser.uid),
      settings: db.collection('settings').doc(firebase.auth().currentUser.uid),
      fixedExpenses: db.collection('fixedExpenses').where('uid', '==', firebase.auth().currentUser.uid)
    }
  },
  computed: {
    salaryDay: {
      get: function () {
        return this.settings.salaryDay
      },
      set: function (newVal) {
        db.collection('settings').doc(this.user.uid).set({ salaryDay: parseInt(newVal) }, { merge: true })
          .then(() => console.log('Salary day updated'))
          .catch(err => console.log('Salary day not updated: ', err))
      }
    },
    salary: {
      get: function () {
        return this.settings.salary
      },
      set: function (newVal) {
        db.collection('settings').doc(this.user.uid).set({ salary: parseInt(newVal) }, { merge: true })
          .then(() => console.log('Salary updated'))
          .catch(err => console.log('Salary not updated: ', err))
      }
    },
    currency: {
      get: function () {
        return this.settings.currency
      },
      set: function (newVal) {
        db.collection('settings').doc(this.user.uid).set({ currency: newVal }, { merge: true })
          .then(() => console.log('Currency updated'))
          .catch(err => console.log('Currency not updated: ', err))
      }
    }
  },
  methods: {
    updateSettings () {
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
  .__align-right{
    text-align: right;
  }

  .__delete_button:hover{
    color: #f44336!important;
  }
</style>

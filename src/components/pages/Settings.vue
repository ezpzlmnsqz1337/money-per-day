<template>
  <v-layout row>
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
            <v-subheader>Salary  [{{ currency }}]</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              mask="## ###"
              v-model="salary" />
          </v-flex>
          <v-flex xs6>
            <v-subheader>Fixed expenses [{{ currency }}]</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              mask="## ###"
              v-model="fixedExpenses" />
          </v-flex>
        </v-layout>
      </v-container>
  </v-layout>
</template>

<script>
import store from '../../services/Store'

import firebase from 'firebase'

export default {
  name: 'settings',
  created: function () {
    for (let i = 1; i < 32; i++) {
      this.days.push(i)
    }
  },
  mounted: function () {
  },
  data: function () {
    return {
      user: firebase.auth().currentUser,
      currency: store.state.settings.currency,
      days: []
    }
  },
  computed: {
    salaryDay: {
      get: function () {
        console.log(store)
        return store.state.settings.salaryDay
      },
      set: function (newVal) {
        store.state.settings.salaryDay = newVal
        console.log(store)
        firebase.database().ref('users/' + this.user.uid).update({ state: store.state })
      }
    },
    salary: {
      get: function () {
        return store.state.settings.salary
      },
      set: function (newVal) {
        store.state.settings.salary = newVal
        firebase.database().ref('users/' + this.user.uid).update({ state: store.state })
      }
    },
    fixedExpenses: {
      get: function () {
        return store.state.settings.fixedExpenses
      },
      set: function (newVal) {
        store.state.settings.fixedExpenses = newVal
        firebase.database().ref('users/' + this.user.uid).update({ state: store.state })
      }
    }
  },
  methods: {
    show () {
      console.log('EASY')
    }
  }
}

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>

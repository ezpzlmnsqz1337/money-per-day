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
              type="number"
              v-model="salary" />
          </v-flex>
          <v-flex xs6>
            <v-subheader>Fixed expenses [{{ currency }}]</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              text-right
              type="number"
              v-model="fixedExpenses" />
          </v-flex>

          <v-flex xs6>
            <v-subheader>Currency:</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="currencies"
              v-model="currency" />
          </v-flex>
        </v-layout>
      </v-container>
  </v-layout>
</template>

<script>
import { currencies } from '../../assets/currencies'

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
      user: this.$store.user,
      days: [],
      currencies: Object.keys(currencies)
    }
  },
  computed: {
    salaryDay: {
      get: function () {
        return parseInt(this.$store.state.settings.salaryDay)
      },
      set: function (newVal) {
        this.$store.state.settings.salaryDay = newVal
        localStorage.state = JSON.stringify(this.$store.state)
        firebase.database().ref('users/' + this.user.uid).update({ state: this.$store.state })
      }
    },
    salary: {
      get: function () {
        return parseInt(this.$store.state.settings.salary)
      },
      set: function (newVal) {
        this.$store.state.settings.salary = newVal
        localStorage.state = JSON.stringify(this.$store.state)
        firebase.database().ref('users/' + this.user.uid).update({ state: this.$store.state })
      }
    },
    fixedExpenses: {
      get: function () {
        return parseInt(this.$store.state.settings.fixedExpenses)
      },
      set: function (newVal) {
        this.$store.state.settings.fixedExpenses = newVal
        localStorage.state = JSON.stringify(this.$store.state)
        firebase.database().ref('users/' + this.user.uid).update({ state: this.$store.state })
      }
    },
    currency: {
      get: function () {
        return this.$store.state.settings.currency
      },
      set: function (newVal) {
        this.$store.state.settings.currency = newVal
        localStorage.state = JSON.stringify(this.$store.state)
        firebase.database().ref('users/' + this.user.uid).update({ state: this.$store.state })
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
  .__align-right{
    text-align: right;
  }
</style>

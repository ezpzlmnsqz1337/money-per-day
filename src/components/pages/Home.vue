/* eslint-disable no-undef */
<template>
  <v-container v-bind="{ ['grid-list-md']: true }" v-if="user">
    <v-layout align-start justify-center row wrap>
      <v-flex
        v-for="card in cards"
        :key="card.id"
        xs12 md6>
        <v-card raised hover>
          <v-card-title primary-title>
            <v-layout row>
                <v-flex xs8 class="headline">{{ card.name }}</v-flex>
                <v-flex xs4 >
                  <v-layout align-end justify-end fill-height>
                    <v-progress-circular v-if="card.type==='circle'"
                      :color="daysToNextSalaryColor(card.value)"
                      :value="(card.value/30) * 100" :rotate="90" >
                      <span style="color: black">{{card.value}}</span>
                    </v-progress-circular>
                    <div class="__card_value" v-bind:class="{ '__text-red': (card.value < 0), '__text-green': (card.value > 0) }"
                      v-if="card.type==='value'">{{card.value}} {{ currency }}</div>
                  </v-layout>
                </v-flex>
            </v-layout>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <SpendingChart :data="filteredSpendingsList"/>
        <FixedExpenses />
        <Spendings />
        <EditDialog />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Spendings from '../Spendings'
import FixedExpenses from '../FixedExpenses'
import EditDialog from '../dialogs/EditDialog'
import SpendingChart from '../charts/SpendingChart'
import voice from '../../mixins/voice'

import firebase from 'firebase'
import { db } from '../../services/DataProvider'
import monthFunctions from '../../mixins/monthFunctions'

export default {
  mixins: [ voice, monthFunctions ],
  name: 'home',
  components: { Spendings, FixedExpenses, EditDialog, SpendingChart },
  data: function () {
    return {
      user: null,
      settings: null,
      currency: '',
      fixedExpensesList: [],
      spendingsList: []
    }
  },
  firestore: function () {
    return {
      user: db.collection('users').doc(firebase.auth().currentUser.uid),
      settings: db.collection('settings').doc(firebase.auth().currentUser.uid),
      fixedExpensesList: db.collection('fixedExpenses').where('uid', '==', firebase.auth().currentUser.uid).orderBy('price'),
      spendingsList: db.collection('spendings')
        .where('uid', '==', firebase.auth().currentUser.uid)
        .where('date', '>=', new Date(this.year, this.month - 2, 1))
        .orderBy('date')
    }
  },
  computed: {
    totalMoney: function () {
      if (!this.settings) return
      return this.settings.salary
    },
    fixedExpenses: function () {
      let total = 0
      this.fixedExpensesList.forEach(expense => {
        total += parseInt(expense.price)
      })
      return total
    },
    daysInMonth: function () {
      return new Date(this.year, this.month, 0).getDate()
    },
    daysInLastMonth: function () {
      const month = this.month === 0 ? 12 : this.month - 1
      return new Date(this.year, month, 0).getDate()
    },
    spendings: function () {
      if (!this.filteredSpendingsList) return []
      let total = 0

      this.filteredSpendingsList.forEach(s => {
        total += parseInt(s.price)
      })
      return total * -1
    },
    daysToNextSalary: function () {
      if (this.day < this.salaryDay) {
        return this.salaryDay - this.day
      } else {
        return (this.daysInMonth + this.salaryDay) - this.day
      }
    },
    dailyIncome: function () {
      return Math.round((this.totalMoney - this.fixedExpenses) / this.daysInMonth)
    },
    dailySpendings: function () {
      return Math.round(this.spendings / this.daysInMonth)
    },
    moneyForToday: function () {
      return (this.daysInLastMonth - this.daysToNextSalary) * this.dailyIncome + this.spendings
    },
    cards: function () {
      return [
        {
          id: 1,
          name: 'Days to next salary',
          value: this.daysToNextSalary,
          type: 'circle'
        },
        {
          id: 2,
          name: 'Daily income',
          value: this.dailyIncome,
          type: 'value'
        },
        {
          id: 3,
          name: 'Money for today',
          value: this.moneyForToday,
          type: 'value'
        },
        {
          id: 4,
          name: 'Avg. daily spendings',
          value: this.dailySpendings,
          type: 'value'
        }
      ]
    }
  },
  methods: {
    daysToNextSalaryColor: function (days) {
      if (days > 20) {
        return 'red'
      } else if (days > 10) {
        return 'yellow'
      } else {
        return 'green'
      }
    },
    navigateTo: function (place) {
      console.log('PLace: ', place)
      console.log('Routes: ', this.$router.options.routes)
      if (this.$router.options.routes.includes('/' + place)) this.$router.push(place)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .__card_value {
    font-size: 1.3rem;
  }

  .__text-red{
    color: red;
  }

  .__text-green{
    color: green;
  }
</style>

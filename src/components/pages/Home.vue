/* eslint-disable no-undef */
<template>
  <v-container fluid fill-width>
    <v-layout row wrap>
        <v-flex xs12 sm6 m4
          v-for="card in cards"
          :key="card.id" ma-2>
          <v-card raised hover >
            <v-card-title primary-title>
              <div>
                <div class="headline"  v-bind:class="{ 'text-red': (card.value<0), 'text-green': (card.value>0), }">{{card.name}}</div>
                <v-progress-circular :value="((card.value/30)*100)" :rotate="90" :size="50" :width="7">{{card.value}}</v-progress-circular>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import store from '../../services/Store'

export default {
  name: 'home',
  data () {
    return {
      totalMoney: store.state.settings.salary,
      fixedExpenses: store.state.settings.fixedExpenses,
      salaryDay: store.state.settings.salaryDay,
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    }
  },
  computed: {
    daysInMonth: function () {
      console.log(new Date(this.year, this.month, 0).getDate())
      return new Date(this.year, this.month, 0).getDate()
    },
    spendings: function () {
      return 2000
    },
    daysToNextSalary: function () {
      console.log('Day: ', this.day)
      return (this.daysInMonth + this.salaryDay) - this.day
    },
    dailyIncome: function () {
      return Math.round((this.totalMoney - this.fixedExpenses) / this.daysInMonth)
    },
    cards: function () {
      return [
        {
          id: 1,
          name: 'Days to next salary',
          value: this.daysToNextSalary
        },
        {
          id: 2,
          name: 'Daily income',
          value: this.dailyIncome
        },
        {
          id: 3,
          name: 'Money for today',
          value: this.daysToNextSalary * this.dailyIncome - this.spendings
        }
      ]
    }
  },
  components: {}
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>

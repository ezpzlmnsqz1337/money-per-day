/* eslint-disable no-undef */
<template>
  <v-container v-bind="{ ['grid-list-md']: true }">
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
                      :color="card.value < 0 ? 'red' : 'green'"
                      :value="((card.value/30) * 100)" :rotate="90" :size="50" :width="7">
                      <span v-bind:class="{ '__text-red': (card.value < 0), '__text-green': (card.value > 0) }">{{card.value}}</span>
                    </v-progress-circular>
                    <div class="__card_value" v-bind:class="{ '__text-red': (card.value < 0), '__text-green': (card.value > 0) }" v-if="card.type==='value'">{{card.value}} {{ currency }}</div>
                  </v-layout>
                </v-flex>
            </v-layout>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <Spendings />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Spendings from '../Spendings'
import voice from '../../mixins/voice'

export default {
  mixin: [ voice ],
  name: 'home',
  components: { Spendings },
  data: function () {
    return {
      currency: this.$store.state.settings.currency,
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    }
  },
  computed: {
    totalMoney: function () {
      return this.$store.state.settings.salary
    },
    fixedExpenses: function () {
      return this.$store.state.settings.fixedExpenses
    },
    salaryDay: function () {
      return this.$store.state.settings.salaryDay
    },
    spendings: function () {
      return this.$store.state.settings.spendings
    },
    daysInMonth: function () {
      console.log(new Date(this.year, this.month, 0).getDate())
      return new Date(this.year, this.month, 0).getDate()
    },
    totalSpendings: function () {
      let total = 0
      this.spendings.forEach(s => {
        total += parseInt(s.price)
      })
      return total * -1
    },
    daysToNextSalary: function () {
      return (this.daysInMonth + this.salaryDay) - this.day
    },
    dailyIncome: function () {
      return Math.round((this.totalMoney - this.fixedExpenses) / this.daysInMonth)
    },
    moneyForToday: function () {
      return (this.daysToNextSalary - this.salaryDay) * this.dailyIncome + this.totalSpendings
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
          name: 'Total Spendings',
          value: this.totalSpendings,
          type: 'value'
        }
      ]
    }
  },
  methods: {
    navigateTo: function (place) {
      console.log('PLace: ', place)
      console.log('Routes: ', this.$router.options.routes)
      if (this.$router.options.routes.includes('/' + place)) this.$router.push(place)
    },
    addItemToStore: function (name, price) {
      console.log('adding', name, price)
      this.$store.state.settings.spendings.push({
        name,
        price,
        date: new Date().toLocaleString('cs-CZ', { timeZone: 'UTC' })
      })
      console.log('Adding: ', name, price)
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

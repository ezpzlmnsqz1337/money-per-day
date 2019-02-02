<template>
  <v-container v-bind="{ ['grid-list-md']: true }" v-if="user">
    <v-layout align-start justify-center row wrap>
      <v-flex xs12>
        <v-card raised hover>
          <v-container id="spendingsByName">
            <v-flex v-if="loader" xs12 class="text-xs-center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-flex>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card raised hover>
          <v-container id="spendingsByDate">
            <v-flex v-if="loader" xs12 class="text-xs-center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-flex>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card raised hover>
          <v-container id="salaryDivision">
            <v-flex v-if="loader" xs12 class="text-xs-center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-flex>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { currencies } from '../../assets/currencies'
import firebase from 'firebase'
import { db } from '../../services/DataProvider'
import Charts from '../../services/Charts'
import monthFunctions from '../../mixins/monthFunctions'
import {
  CHART_TYPE_BAR,
  CHART_TYPE_HBAR,
  CHART_TYPE_PIE
} from '../../constants.js'

export default {
  name: 'statistics',
  mixins: [ monthFunctions ],
  created: function () {
  },
  mounted: function () {
    setTimeout(() => {
      this.hideLoaders()
      this.createSpendingsByNameChart()
      this.createSpendingsByDateChart()
      this.createSalaryDivisonChart()
    }, 500)
  },
  data: function () {
    return {
      user: null,
      settings: null,
      dialog: false,
      loader: true,
      spendingsList: [],
      fixedExpensesList: [],
      currencies: Object.keys(currencies)
    }
  },
  firestore: function () {
    return {
      user: db.collection('users').doc(firebase.auth().currentUser.uid),
      settings: db.collection('settings').doc(firebase.auth().currentUser.uid),
      fixedExpensesList: db.collection('fixedExpenses').where('uid', '==', firebase.auth().currentUser.uid).orderBy('price'),
      spendingsList: db.collection('spendings').where('uid', '==', firebase.auth().currentUser.uid).orderBy('date')
    }
  },
  computed: {

  },
  methods: {
    hideLoaders: function () {
      this.loader = false
    },
    createSpendingsByNameChart: function () {
      const data = []
      for (let i = 0; i < this.filteredSpendingsList.length; i++) {
        let exists = false
        for (let j = 0; j < data.length; j++) {
          if (data[j].name === this.filteredSpendingsList[i].name) {
            exists = true
            data[j].price += this.filteredSpendingsList[i].price
            break
          }
        }
        if (!exists) {
          data.push({
            name: this.filteredSpendingsList[i].name,
            price: this.filteredSpendingsList[i].price
          })
        }
      }

      data.sort((o1, o2) => o1.price - o2.price)

      const xLabels = data.map(d => d.name)
      const prices = data.map(d => d.price)
      const options = {
        title: 'Spendings by name',
        type: CHART_TYPE_HBAR,
        values: prices,
        valueAppend: this.settings.currency,
        tooltipAppend: this.settings.currency,
        xLabels
      }

      Charts.createChart('spendingsByName', options)
    },
    createSpendingsByDateChart: function () {
      const data = []
      for (let i = 0; i < this.filteredSpendingsList.length; i++) {
        let exists = false
        for (let j = 0; j < data.length; j++) {
          const dataDate = data[j].date
          const spendingDate = this.filteredSpendingsList[i].date.toDate().toLocaleDateString()
          if (dataDate === spendingDate) {
            exists = true
            data[j].price += this.filteredSpendingsList[i].price
            break
          }
        }
        if (!exists) {
          data.push({
            date: this.filteredSpendingsList[i].date.toDate().toLocaleDateString(),
            price: this.filteredSpendingsList[i].price
          })
        }
      }

      const xLabels = data.map(d => d.date)
      const prices = data.map(d => Math.round(d.price))

      const options = {
        title: 'Spendings by date',
        type: CHART_TYPE_BAR,
        values: prices,
        valueAppend: this.settings.currency,
        tooltipAppend: this.settings.currency,
        xLabels
      }

      Charts.createChart('spendingsByDate', options)
    },
    createSalaryDivisonChart: function () {
      let spendings = this.filteredSpendingsList.map(s => s.price).reduce((prev, curr) => curr + prev, 0)
      let fixedExpenses = this.fixedExpensesList.map(fe => fe.price).reduce((prev, curr) => curr + prev, 0)

      let leftOver = this.settings.salary - spendings - fixedExpenses

      const options = {
        title: 'Salary division',
        type: CHART_TYPE_PIE,
        series: [
          {
            text: 'Spendings',
            values: [parseFloat(spendings.toFixed(2))],
            lineColor: '#00BAF2',
            backgroundColor: '#db1e1e',
            lineWidth: 1,
            marker: {
              backgroundColor: '#00BAF2'
            }
          },
          {
            text: 'Fixed expenses',
            values: [parseFloat(fixedExpenses.toFixed(2))],
            lineColor: '#E80C60',
            backgroundColor: '#efb64c',
            lineWidth: 1,
            marker: {
              backgroundColor: '#E80C60'
            }
          },
          {
            text: 'Money left',
            values: [leftOver],
            lineColor: '#9B26AF',
            backgroundColor: '#489145',
            lineWidth: 1,
            marker: {
              backgroundColor: '#9B26AF'
            }
          }
        ],
        valueAppend: this.settings.currency,
        tooltipAppend: this.settings.currency
      }

      Charts.createPieChart('salaryDivision', options)
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

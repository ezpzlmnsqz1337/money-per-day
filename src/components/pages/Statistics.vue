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
    </v-layout>
  </v-container>
</template>

<script>
import { currencies } from '../../assets/currencies'
import firebase from 'firebase'
import { db } from '../../services/DataProvider'
import Charts from '../../services/Charts'
import {
  CHART_TYPE_BAR,
  CHART_TYPE_HBAR
} from '../../constants.js'

export default {
  name: 'statistics',
  created: function () {
  },
  mounted: function () {
    setTimeout(() => {
      this.hideLoaders()
      this.createSpendingsByNameChart()
      this.createSpendingsByDateChart()
    }, 500)
  },
  data: function () {
    return {
      user: null,
      settings: null,
      dialog: false,
      loader: true,
      spendingsList: [],
      currencies: Object.keys(currencies)
    }
  },
  firestore: function () {
    return {
      user: db.collection('users').doc(firebase.auth().currentUser.uid),
      settings: db.collection('settings').doc(firebase.auth().currentUser.uid),
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
      for (let i = 0; i < this.spendingsList.length; i++) {
        let exists = false
        for (let j = 0; j < data.length; j++) {
          if (data[j].name === this.spendingsList[i].name) {
            exists = true
            data[j].price += this.spendingsList[i].price
            break
          }
        }
        if (!exists) {
          data.push({
            name: this.spendingsList[i].name,
            price: this.spendingsList[i].price
          })
        }
      }

      data.sort((o1, o2) => o1.price - o2.price)

      const xLabels = data.map(d => d.name)
      const prices = data.map(d => Math.round(d.price))
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
      for (let i = 0; i < this.spendingsList.length; i++) {
        let exists = false
        for (let j = 0; j < data.length; j++) {
          const dataDate = data[j].date
          const spendingDate = this.spendingsList[i].date.toDate().toLocaleDateString()
          if (dataDate === spendingDate) {
            exists = true
            console.log()
            data[j].price += this.spendingsList[i].price
            break
          }
        }
        if (!exists) {
          data.push({
            date: this.spendingsList[i].date.toDate().toLocaleDateString(),
            price: this.spendingsList[i].price
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

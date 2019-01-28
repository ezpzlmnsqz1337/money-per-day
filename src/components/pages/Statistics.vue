<template>
  <v-container v-bind="{ ['grid-list-md']: true }" v-if="user">
    <v-layout align-start justify-center row wrap>
      <v-flex xs12>
        <v-card raised hover>
          <v-container id="spendingsByName"></v-container>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card raised hover>
          <v-container id="spendingsByDate"></v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { currencies } from '../../assets/currencies'
import firebase from 'firebase'
import { db } from '../../services/DataProvider'
import zingchart from 'zingchart'

export default {
  name: 'statistics',
  created: function () {
  },
  mounted: function () {
    setTimeout(() => {
      this.createSpendingsByNameChart()
      this.createSpendingsByDateChart()
    }, 300)
  },
  data: function () {
    return {
      user: null,
      settings: null,
      dialog: false,
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

      zingchart.render({
        width: '94%',
        id: 'spendingsByName',
        data: {
          type: 'hbar',
          title: {
            text: 'Spendings by name'
          },
          plot: {
            'value-box': {
              text: '%v ' + this.settings.currency
            },
            tooltip: {
              text: '%kt - %v ' + this.settings.currency
            }
          },
          'scale-x': {
            visible: false,
            labels: xLabels
          },
          series: [{
            values: prices
          }]
        }
      })
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

      zingchart.render({
        width: '94%',
        id: 'spendingsByDate',
        data: {
          type: 'bar',
          title: {
            text: 'Spendings by date'
          },
          plot: {
            'value-box': {
              text: '%v ' + this.settings.currency
            },
            tooltip: {
              text: '%kt - %v ' + this.settings.currency
            }
          },
          'scale-x': {
            visible: false,
            labels: xLabels
          },
          series: [{
            values: prices
          }]
        }
      })
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

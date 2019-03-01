<template>
  <v-flex xs12 pa-0 mb-3>
    <v-card raised hover>
      <v-card-title primary-title class="headline">
        <v-flex xs12 pa-0>
          Calendar
        </v-flex>
      </v-card-title>
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          :start="start"
          :end="end"
          color="primary"
        >

          <template v-slot:day="event.date">
              <v-menu
                v-model="event.open"
                full-width
                offset-x
              >
                <template v-slot:activator>
                  <div
                    v-ripple
                    class="my-event"
                    v-html="event.title"
                  ></div>
                </template>
                <v-card
                  color="grey lighten-4"
                  min-width="350px"
                  flat
                >
                  <v-toolbar
                    color="primary"
                    dark
                  >
                    <v-btn icon>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="event.title"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>favorite</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-title primary-title>
                    <span v-html="event.details"></span>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      flat
                      color="secondary"
                    >
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
          </template>
        </v-calendar>
      </v-sheet>
    </v-card>
  </v-flex>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/services/DataProvider'
import monthFunctions from '@/mixins/monthFunctions'

export default {
  mixins: [ monthFunctions ],
  data () {
    return {
      event: {
        title: 'My awesome event!',
        date: '2019-02-15',
        details: 'Its superb easy',
        open: false
      },
      spendingsList: [],
      extraIncomesList: []
    }
  },
  firestore: function () {
    return {
      spendingsList: db.collection('spendings').where('uid', '==', firebase.auth().currentUser.uid).orderBy('date'),
      extraIncomesList: db.collection('extraIncomes').where('uid', '==', firebase.auth().currentUser.uid).orderBy('date')
    }
  },
  computed: {
    start: function () {
      if (!this.startDate) return '2019-02-06'
      return this.startDate.toISOString().slice(0, 10)
    },
    end: function () {
      if (!this.endDate) return '2019-03-06'
      return this.endDate.toISOString().slice(0, 10)
    },
    events: function () {
      const events = []
      console.log('FIltered spendings: ', this.filteredSpendingsList)
      this.filteredSpendingsList.forEach(s => {
        const event = {
          title: 'Vacation',
          details: 'Going to the beach!',
          date: '2018-12-30',
          open: false
        }
        events.push(event)
      })
      return [
        {
          title: 'Vacation',
          details: 'Going to the beach!',
          date: '2019-02-15',
          open: false
        },
        {
          title: 'Vacation',
          details: 'Going to the beach!',
          date: '2019-02-16',
          open: false
        },
        {
          title: 'Vacation',
          details: 'Going to the beach!',
          date: '2019-02-17',
          open: false
        },
        {
          title: 'Meeting',
          details: 'Spending time on how we do not have enough time',
          date: '2019-02-18',
          open: false
        },
        {
          title: '30th Birthday',
          details: 'Celebrate responsibly',
          date: '2019-02-19',
          open: false
        },
        {
          title: 'New Year',
          details: 'Eat chocolate until you pass out',
          date: '2019-02-20',
          open: false
        },
        {
          title: 'Conference',
          details: 'Mute myself the whole time and wonder why I am on this call',
          date: '2019-02-28',
          open: false
        },
        {
          title: 'Hackathon',
          details: 'Code like there is no tommorrow',
          date: '2019-03-01',
          open: false
        }
      ]
    },
    // convert the list of events into a map of lists keyed by date
    eventsMap () {
      if (!this.events) return
      const map = {}
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
      console.log('Map: ', map)
      return map
    }
  },
  methods: {

  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .__text_red{
    color: #f44336!important;
  }
  .__currency{
      font-size: 1.3rem;
  }
  .__item_currency{
    width: 14rem;
    text-align: right;
  }
</style>

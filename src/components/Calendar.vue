<template>
  <v-flex xs12 pa-0 mb-3>
    <v-card raised hover>
      <v-card-title primary-title class="headline">
        <v-flex xs12 pa-0>
          Calendar
        </v-flex>
      </v-card-title>
      <v-sheet height="500">
        <v-calendar ref="calendar" :start="start" :end="end" color="primary">
          <template v-slot:day="{ date }">
            <template v-for="event in eventsMap[date]">
              <v-menu :key="event.title" v-model="event.open" offset-x>
                <template v-slot:activator="{ on }">
                  <div
                    v-if="!event.time"
                    v-ripple
                    class="my-event"
                    v-on="on"
                    v-html="event.title"
                  ></div>
                </template>
                <v-card color="grey lighten-4" min-width="350px" flat>
                  <v-toolbar color="primary" dark>
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
                    <v-btn flat color="secondary">
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </template>
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
  mixins: [monthFunctions],
  data() {
    return {
      spendingsList: [],
      extraIncomesList: []
    }
  },
  firestore: function() {
    return {
      spendingsList: db
        .collection('spendings')
        .where('uid', '==', firebase.auth().currentUser.uid)
        .orderBy('date'),
      extraIncomesList: db
        .collection('extraIncomes')
        .where('uid', '==', firebase.auth().currentUser.uid)
        .orderBy('date')
    }
  },
  computed: {
    start: function() {
      if (!this.startDate) return '2019-03-06'
      return this.startDate.toISOString().slice(0, 10)
    },
    end: function() {
      if (!this.endDate) return '2019-04-06'
      return this.endDate.toISOString().slice(0, 10)
    },
    events: function() {
      const events = []
      const event = {
        title: 'Vacation',
        details: 'Going to the beach!',
        date: '2019-03-09',
        open: false
      }
      events.push(event)
      console.log('Events: ', events)
      this.$store.spendings.then(snapshot => {
        console.log('Store spend list: ', snapshot.docs)
      })
      this.filteredSpendingsList.forEach(s => {
        const event = {
          title: `${s.name.substring(0, 6)}... + ${s.price}`,
          details: `${s.name} - ${s.price}`,
          date: '2019-03-09',
          open: false
        }
        events.push(event)
      })
      return events
    },
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      if (!this.events) return
      const map = {}
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
      console.log('Map: ', map)
      return map
    }
  }
}
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>

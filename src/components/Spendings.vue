<template>
  <v-flex v-if="settings" xs12 pa-0 mb-3>
    <v-card raised hover>
      <v-expansion-panels :value="1">
        <v-expansion-panel-header
          ><v-flex xs7 pa-0>
            Spendings
          </v-flex>
          <v-flex xs5>
            <v-layout justify-end :class="{ __text_red: total > 0 }">
              <div class="__currency">{{ total > 0 ? '-' + total : total }} {{ currency }}</div>
            </v-layout>
          </v-flex></v-expansion-panel-header
        >
        <v-expansion-panel>
          <v-expansion-panel-content>
            <v-list subheader>
              <v-list-item
                v-for="(s, index) in filteredSpendingsList"
                :key="index"
                @click="itemClick(s)"
              >
                <v-list-item-content>
                  <v-list-item-title v-html="s.name"></v-list-item-title>
                  <v-list-item-sub-title>{{
                    s.date.toDate().toLocaleDateString()
                  }}</v-list-item-sub-title>
                </v-list-item-content>

                <v-list-item-action>
                  <div class="__text_red __item_currency">
                    - {{ s.price.toFixed(2) }} {{ s.currency }}
                  </div>
                </v-list-item-action>
              </v-list-item>

              <ImportCSV>
                <v-btn slot="activator" absolute dark fab bottom left color="#5E35B1">
                  <v-icon>import_export</v-icon>
                </v-btn>
              </ImportCSV>

              <SpendingsDialog>
                <v-btn slot="activator" absolute dark fab bottom right color="primary">
                  <v-icon>add</v-icon>
                </v-btn>
              </SpendingsDialog>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-flex>
</template>

<script>
import SpendingsDialog from './dialogs/SpendingsDialog'
import ImportCSV from './import/ImportCSV'
import firebase from 'firebase'
import { db } from '@/services/DataProvider'
import monthFunctions from '@/mixins/monthFunctions'

export default {
  name: 'Spendings',
  components: { SpendingsDialog, ImportCSV },
  mixins: [monthFunctions],
  data: function() {
    return {
      spendingsList: [],
      settings: null
    }
  },
  firestore: function() {
    return {
      user: db.collection('users').doc(firebase.auth().currentUser.uid),
      settings: db.collection('settings').doc(firebase.auth().currentUser.uid),
      spendingsList: db
        .collection('spendings')
        .where('uid', '==', firebase.auth().currentUser.uid)
        .orderBy('date', 'desc')
    }
  },
  computed: {
    currency: {
      get: function() {
        return this.settings.currency
      }
    },
    total: function() {
      return this.filteredSpendingsList.reduce(
        (prev, current) => (parseFloat(prev) + parseFloat(current.price)).toFixed(2),
        0
      )
    }
  },
  methods: {
    itemClick: function(item) {
      this.$root.$emit('showEditDialog', item)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.__text_red {
  color: #f44336 !important;
}
.__currency {
  font-size: 1.3rem;
}
.__item_currency {
  width: 14rem;
  text-align: right;
}
</style>

<template>
  <v-flex v-if="settings" xs12 pa-0 mb-3>
    <v-card raised hover>
      <v-card-title primary-title class="headline">
        <v-flex xs7 pa-0>
          Extra incomes
        </v-flex>
        <v-flex xs5>
          <v-layout justify-end :class="{ __text_red: total > 0 }">
            <div class="__currency __text_green">{{ total }} {{ currency }}</div>
          </v-layout>
        </v-flex>
      </v-card-title>
      <v-divider v-show="filteredExtraIncomesList.length > 0" />
      <v-expansion-panels>
        <v-expansion-panel :value="1">
          <v-expansion-panel-content>
            <v-list subheader>
              <v-list-item
                v-for="(s, index) in filteredExtraIncomesList"
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
                  <div class="__text_green __item_currency">
                    {{ s.price.toFixed(2) }} {{ s.currency }}
                  </div>
                </v-list-item-action>
              </v-list-item>

              <ImportCSV>
                <v-btn slot="activator" absolute dark fab bottom left color="#5E35B1">
                  <v-icon>import_export</v-icon>
                </v-btn>
              </ImportCSV>

              <ExtraIncomesDialog>
                <v-btn slot="activator" absolute dark fab bottom right color="primary">
                  <v-icon>add</v-icon>
                </v-btn>
              </ExtraIncomesDialog>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-flex>
</template>

<script>
import ExtraIncomesDialog from './dialogs/ExtraIncomesDialog'
import ImportCSV from './import/ImportCSV'
import firebase from 'firebase'
import { db } from '@/services/DataProvider'
import monthFunctions from '@/mixins/monthFunctions'

export default {
  name: 'ExtraIncomes',
  components: { ExtraIncomesDialog, ImportCSV },
  mixins: [monthFunctions],
  data: function() {
    return {
      extraIncomesList: [],
      settings: null
    }
  },
  firestore: function() {
    return {
      user: db.collection('users').doc(firebase.auth().currentUser.uid),
      settings: db.collection('settings').doc(firebase.auth().currentUser.uid),
      extraIncomesList: db
        .collection('extraIncomes')
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
      console.log('Extra incomes list: ', this.filteredExtraIncomesList)
      return this.filteredExtraIncomesList.reduce(
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
.__text_green {
  color: green;
}
.__currency {
  font-size: 1.3rem;
}
.__item_currency {
  width: 14rem;
  text-align: right;
}
</style>

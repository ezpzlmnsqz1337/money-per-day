<template>
  <v-flex v-if="settings" xs12 pa-0 mb-3>
    <v-card raised hover>
      <v-card-title primary-title class="headline">
        <v-flex xs7 pa-0>
          Fixed expenses
        </v-flex>
        <v-flex xs5>
          <v-layout justify-end :class="{ __text_red: total > 0 }">
            <div class="__currency">{{ total > 0 ? '-' + total : total }} {{ currency }}</div>
          </v-layout>
        </v-flex>
      </v-card-title>
      <v-divider v-show="fixedExpensesList.length > 0" />
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-content>
            <v-list subheader>
              <v-list-item
                v-for="(e, index) in fixedExpensesList"
                :key="index"
                @click="itemClick(e)"
              >
                <v-list-item-content>
                  <v-list-item-title v-html="e.name"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <div class="__text_red __item_currency">
                    - {{ e.price.toFixed(2) }} {{ e.currency }}
                  </div>
                </v-list-item-action>
              </v-list-item>
              <FixedExpensesDialog>
                <v-btn slot="activator" absolute dark fab bottom right color="primary">
                  <v-icon>add</v-icon>
                </v-btn>
              </FixedExpensesDialog>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-flex>
</template>

<script>
import FixedExpensesDialog from './dialogs/FixedExpensesDialog'
import firebase from 'firebase'
import { db } from '@/services/DataProvider'

export default {
  name: 'FixedExpenses',
  components: { FixedExpensesDialog },
  data() {
    return {
      fixedExpensesList: [],
      settings: null
    }
  },
  firestore: function() {
    return {
      user: db.collection('users').doc(firebase.auth().currentUser.uid),
      settings: db.collection('settings').doc(firebase.auth().currentUser.uid),
      fixedExpensesList: db
        .collection('fixedExpenses')
        .where('uid', '==', firebase.auth().currentUser.uid)
        .orderBy('price', 'desc')
    }
  },
  computed: {
    currency: {
      get: function() {
        return this.settings.currency
      }
    },
    total: function() {
      return this.fixedExpensesList.reduce(
        (prev, current) => (parseFloat(prev) + parseFloat(current.price)).toFixed(2),
        0
      )
    }
  },
  methods: {
    itemClick(item) {
      this.$root.$emit('showEditDialog', item)
    },
    removeExpense: function(id) {
      this.$store.removeFixedExpense(id)
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

<template>
    <v-flex xs12 pa-0 mb-3 v-if="settings">
        <v-card raised hover >
            <v-card-title primary-title class="headline">
                <v-flex xs8 pa-0>
                    Spendings
                </v-flex>
                <v-flex xs4>
                    <v-layout justify-end :class="{ __text_red: total > 0 }">
                    {{ total > 0 ? '-' + total : total }} {{ currency }}
                    </v-layout>
                </v-flex>
            </v-card-title>
            <v-divider v-show="spendingsList.length > 0" />
            <v-expansion-panel :value="1">
                <v-expansion-panel-content>
                <div slot="header"></div>
                    <v-list subheader>
                        <v-list-tile
                            v-for="(s, index) in spendingsList"
                            :key="index"
                            @click="itemClick(s)"
                            >

                            <v-list-tile-content>
                                <v-list-tile-title v-html="s.name"></v-list-tile-title>
                                <v-list-tile-sub-title>{{ s.date.toDate().toLocaleDateString() }}</v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <div style="color: red">- {{ s.price }} {{ s.currency }}</div>
                            </v-list-tile-action>
                        </v-list-tile>

                        <ImportCSV>
                            <v-btn
                                absolute
                                dark
                                fab
                                bottom
                                left
                                color="#5E35B1"
                                slot="activator"
                                >
                                    <v-icon>import_export</v-icon>
                            </v-btn>
                        </ImportCSV>

                        <SpendingsDialog>
                            <v-btn
                                absolute
                                dark
                                fab
                                bottom
                                right
                                color="primary"
                                slot="activator"
                                >
                                    <v-icon>add</v-icon>
                            </v-btn>
                        </SpendingsDialog>
                    </v-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-card>
    </v-flex>
</template>

<script>
import SpendingsDialog from './dialogs/SpendingsDialog'
import ImportCSV from './import/ImportCSV'
import firebase from 'firebase'
import { db } from '../services/DataProvider'

export default {
  name: 'spendings',
  components: { SpendingsDialog, ImportCSV },
  data: function () {
    return {
      spendingsList: [],
      settings: null
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
    currency: {
      get: function () {
        return this.settings.currency
      }
    },
    total: function () {
      return this.spendingsList.reduce((prev, current) => prev + parseInt(current.price), 0)
    }
  },
  methods: {
    itemClick: function (item) {
      this.$root.$emit('showEditDialog', item)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .__text_red{
    color: #f44336!important;
  }
</style>

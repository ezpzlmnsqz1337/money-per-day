<template>
    <v-dialog v-model="dialog" width="500">
      <slot slot="activator" name="activator"></slot>

      <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
            @click="addSpending">
            Add spending
          </v-card-title>

          <v-form v-model="addSpendingFormValid" ref="form">
          <v-container>
              <v-layout>
              <v-flex xs6>
                  <v-text-field v-model="spendingName" label="Item"
                  :rules="spendingNameRules"
                  :counter="spendingNameLength"
                  required />
              </v-flex>

              <v-flex xs6>
                  <v-text-field v-model="spendingPrice" label="Price"
                  :rules="spendingPriceRules"
                  required />
              </v-flex>
              </v-layout>
          </v-container>
          </v-form>

          <v-divider></v-divider>

          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancel">Cancel</v-btn>
          <v-btn color="primary" @click="addSpending">Add</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import firebase from 'firebase'
import { db } from '../../services/DataProvider'

export default {
  data: function () {
    return {
      dialog: false,
      addSpendingFormValid: false,
      spendingName: '',
      spendingNameLength: 50,
      spendingNameRules: [
        v => !!v || 'Item name is required',
        v => v.length <= this.spendingNameLength || 'Name must be less than 10 characters'
      ],
      spendingPrice: 0,
      spendingPriceRules: [
        v => !!v || 'Price is required',
        v => /^([1-9]\d*(\.|,)\d*|0?(\.|,)\d*[1-9]\d*|[1-9]\d*)$/.test(v) || 'Price must be a number'
      ],
      spendingsList: []
    }
  },
  firestore: function () {
    return {
      user: db.collection('users').doc(firebase.auth().currentUser.uid),
      settings: db.collection('settings').doc(firebase.auth().currentUser.uid),
      spendingsList: db.collection('spendings').where('uid', '==', firebase.auth().currentUser.uid)
    }
  },
  methods: {
    addSpending: function () {
      if (this.addSpendingFormValid) {
        this.$store.addSpending(this.spendingName, this.spendingPrice)
        this.dialog = false
        this.spendingName = ''
        this.spendingPrice = 0
      }
      this.$refs.form.resetValidation()
    },
    cancel: function () {
      this.dialog = false
      this.fixedExpenseName = ''
      this.fixedExpensePrice = 0
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped>

</style>

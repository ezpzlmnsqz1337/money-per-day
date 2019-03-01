<template>
    <v-dialog v-model="dialog" width="500">
      <slot slot="activator" name="activator"></slot>

      <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
            @click="addExtraIncome">
            Add extraIncome
          </v-card-title>

          <v-form v-model="addExtraIncomeFormValid" ref="form">
          <v-container>
              <v-layout>
              <v-flex xs6>
                  <v-text-field v-model="extraIncomeName" label="Item"
                  :rules="extraIncomeNameRules"
                  :counter="extraIncomeNameLength"
                  required />
              </v-flex>

              <v-flex xs6>
                  <v-text-field v-model="extraIncomePrice" label="Price"
                  :rules="extraIncomePriceRules"
                  required />
              </v-flex>
              </v-layout>
          </v-container>
          </v-form>

          <v-divider></v-divider>

          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancel">Cancel</v-btn>
          <v-btn color="primary" @click="addExtraIncome">Add</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/services/DataProvider'

export default {
  data: function () {
    return {
      dialog: false,
      addExtraIncomeFormValid: false,
      extraIncomeName: '',
      extraIncomeNameLength: 50,
      extraIncomeNameRules: [
        v => !!v || 'Item name is required',
        v => v.length <= this.extraIncomeNameLength || 'Name must be less than 10 characters'
      ],
      extraIncomePrice: 0,
      extraIncomePriceRules: [
        v => !!v || 'Price is required',
        v => /^([1-9]\d*(\.|,)\d*|0?(\.|,)\d*[1-9]\d*|[1-9]\d*)$/.test(v) || 'Price must be a number'
      ],
      extraIncomesList: []
    }
  },
  firestore: function () {
    return {
      user: db.collection('users').doc(firebase.auth().currentUser.uid),
      settings: db.collection('settings').doc(firebase.auth().currentUser.uid),
      extraIncomesList: db.collection('extraIncomes').where('uid', '==', firebase.auth().currentUser.uid)
    }
  },
  methods: {
    addExtraIncome: function () {
      if (this.addExtraIncomeFormValid) {
        this.$store.addExtraIncome(this.extraIncomeName, this.extraIncomePrice)
        this.dialog = false
        this.extraIncomeName = ''
        this.extraIncomePrice = 0
      }
      this.$refs.form.resetValidation()
    },
    cancel: function () {
      this.dialog = false
      this.extraIncomeName = ''
      this.extraIncomePrice = 0
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped>

</style>

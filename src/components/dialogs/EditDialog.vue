<template>
  <v-dialog v-if="item" v-model="dialog" width="500">
    <slot slot="activator" name="activator"></slot>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Edit item
      </v-card-title>

      <v-form v-model="itemEditFormValid">
        <v-container>
          <v-layout>
            <v-flex xs6>
              <v-text-field
                v-model="item.name"
                label="Item"
                :rules="nameRules"
                :counter="50"
                required
              />
            </v-flex>

            <v-flex xs6>
              <v-text-field v-model="item.price" label="Price" :rules="priceRules" required />
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="deleteItem(item)">Delete</v-btn>
        <v-btn color="primary" @click="editItem(item)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ElementType from '@/constants/types/ElementType'
import firebase from 'firebase'
import { db } from '@/services/DataProvider'

export default {
  data: function() {
    return {
      dialog: false,
      item: null,
      itemEditFormValid: false,
      nameRules: [
        v => !!v || 'Item name is required',
        v => v.length <= 50 || 'Name must be less than 10 characters'
      ],
      priceRules: [
        v => !!v || 'Price is required',
        v =>
          /^([1-9]\d*(\.|,)\d*|0?(\.|,)\d*[1-9]\d*|[1-9]\d*)$/.test(v) || 'Price must be a number'
      ],
      fixedExpensesList: []
    }
  },
  created: function() {
    this.$root.$on('showEditDialog', item => {
      console.log(item)
      this.item = item
      this.dialog = true
    })
  },
  firestore: function() {
    return {
      user: db.collection('users').doc(firebase.auth().currentUser.uid),
      settings: db.collection('settings').doc(firebase.auth().currentUser.uid),
      fixedExpensesList: db
        .collection('fixedExpenses')
        .where('uid', '==', firebase.auth().currentUser.uid)
    }
  },
  methods: {
    editItem: function() {
      if (this.itemEditFormValid) {
        if (this.item.type === ElementType.FIXED_EXPENSE) {
          this.$store.editFixedExpense(this.item.id, this.item.name, this.item.price)
        } else if (this.item.type === ElementType.SPENDING) {
          this.$store.editSpending(this.item.id, this.item.name, this.item.price)
        } else if (this.item.type === ElementType.EXTRA_INCOME) {
          this.$store.editExtraIncome(this.item.id, this.item.name, this.item.price)
        }

        this.dialog = false
      }
    },
    deleteItem: function() {
      if (this.itemEditFormValid) {
        if (this.item.type === ElementType.FIXED_EXPENSE) {
          this.$store.removeFixedExpense(this.item.id)
        } else if (this.item.type === ElementType.SPENDING) {
          this.$store.removeSpending(this.item.id)
        } else if (this.item.type === ElementType.EXTRA_INCOME) {
          this.$store.removeExtraIncome(this.item.id)
        }

        this.dialog = false
      }
    }
  }
}
</script>

<style scoped></style>

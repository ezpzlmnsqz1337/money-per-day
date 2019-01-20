<template>
    <v-dialog v-model="dialog" width="500">
      <slot slot="activator" name="activator"></slot>

      <v-card>
          <v-card-title
          class="headline grey lighten-2"
          primary-title
          @click="addFixedExpense">
          Add fixed expense
          </v-card-title>

          <v-form v-model="addExpenseFormValid" ref="form">
          <v-container>
              <v-layout>
              <v-flex xs6>
                  <v-text-field v-model="fixedExpenseName" label="Item"
                  :rules="fixedExpenseNameRules"
                  :counter="fixedExpenseLength"
                  required />
              </v-flex>

              <v-flex xs6>
                  <v-text-field v-model="fixedExpensePrice" label="Price"
                  :rules="fixedExpensePriceRules"
                  required />
              </v-flex>
              </v-layout>
          </v-container>
          </v-form>

          <v-divider></v-divider>

          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancel">Cancel</v-btn>
          <v-btn color="primary" @click="addFixedExpense">Add</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: function () {
    return {
      dialog: false,
      addExpenseFormValid: false,
      fixedExpenseName: '',
      fixedExpenseLength: 50,
      fixedExpenseNameRules: [
        v => !!v || 'Item name is required',
        v => v.length <= this.fixedExpenseLength || 'Name must be less than 10 characters'
      ],
      fixedExpensePrice: 0,
      fixedExpensePriceRules: [
        v => !!v || 'Price is required',
        v => /^([1-9]\d*(\.|,)\d*|0?(\.|,)\d*[1-9]\d*|[1-9]\d*)$/.test(v) || 'Price must be a number'
      ],
      fixedExpensesList: this.$store.state.settings.fixedExpenses
    }
  },
  methods: {
    addFixedExpense: function () {
      if (this.addExpenseFormValid) {
        this.$store.addFixedExpense(this.fixedExpenseName, this.fixedExpensePrice)
        this.dialog = false
        this.fixedExpenseName = ''
        this.fixedExpensePrice = 0
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

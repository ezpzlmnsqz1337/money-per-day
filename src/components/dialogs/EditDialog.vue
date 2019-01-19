<template>
  <v-dialog v-model="dialog" width="500" v-if="item">
    <slot slot="activator" name="activator"></slot>

    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
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
              <v-text-field
                v-model="item.price"
                label="Price"
                :rules="priceRules"
                required
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="editItem(item)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  created: function () {
    this.$root.$on('showEditDialog', item => {
      this.item = item
      this.dialog = true
    })
  },
  data: function () {
    return {
      dialog: false,
      item: null,
      itemEditFormValid: false,
      nameRules: [
        v => !!v || 'Item name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      priceRules: [
        v => !!v || 'Price is required',
        v => /^([1-9]\d*(\.|,)\d*|0?(\.|,)\d*[1-9]\d*|[1-9]\d*)$/.test(v) || 'Price must be a number'
      ],
      spendings: this.$store.state.settings.spendings,
      fixedExpenses: this.$store.state.settings.fixedExpenses
    }
  },
  methods: {
    editItem: function () {
      if (this.itemEditFormValid) {
        if (this.item.type === 'FIXED_EXPENSE') {
          this.$store.editFixedExpense(
            this.item.id,
            this.item.name,
            this.item.price
          )
        } else if (this.item.type === 'SPENDING') {
          this.$store.editSpending(
            this.item.id,
            this.item.name,
            this.item.price
          )
        }

        this.dialog = false
      }
    }

  }
}
</script>

<style scoped>
</style>

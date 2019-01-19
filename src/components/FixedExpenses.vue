<template>
  <v-flex xs12 pa-0 mb-3>
    <v-card raised hover>
      <v-card-title primary-title class="headline">
        <v-flex xs8 pa-0>
          Fixed expenses
        </v-flex>
        <v-flex xs4>
          <v-layout justify-end :class="{ __text_red: total > 0 }">
            {{ total }} {{ currency }}
          </v-layout>
        </v-flex>
      </v-card-title>
      <v-divider v-show="fixedExpensesList.length > 0" />
      <v-list subheader>
        <v-list-tile
            v-for="(e, index) in fixedExpensesList"
            :key="index"
            @click="itemClick(e)"
            >

          <v-list-tile-content>
              <v-list-tile-title v-html="e.name"></v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
              <div style="color: red">- {{ e.price }} {{ e.currency }}</div>
          </v-list-tile-action>
        </v-list-tile>
        <FixedExpensesDialog>
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
        </FixedExpensesDialog>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import FixedExpensesDialog from './dialogs/FixedExpensesDialog'

export default {
  name: 'fixedExpenses',
  components: { FixedExpensesDialog },
  data () {
    return {
      fixedExpensesList: this.$store.state.settings.fixedExpenses,
      currency: this.$store.state.settings.currency
    }
  },
  computed: {
    total: function () {
      return this.fixedExpensesList.reduce((prev, current) => prev + parseInt(current.price), 0)
    }
  },
  methods: {
    itemClick (item) {
      this.$root.$emit('showEditDialog', item)
    },
    removeExpense: function (id) {
      this.$store.removeFixedExpense(id)
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

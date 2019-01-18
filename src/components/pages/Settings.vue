<template>
  <v-layout row>
      <Header text="Settings"></Header>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs6>
            <v-subheader>Salary day of month:</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="days"
              v-model="salaryDay"
              item-value="text" />
          </v-flex>
          <v-flex xs6>
            <v-subheader>Salary</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              type="number"
              v-model="salary" />
          </v-flex>
          <v-flex xs6>
            <v-subheader>Fixed expenses</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-list dense>
              <v-list-tile v-for="(expense, index) in fixedExpensesList" :key="index">
                <v-list-tile-content>
                  <v-list-tile-title v-text="expense.name" />
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-list-tile-action-text>{{ expense.price }} {{ currency }}</v-list-tile-action-text>
                </v-list-tile-action>

                <v-list-tile-action>
                  <v-icon @click="removeExpense(expense.id)"
                    class="__delete_button">delete</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
            <v-flex class="text-xs-center" xs2>
              <FixedExpensesDialog>
                <v-btn slot="activator" color="primary">
                  <v-icon>add</v-icon>
                  Add
                </v-btn>
              </FixedExpensesDialog>
            </v-flex>
          </v-flex>

          <v-flex xs6>
            <v-subheader>Currency:</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="currencies"
              v-model="currency" />
          </v-flex>
        </v-layout>
      </v-container>
  </v-layout>
</template>

<script>
import FixedExpensesDialog from '../dialogs/FixedExpensesDialog'
import { currencies } from '../../assets/currencies'

export default {
  name: 'settings',
  components: { FixedExpensesDialog },
  created: function () {
    for (let i = 1; i < 32; i++) {
      this.days.push(i)
    }
  },
  mounted: function () {
  },
  data: function () {
    return {
      days: [],
      fixedExpensesList: this.$store.state.settings.fixedExpenses,
      dialog: false,
      currencies: Object.keys(currencies)
    }
  },
  computed: {
    salaryDay: {
      get: function () {
        return parseInt(this.$store.state.settings.salaryDay)
      },
      set: function (newVal) {
        this.$store.state.settings.salaryDay = newVal
        this.$store.updateTimestamp()
      }
    },
    salary: {
      get: function () {
        return parseInt(this.$store.state.settings.salary)
      },
      set: function (newVal) {
        this.$store.state.settings.salary = newVal
        this.$store.updateTimestamp()
      }
    },
    currency: {
      get: function () {
        return this.$store.state.settings.currency
      },
      set: function (newVal) {
        this.$store.state.settings.currency = newVal
        this.$store.updateTimestamp()
      }
    }
  },
  methods: {
    removeExpense: function (id) {
      this.$store.removeFixedExpense(id)
    }
  }
}

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .__align-right{
    text-align: right;
  }

  .__delete_button:hover{
    color: #f44336!important;
  }
</style>

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
            <v-subheader>Salary  [{{ currency }}]</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              mask="## ###"
              v-model="salary" />
          </v-flex>
          <v-flex xs6>
            <v-subheader>Fixed expenses [{{ currency }}]</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              mask="## ###"
              v-model="fixedExpenses" />
          </v-flex>
        </v-layout>
      </v-container>
  </v-layout>
</template>

<script>
import { store } from '../../services/Store'

export default {
  name: 'settings',
  created: function () {
    for (let i = 1; i < 32; i++) {
      this.days.push(i)
    }

    setInterval(() => {
      console.table(this.$data)
    }, 500)
  },
  mounted: function () {
  },
  data: function () {
    return {
      salaryDay: store.state.settings.salaryDay,
      salary: store.state.settings.salary,
      fixedExpenses: store.state.settings.fixedExpenses,
      currency: store.state.settings.currency,
      days: []
    }
  },
  methods: {
    show () {
      console.log('EASY')
    }
  }
}

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>

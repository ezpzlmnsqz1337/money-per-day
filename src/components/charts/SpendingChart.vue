<template>
  <v-flex xs12 pa-0 mb-3 v-if="data.length > 0">
    <v-card raised hover>
      <v-card-title primary-title>
        <v-flex xs12 class="headline">Spending chart</v-flex>
      </v-card-title>
      <v-flex xs12>
        <v-sparkline
          :value="values"
          :labels="labels"
          :gradient="['red']"
          :smooth="true"
          padding="24"
          line-width="2"
          stroke-linecap="round"
          auto-draw
        >
          <template slot="label" slot-scope="item">
            <span class="caption">${{ item.value }}</span>
          </template>
        </v-sparkline>
      </v-flex>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: [ 'data' ],
  data: function () {
    return {
    }
  },
  computed: {
    values: function () {
      if (this.data.length === 0) return
      const values = this.data.map(item => {
        console.log(item.price)
        return parseInt(item.price)
      })
      console.log('Values: ', values)
      return values
    },
    labels: function () {
      if (this.data.length === 0) return
      const labels = this.data.map(item => {
        return item.name
      })
      console.log('Labels: ', labels)
      return labels
    }
  }
}
</script>

<style scoped>
</style>

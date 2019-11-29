<template>
  <v-flex v-if="data && data.length > 1" xs12 pa-0 mb-3>
    <v-card raised hover>
      <v-card-title primary-title>
        <v-flex xs12 class="headline">Spending chart</v-flex>
      </v-card-title>
      <v-flex xs12>
        <v-sparkline
          :value="values"
          :labels="labels"
          color="red"
          smooth
          padding="24"
          line-width="1"
          stroke-linecap="round"
          auto-draw
        >
          <template slot="label" slot-scope="item">
            <span>{{ item.value }}</span>
          </template>
        </v-sparkline>
      </v-flex>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {}
    }
  },
  data: function() {
    return {}
  },
  computed: {
    values: function() {
      if (this.data.length === 0) return
      const values = this.data.map(item => {
        return -1 * parseInt(item.price)
      })
      return values
    },
    labels: function() {
      if (this.data.length === 0) return
      const labels = this.data.map(item => {
        return item.name
      })
      return labels
    }
  }
}
</script>

<style scoped></style>

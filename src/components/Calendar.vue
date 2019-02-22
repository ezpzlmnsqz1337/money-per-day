<template>
  <v-flex xs12 pa-0 mb-3>
    <v-card raised hover>
      <v-card-title primary-title class="headline">
        <v-flex xs7 pa-0>
          Calendar
        </v-flex>
        <v-flex xs5>
          <v-layout justify-end :class="{ __text_red: total > 0 }">
            <div class="__currency">{{ total > 0 ? '-' + total : total }} {{ currency }}</div>
          </v-layout>
        </v-flex>
      </v-card-title>
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          :end="end"
          color="primary"
        ></v-calendar>
      </v-sheet>
    </v-card>
  </v-flex>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  firestore: function () {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .__text_red{
    color: #f44336!important;
  }
  .__currency{
      font-size: 1.3rem;
  }
  .__item_currency{
    width: 14rem;
    text-align: right;
  }
</style>

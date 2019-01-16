<template>
    <v-card raised hover >
        <v-card-title primary-title class="headline">Spendings</v-card-title>
        <v-list subheader >
            <v-list-tile
                v-for="(s, index) in spendings"
                :key="index"
                @click="itemClick"
                >

            <v-list-tile-content>
                <v-list-tile-title v-html="s.name"></v-list-tile-title>
                <v-list-tile-sub-title>{{ s.date }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
                <div style="color: red">- {{ s.price }} {{ s.currency }}</div>
            </v-list-tile-action>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      spendings: this.$store.state.settings.spendings
    }
  },
  computed: {},
  methods: {
    itemClick () {
      console.log('item click')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>

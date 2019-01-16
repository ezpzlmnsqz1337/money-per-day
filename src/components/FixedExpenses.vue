<template>
    <v-list subheader>
        <v-subheader>Spendings</v-subheader>
        <v-list-tile
            v-for="(s, index) in spendings"
            :key="index"
            @click="itemClick"
            >

        <v-list-tile-content>
            <v-list-tile-title v-html="s.name"></v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
            <div style="color: red">- {{ s.price }} {{ s.currency }}</div>
        </v-list-tile-action>
        </v-list-tile>
    </v-list>
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

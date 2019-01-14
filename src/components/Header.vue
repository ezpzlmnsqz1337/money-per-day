<template>
  <v-layout row>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{text}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="state.user">
        <v-chip class="chip_height">
          <v-avatar>
            <img v-bind:src="state.user.photoURL" alt="user icon">
          </v-avatar>
          {{state.user.displayName}}
        </v-chip>
      </v-toolbar-items>
    </v-toolbar>
  </v-layout>
</template>

<script>
import store from '../services/Store'

export default {
  name: 'topbar',
  data () {
    return {
      state: store.state,
      text: 'Home'
    }
  },
  methods: {
    toggleDrawer () {
      this.$root.$emit('toggleDrawer')
    }
  },
  watch: {
    $route (to, from) {
      this.text = to.name
    }
  },
  components: {}
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.chip_height {
  margin-top: 1rem;
  height: 2.7rem;
}
</style>

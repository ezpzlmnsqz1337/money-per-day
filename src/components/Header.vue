<template>
  <v-layout row>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{text}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="user">
        <v-chip class="__user_chip" @click="$router.push('/Profile')">
          <v-avatar>
            <img v-bind:src="user.photoURL" alt="user icon">
          </v-avatar>
          {{user.displayName}}
        </v-chip>
      </v-toolbar-items>
    </v-toolbar>
  </v-layout>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'topbar',
  data () {
    return {
      user: firebase.auth().currentUser,
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
.__user_chip {
  margin-top: 1rem;
  height: 2.7rem;
}

.__user_chip:hover{
  cursor: pointer;
}
</style>

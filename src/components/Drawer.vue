<template>
  <v-navigation-drawer app v-model="drawer">
    <v-toolbar flat color="indigo">
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">{{title}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense pt-0>
      <v-list-tile v-for="item in items" :key="item.title" @click="goTo(item.route)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="user" @click="signOut()">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Sign out</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'drawer',
  created () {
    this.$root.$on('toggleDrawer', this.toggleDrawer)
  },
  data () {
    return {
      user: true,
      firebase: firebase,
      title: 'Money per day',
      items: [
        {
          id: 1,
          title: 'Home',
          icon: 'home',
          route: '/home'
        },
        {
          id: 2,
          title: 'Settings',
          icon: 'settings',
          route: '/settings'
        },
        {
          id: 3,
          title: 'Profile',
          icon: 'account_circle',
          route: '/profile'
        }
      ],
      drawer: false
    }
  },
  watch: {
    drawer (value) {
      return value
    }
  },
  methods: {
    goTo (destination) {
      this.$router.replace(destination)
    },
    toggleDrawer () {
      this.drawer = !this.drawer
    },
    signOut () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.state.user = null
        })
        .catch(err => console.log(err))
    }
  },
  props: {}
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.title {
  color: white;
}
</style>

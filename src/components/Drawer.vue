<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-toolbar flat color="indigo">
      <v-list>
        <v-list-item>
          <v-list-item-title class="title">{{ title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense pt-0>
      <v-list-item v-for="item in items" :key="item.title" @click="goTo(item.route)">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="user" @click="signOut()">
        <v-list-item-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Sign out</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Drawer',
  props: {},
  data() {
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
          title: 'Statistics',
          icon: 'bar_chart',
          route: '/statistics'
        },
        {
          id: 3,
          title: 'Settings',
          icon: 'settings',
          route: '/settings'
        },
        {
          id: 4,
          title: 'Profile',
          icon: 'account_circle',
          route: '/profile'
        }
      ],
      drawer: false
    }
  },
  watch: {
    drawer(value) {
      return value
    }
  },
  created() {
    this.$root.$on('toggleDrawer', this.toggleDrawer)
  },
  methods: {
    goTo(destination) {
      this.$router.replace(destination)
    },
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.state.user = null
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.title {
  color: white;
}
</style>

<template>
  <v-app-bar color="indigo" dark fixed app>
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ text }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-app-bar-items v-if="false">
      <v-chip class="__user_chip" @click="$router.push('/Profile')">
        <v-avatar>
          <img :src="user.photoURL" alt="user icon" />
        </v-avatar>
        {{ user.displayName }}
      </v-chip>
    </v-app-bar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Topbar',
  components: {},
  data: function() {
    return {
      user: null,
      text: 'Home'
    }
  },
  watch: {
    $route(to, from) {
      this.text = to.name
    }
  },
  methods: {
    toggleDrawer() {
      this.$root.$emit('toggleDrawer')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.__user_chip {
  margin-top: 1rem;
  height: 2.7rem;
}

.__user_chip:hover {
  cursor: pointer;
}
</style>

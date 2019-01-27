<template>
  <v-app>
    <Drawer />
    <Header/>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: { Drawer, Header }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.red {
  color: red;
}

.green {
  color: green;
}
</style>

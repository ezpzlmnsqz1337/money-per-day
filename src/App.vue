<template>
  <v-app>
    <Drawer />
    <Header/>
    <v-content>
      <v-snackbar
        v-model="snackbar"
        multi-line
        top
        :timeout="4000"
      >
        {{ snackBarText }}
        <v-btn
          dark
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
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
  created: function () {
    this.$root.$on('showSnackBar', text => {
      console.log('YES')
      this.snackBarText = text
      this.snackbar = true
    })
  },
  data: function () {
    return {
      snackbar: false,
      snackBarText: ''
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

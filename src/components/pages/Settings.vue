<template>
  <v-layout row>
      <Header text="Settings"></Header>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs6>
            <v-subheader>Standard</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="items"
              v-model="e1"
              label="Select"
              single-line
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-subheader>Standard with focus</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="items"
              v-model="e2"
              label="Select"
              class="input-group--focused"
              item-value="text"
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-subheader>Error</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              label="Select"
              :items="items"
              v-model="e3"
              :error-messages="['Please select an option']"
              item-value="text"
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-subheader>Disabled</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              label="Select"
              :items="items"
              v-model="e4"
              disabled
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>
  </v-layout>
</template>

<script>
export default {
  name: 'settings',
  data () {
    return {
      items: [
        {
          'title': 'your mother',
          'text': 'fuck you'
        }
      ]
    }
  },
  methods: {
    show () {
      console.log('EASY')
    }
  }
}

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>

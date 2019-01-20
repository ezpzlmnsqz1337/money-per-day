<template>
    <v-flex xs12 pa-0 mb-3>
        <v-card raised hover >
            <v-card-title primary-title class="headline">
                <v-flex xs8 pa-0>
                    Spendings
                </v-flex>
                <v-flex xs4>
                    <v-layout justify-end :class="{ __text_red: total > 0 }">
                    {{ total }} {{ currency }}
                    </v-layout>
                </v-flex>
            </v-card-title>
            <v-divider v-show="spendings.length > 0" />
            <v-expansion-panel>
                <v-expansion-panel-content>
                <div slot="header"></div>
                    <v-list subheader>
                        <v-list-tile
                            v-for="(s, index) in spendings"
                            :key="index"
                            @click="itemClick(s)"
                            >

                            <v-list-tile-content>
                                <v-list-tile-title v-html="s.name"></v-list-tile-title>
                                <v-list-tile-sub-title>{{ s.date }}</v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <div style="color: red">- {{ s.price }} {{ s.currency }}</div>
                            </v-list-tile-action>
                        </v-list-tile>

                        <SpendingsDialog>
                            <v-btn
                                absolute
                                dark
                                fab
                                bottom
                                right
                                color="primary"
                                slot="activator"
                                >
                                    <v-icon>add</v-icon>
                            </v-btn>
                        </SpendingsDialog>
                    </v-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-card>
    </v-flex>
</template>

<script>
import SpendingsDialog from './dialogs/SpendingsDialog'

export default {
  name: 'spendings',
  components: { SpendingsDialog },
  data () {
    return {
      spendings: this.$store.state.settings.spendings,
      currency: this.$store.state.settings.currency
    }
  },
  computed: {
    total: function () {
      return this.spendings.reduce((prev, current) => prev + parseInt(current.price), 0)
    }
  },
  methods: {
    itemClick (item) {
      this.$root.$emit('showEditDialog', item)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .__text_red{
    color: #f44336!important;
  }
</style>

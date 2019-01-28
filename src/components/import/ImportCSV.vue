<template>
    <v-dialog v-model="dialog" width="800">
        <slot slot="activator" name="activator"></slot>
        <v-card>
            <v-card-title
                class="headline grey lighten-2"
                primary-title
            >
                Edit item
            </v-card-title>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-textarea
                        v-model="csvText"
                        label="CSV content"
                        hint="Paste your csv content here..."
                        ></v-textarea>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="importCsv">Save</v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
import csvParse from 'csv-parse'

export default {
  data: function () {
    return {
      dialog: false,
      csvText: ''
    }
  },
  methods: {
    importCsv: function () {
      if (!this.csvText) return

      csvParse(this.csvText, { delimiter: ';' }, (err, output) => {
        if (!err) {
          console.log(output)
        } else {
          console.log('Error parsing csv text!', err)
        }
      })
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>

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
          this.addItemsToDatabase(output)
        } else {
          console.log('Error parsing csv text!', err)
        }
      })
    },
    addItemsToDatabase: function (csvItems) {
      const items = []
      for (let i = 1; i < csvItems.length; i++) {
        const row = csvItems[i]
        // price
        let price = parseFloat(row[13].replace(',', '.').replace(' ', ''))
        console.log('Price: ', row[13])
        // skip if we get income instead of spending
        if (price > 0) continue
        // else
        price = -1 * price

        // date
        let date = row[1].split(' ')
        date = date[0].split('.')
        date = new Date(date[2], date[1] - 1, date[0])
        // name
        let name = row[8] ? row[8] : row[7] + ': ' + row[6]

        // currency
        let currency = row[14]
        items.push({ name, price, date, currency })
      }
      if (items) {
        this.$store.addSpendingsImport(items)
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>

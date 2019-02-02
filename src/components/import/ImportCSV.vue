<template>
    <v-dialog v-model="dialog" width="800">
        <slot slot="activator" name="activator"></slot>
        <v-card>
            <v-card-title
                class="headline grey lighten-2"
                primary-title
            >
                Import data
            </v-card-title>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                       <v-radio-group v-model="importType">
                        <v-radio
                          label="Debit card"
                          value="debit_card"
                        ></v-radio>
                        <v-radio
                          label="Credit card"
                          value="credit_card"
                        ></v-radio>
                      </v-radio-group>
                    </v-flex>
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
      importType: 'debit_card',
      csvText: ''
    }
  },
  methods: {
    importCsv: function () {
      if (!this.csvText) return

      csvParse(this.csvText, { delimiter: ';' }, (err, output) => {
        if (!err) {
          if (this.importType === 'debit_card') {
            this.addDebitItemsToDatabase(output)
          } else if (this.importType === 'credit_card') {
            this.addCreditCardItemsToDatabase(output)
          }
        } else {
          console.log('Error parsing csv text!', err)
        }
      })
    },
    addDebitItemsToDatabase: function (csvItems) {
      const items = []
      for (let i = 1; i < csvItems.length; i++) {
        const row = csvItems[i]
        // price
        let price = parseFloat(row[13].replace(',', '.').replace(' ', ''))
        // skip if we get income instead of spending
        if (price > 0) continue
        // else
        price = -1 * price

        // date
        let date = row[0].split(' ')
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
    },
    addCreditCardItemsToDatabase: function (csvItems) {
      const items = []
      for (let i = 1; i < csvItems.length; i++) {
        const row = csvItems[i]
        // price
        let price = 0
        if (!row[7]) {
          price = parseFloat(row[5].replace(',', '.').replace(' ', ''))
        } else {
          price = parseFloat(row[7].replace(',', '.').replace(' ', ''))
        }

        // skip if we get income instead of spending
        if (price > 0) continue
        // else
        price = -1 * price

        // date
        let date = row[2].split(' ')
        date = date[0].split('.')
        date = new Date(date[2], date[1] - 1, date[0])
        // name
        let name = row[10]

        // currency
        let currency = row[8] ? row[8] : row[6]

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

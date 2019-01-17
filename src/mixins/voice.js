import annyang from 'annyang'
import { SpeechKITT } from '../../node_modules/speechkitt/src/speechkitt'

export default {
  mounted: function () {
    if (annyang) {
      annyang.setLanguage('en')
      // Add our commands to annyang
      annyang.addCommands({
        'en': {
          'hello': function () { console.log('hello') },
          'add *item for *price': function (item, price) { this.$store.addSpending(item, price) }
        },
        'cs': {
          'hello': () => { console.log('hello') },
          'přidej *item za *price': this.$store.addSpending
        }
      })
      SpeechKITT.displayRecognizedSentence(true)

      // Tell KITT to use annyang
      SpeechKITT.annyang()

      // Define a stylesheet for KITT to use
      SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/1.0.0/themes/flat.css')

      // Render KITT's interface
      SpeechKITT.vroom()
    }
  }
}

import annyang from 'annyang'
import { SpeechKITT } from '../../node_modules/speechkitt/src/speechkitt'

export default {
  mounted: function () {
    if (annyang) {
      annyang.setLanguage('en')
      // Add our commands to annyang
      annyang.addCommands({
        'hello': function () { this.showSnackbar('hello') },
        'how are you': function () { this.showSnackbar('I fuck yo mom') },
        'add *item for *price': function (item, price) { this.showSnackbar(`Adding item ${item} for ${price},- CZK`) }
      })
      SpeechKITT.displayRecognizedSentence(true)

      // Tell KITT to use annyang
      SpeechKITT.annyang()

      // Define a stylesheet for KITT to use
      SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/1.0.0/themes/flat.css')

      // Render KITT's interface
      SpeechKITT.vroom()
    }
  },
  methods: {
    showSnackbar: function (text) {
      this.$root.$emit('showSnackBar', text)
    }
  }
}

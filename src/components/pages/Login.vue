<template>
  <v-layout row>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  prepend-icon="person"
                  name="login"
                  label="Login"
                  type="text"
                ></v-text-field>
                <v-text-field
                  id="password"
                  v-model="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-layout justify-center px-2>
                <v-btn color="primary" block @click="signInWithEmail">Login</v-btn>
              </v-layout>
            </v-card-actions>
            <div class="text-xs-center">
              <h2>Or sign in with:</h2>
              <v-layout px-2 justify-center>
                <a
                  class="google_sign_in_button"
                  href="#"
                  @click="signInWithGoogle()"
                  @focus="setGoogleButtonState('focus')"
                >
                  <img
                    ref="googleButton"
                    :src="googleBtn.normal"
                    @mouseover="setGoogleButtonState('hover')"
                    @mouseout="setGoogleButtonState('normal')"
                  />
                </a>
              </v-layout>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="dialog" persistent width="200">
      <v-card color="primary" dark>
        <v-card-text class="text-xs-center">
          Logging in...<br /><br />
          <v-progress-circular indeterminate color="white" class="mb-0" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import firebase from 'firebase'

export default {
  data: function() {
    return {
      dialog: false,
      email: '',
      password: '',
      googleBtn: {
        normal: require('../../assets/google_button/btn_google_signin_dark_normal_web@2x.png'),
        focus: require('../../assets/google_button/btn_google_signin_dark_focus_web@2x.png'),
        hover: require('../../assets/google_button/btn_google_signin_dark_pressed_web@2x.png')
      }
    }
  },
  methods: {
    signInWithEmail: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(err => alert(err))
    },
    signInWithGoogle: function() {
      this.dialog = true
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          const token = result.credential.accessToken
          const user = result.user
          console.log('token: ', token)
          console.log('User: ', user)
        })
        .catch(err => alert(err))
    },
    setGoogleButtonState: function(state) {
      switch (state) {
        case 'normal':
          this.$refs.googleButton.setAttribute('src', this.googleBtn.normal)
          break
        case 'focus':
          this.$refs.googleButton.setAttribute('src', this.googleBtn.focus)
          break
        case 'hover':
          this.$refs.googleButton.setAttribute('src', this.googleBtn.hover)
          break
        default:
          console.log('unknown google button state')
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.google_sign_in_button img {
  width: 100%;
}
</style>

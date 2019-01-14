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
                <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary">Login</v-btn>
            </v-card-actions>
            <div class="text-xs-center">
              <h2>Or sign in with:</h2>
              <a @click="signInWithGoogle()" class="google_sign_in_button" href="#google_sign_in_button" />
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
// import store from '../../services/Store'

export default {
  data: function () {
    return {}
  },
  methods: {
    signInWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithRedirect(provider)
        .catch(err => console.log(err))
    }
  }

}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .google_sign_in_button{
    background: url('../../assets/google_button/btn_google_signin_dark_normal_web@2x.png');
    display: inline-block;
    width: 382px;
    height: 92px;
  }

  .google_sign_in_button:focus {
    background: url('../../assets/google_button/btn_google_signin_dark_focus_web@2x.png');
  }

  .google_sign_in_button:target, .google_sign_in_button:hover{
    background: url('../../assets/google_button/btn_google_signin_dark_pressed_web@2x.png');
  }
</style>

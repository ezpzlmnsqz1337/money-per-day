export const store = {
  debug: true,
  state: {
    user: null
  },
  setUser (user) {
    console.log(user)
    this.state.user = user
  },
  clearUser () {
    this.state.user = null
  }
}

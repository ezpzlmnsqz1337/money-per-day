export const store = {
  debug: true,
  state: {
    user: null,
    settings: {
      salaryDay: 1,
      salary: 0,
      fixedExpenses: 0,
      currency: '€'
    }
  },
  setUser (user) {
    console.log(user)
    this.state.user = user
  },
  clearUser () {
    this.state.user = null
  }
}

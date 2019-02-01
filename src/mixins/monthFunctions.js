export default {
  data: function () {
    return {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    }
  },
  computed: {
    filteredSpendingsList: function () {
      if (!this.spendingsList) return
      const newList = this.spendingsList.filter(s => s.date.toDate() >= this.fromDate && s.date.toDate() < this.toDate)
      return newList
    },
    fromDate: function () {
      const date = new Date(this.year, this.month - 2, this.salaryDay)
      return date
    },
    toDate: function () {
      const date = new Date(this.year, this.month - 1, this.salaryDay)
      return date
    },
    salaryDay: function () {
      if (!this.settings) return
      return this.settings.salaryDay
    }
  }
}

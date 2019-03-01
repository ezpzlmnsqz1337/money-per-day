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
      if (!this.spendingsList) return []
      const newList = this.spendingsList.filter(s => s.date.toDate() >= this.fromDate && s.date.toDate() < this.toDate)
      return newList
    },
    filteredExtraIncomesList: function () {
      if (!this.extraIncomesList) return []
      const newList = this.extraIncomesList.filter(s => s.date.toDate() >= this.fromDate && s.date.toDate() < this.toDate)
      return newList
    },
    realMonth: function () {
      let month = this.month - 2
      if (this.day - this.salaryDay < 0) {
        month += 1
      }
      return month
    },
    fromDate: function () {
      const date = new Date(this.year, this.realMonth - 1, this.salaryDay)
      return date
    },
    toDate: function () {
      const date = new Date(this.year, this.realMonth, this.salaryDay)
      return date
    },
    salaryDay: function () {
      if (!this.settings) return
      return this.settings.salaryDay
    }
  }
}

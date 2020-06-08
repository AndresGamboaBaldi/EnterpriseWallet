import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accounts: [
      {
        account: "root",
        type: "debit",
        incomes: [],
        expenses: []
      }
    ],
    selectAccount: {
      account: "",
      type: "",
      incomes: [],
      expenses: []
    },
    categories: {
      income: [{ name: "Transaction" }, { name: "Other" }],
      expense: [{ name: "Transaction" }, { name: "Other" }]
    }
  },
  actions: {
    addAccount({ commit }, newAccount) {
      commit("mutateAccounts", newAccount);
    },
    chooseAccount({ commit }, newSeletedAccount) {
      commit("mutateSelectAccount", newSeletedAccount);
    },
    updateAccout({ commit }, newNameAccount) {
      commit("mutateUpdateAccount", newNameAccount);
    },
    deleteAccount({ commit }, nameAccount) {
      commit("mutateDeleteAccount", nameAccount);
    },
    addExpense({ commit }, newExpense) {
      commit("mutateAddExpense", newExpense);
    },
    updateExpense({ commit }, expenseToUpdate) {
      commit("mutateUpdateExpense", expenseToUpdate);
    },
    deleteExpense({ commit }, expenseToDelete) {
      commit("mutateDeleteExpense", expenseToDelete);
    },
    addIncomeCategory({ commit }, category) {
      commit("mutateIncomeList", category);
    },
    addExpenseCategory({ commit }, category) {
      commit("mutateExpenseList", category);
    },
    //Income
    addIncome({ commit }, newIncome) {
      commit("mutateAddIncome", newIncome);
    },
    updateIncome({ commit }, updatedIncome) {
      commit("mutateUpdateIncome", updatedIncome);
    },
    deleteIncome({ commit }, incomeToDelete) {
      commit("mutateDeleteIncome", incomeToDelete);
    }
  },
  mutations: {
    mutateAccounts(state, newAccount) {
      state.accounts.push(newAccount);
    },
    mutateSelectAccount(state, newSeletedAccount) {
      state.selectAccount.account = newSeletedAccount.account;
      state.selectAccount.type = newSeletedAccount.type;
      state.selectAccount.incomes = newSeletedAccount.incomes;
      state.selectAccount.expenses = newSeletedAccount.expenses;
    },
    mutateUpdateAccount(state, newNameAccount) {
      state.selectAccount.account = newNameAccount;
    },
    mutateDeleteAccount(state, nameAccount) {
      var indexOfItem;
      state.accounts.find(item => item.account === nameAccount);
      indexOfItem = state.accounts.indexOf(this.item);
      if (this.item !== null) {
        state.accounts.splice(indexOfItem, 1);
      }
    },
    mutateAddExpense(state, newExpense) {
      state.selectAccount.expenses.push(newExpense);
    },
    mutateUpdateExpense(state, updatedExpense) {
      var indexOfItem;
      state.selectAccount.expenses.find(
        expense => expense.name === updatedExpense.name
      );
      indexOfItem = state.selectAccount.expenses.indexOf(this.expense);
      if (this.expense !== null) {
        state.selectAccount.expenses.splice(indexOfItem, 1, updatedExpense);
      }
    },
    mutateDeleteExpense(state, expenseToDelete) {
      var indexOfItem;
      state.selectAccount.expenses.find(
        expense => expense.name === expenseToDelete
      );
      indexOfItem = state.selectAccount.expenses.indexOf(this.expense);
      if (this.expense !== null) {
        state.selectAccount.expenses.splice(indexOfItem, 1);
      }
    },
    mutateIncomeList(state, category) {
      if (category.name != "") {
        var rep = false;
        state.categories.income.forEach(element => {
          if (element.name === category.name) {
            rep = true;
          }
        });
        if (rep === false) {
          state.categories.income.push(category);
        }
      }
    },
    mutateExpenseList(state, category) {
      if (category.name != "") {
        var rep = false;
        state.categories.expense.forEach(element => {
          if (element.name === category.name) {
            rep = true;
          }
        });
        if (rep === false) {
          state.categories.expense.push(category);
        }
      }
    },
    //Income
    mutateAddIncome(state, newIncome) {
      state.selectAccount.incomes.push(newIncome);
    },
    mutateUpdateIncome(state, updatedIncome) {
      //var list = state.selectAccount.incomes;
      var index;
      state.selectAccount.incomes.forEach(income => {
        if (income.name === updatedIncome.name) {
          index = state.selectAccount.incomes.indexOf(income);
          if (index > -1) {
            state.selectAccount.incomes.splice(index, 1, updatedIncome);
          }
        }
      });
    },
    mutateDeleteIncome(state, incomeToDelete) {
      // var list = state.selectAccount.incomes;
      var index;
      state.selectAccount.incomes.forEach(income => {
        if (income.name === incomeToDelete) {
          index = state.selectAccount.incomes.indexOf(income);
          if (index > -1) {
            state.selectAccount.incomes.splice(index, 1);
          }
        }
      });
    }
  },
  getters: {
    getAccounts(state) {
      return state.accounts;
    },
    getAccount(state) {
      return state.selectAccount;
    },
    getExpenseList(state) {
      return state.selectAccount.expenses;
    },
    getCategoryList(state) {
      return state.categories;
    },
    getIncomeList(state) {
      return state.selectAccount.incomes;
    }
  },
  modules: {}
});

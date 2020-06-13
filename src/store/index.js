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
    setUser({ commit }, currentUser) {
      commit("mutateUser", currentUser);
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
    addIncomeTransfered({ commit }, newTransferedIncome) {
      commit("mutateAddTransferedIncome", newTransferedIncome);
    },
    updateIncome({ commit }, updatedIncome) {
      commit("mutateUpdateIncome", updatedIncome);
    },
    deleteIncome({ commit }, incomeToDelete) {
      commit("mutateDeleteIncome", incomeToDelete);
    }
  },
  mutations: {
    mutateUser(state, currentUser) {
      state.obj.account = currentUser.account;
      state.obj.type = currentUser.type;
      state.obj.incomes = currentUser.incomes;
      state.expenses = currentUser.expenses;
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
    mutateAddTransferedIncome(state, newTransferedIncome) {
      const newIncome = {
        name: newTransferedIncome.name,
        category: newTransferedIncome.category,
        amount: newTransferedIncome.amount,
        date: newTransferedIncome.date
      };
      state.accounts.forEach(account => {
        if (account.account === account.account) {
          account.incomes.push(newIncome);
        }
      });
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
    getUser(state) {
      return state.obj;
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

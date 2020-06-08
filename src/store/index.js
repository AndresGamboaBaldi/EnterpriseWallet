import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    obj: {
      account: "",
      type: "",
      incomes: [],
      expenses: []
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
      state.obj.expenses.push(newExpense);
    },
    mutateUpdateExpense(state, updatedExpense) {
      var indexOfItem;
      state.obj.expenses.find(expense => expense.name === updatedExpense.name);
      indexOfItem = state.obj.expenses.indexOf(this.expense);
      if (this.expense !== null) {
        state.obj.expenses.splice(indexOfItem, 1, updatedExpense);
      }
    },
    mutateDeleteExpense(state, expenseToDelete) {
      var indexOfItem;
      state.obj.expenses.find(expense => expense.name === expenseToDelete);
      indexOfItem = state.obj.expenses.indexOf(this.expense);
      if (this.expense !== null) {
        state.obj.expenses.splice(indexOfItem, 1);
      }
    }
  },
  getters: {
    getUser(state) {
      return state.obj;
    },
    getExpenseList(state) {
      return state.obj.expenses;
    }
  },
  modules: {}
});

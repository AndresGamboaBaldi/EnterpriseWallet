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
    },
    categories: {
      income: [{ name: "Transaction" }, { name: "Other" }],
      expense: [{ name: "Transaction" }, { name: "Other" }],
    }
  },
  actions: {
    setUser({ commit }, currentUser) {
      commit("mutateUser", currentUser);
    },
    addIncomeCategory({ commit }, category) {
      commit("mutateIncomeList", category);
    },
    addExpenseCategory({ commit }, category) {
      commit("mutateExpenseList", category);
    }
  },
  mutations: {
    mutateUser(state, currentUser) {
      state.obj.account = currentUser.account;
      state.obj.type = currentUser.type;
      state.obj.incomes = currentUser.incomes;
      state.expenses = currentUser.expenses;
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
    }
  },
  getters: {
    getUser(state) {
      return state.obj;
    },
    getCategoryList(state) {
      return state.categories;
    }
  },
  modules: {}
});

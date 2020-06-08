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
      expense: [{ name: "Transaction" }, { name: "Other" }]
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
    },
    //Income
    mutateAddIncome(state, newIncome) {
      state.obj.incomes.push(newIncome);
    },
    mutateUpdateIncome(state, updatedIncome) {
      //var list = state.obj.incomes;
      var index;
      state.obj.incomes.forEach(income => {
        if (income.name === updatedIncome.name) {
          index = state.obj.incomes.indexOf(income);
          if (index > -1) {
            state.obj.incomes.splice(index, 1, updatedIncome);
          }
        }
      });
    },
    mutateDeleteIncome(state, incomeToDelete) {
     // var list = state.obj.incomes;
      var index;
      state.obj.incomes.forEach(income => {
        if (income.name === incomeToDelete) {
          index = state.obj.incomes.indexOf(income);
          if (index > -1) {
            state.obj.incomes.splice(index, 1);
          }
        }
      });
    }
  },
  getters: {
    getUser(state) {
      return state.obj;
    },
    getCategoryList(state) {
      return state.categories;
    },
    getIncomeList(state) {
      return state.obj.incomes;
    }
  },
  modules: {}
});

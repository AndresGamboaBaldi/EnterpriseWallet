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
    }
  },
  actions: {
    addAccount({ commit }, newAccount) {
      commit("mutateAccounts", newAccount);
    },
    chooseAccount({ commit }, newSeletedAccount) {
      commit("mutateSelectAccount", newSeletedAccount);
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
    }
  },
  getters: {
    getAccounts(state) {
      return state.accounts;
    }
  },
  modules: {}
});

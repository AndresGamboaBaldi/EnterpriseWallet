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
    }
  },
  mutations: {
    mutateUser(state, currentUser) {
      state.obj.account = currentUser.account;
      state.obj.type = currentUser.type;
      state.obj.incomes = currentUser.incomes;
      state.expenses = currentUser.expenses;
    }
  },
  getters: {
    getUser(state) {
      return state.obj;
    }
  },
  modules: {}
});

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accounts: [
      {
        account: "root",
        type: "debit",
        balance: 2700,
        incomes: [
          {
            name: "prueba1",
            category: "Other",
            amount: 1000,
            date: "12/1/2020",
            is: "income"
          },
          {
            name: "prueba2",
            category: "Other",
            amount: 2000,
            date: "12/3/2020",
            is: "income"
          }
        ],
        expenses: [
          {
            name: "prueba3",
            category: "Other",
            amount: 100,
            date: "12/5/2020",
            is: "expense"
          },
          {
            name: "prueba4",
            category: "Other",
            amount: 200,
            date: "12/2/2020",
            is: "expense"
          }
        ]
      }
    ],
    selectAccount: {
      account: "",
      type: "",
      balance: 0,
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
    //Accounts
    mutateAccounts(state, newAccount) {
      state.accounts.push(newAccount);
    },
    mutateSelectAccount(state, newSeletedAccount) {
      state.selectAccount.account = newSeletedAccount.account;
      state.selectAccount.type = newSeletedAccount.type;
      state.selectAccount.balance = newSeletedAccount.balance;
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
    //Expense
    mutateAddExpense(state, newExpense) {
      state.selectAccount.expenses.push(newExpense);
      state.selectAccount.balance =
        state.selectAccount.balance - newExpense.amount;
    },
    mutateUpdateExpense(state, updatedExpense) {
      var indexOfItem;
      var lastExpense;
      state.selectAccount.expenses.forEach(expense => {
        if (expense.name === updatedExpense.name) {
          lastExpense = expense.amount;
          indexOfItem = state.selectAccount.expenses.indexOf(expense);
          if (indexOfItem > -1) {
            state.selectAccount.expenses.splice(indexOfItem, 1, updatedExpense);
            state.selectAccount.balance =
              state.selectAccount.balance +
              Number(lastExpense) -
              Number(updatedExpense.amount);
          }
        }
      });
    },
    mutateDeleteExpense(state, expenseToDelete) {
      var indexOfItem;
      state.selectAccount.expenses.forEach(expense => {
        if (expense.name === expenseToDelete) {
          indexOfItem = state.selectAccount.expenses.indexOf(expense);
          if (indexOfItem > -1) {
            state.selectAccount.expenses.splice(indexOfItem, 1);
            state.selectAccount.balance =
              state.selectAccount.balance + Number(expense.amount);
          }
        }
      });
    },
    //Categories
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
      var existingIncome = false;
      if (
        (newIncome.name !== "" || newIncome.name !== null) &&
        newIncome.category !== "" &&
        newIncome.amount > 0
      ) {
        state.selectAccount.incomes.forEach(income => {
          if (income.name === newIncome.name) {
            existingIncome = true;
          }
        });
        if (!existingIncome) {
          state.selectAccount.incomes.push(newIncome);
          state.selectAccount.balance =
            state.selectAccount.balance + newIncome.amount;
        }
      }
    },
    mutateAddTransferedIncome(state, newTransferedIncome) {
      const newIncome = {
        name: newTransferedIncome.name,
        category: newTransferedIncome.category,
        amount: newTransferedIncome.amount,
        date: newTransferedIncome.date,
        is: newTransferedIncome.is
      };
      state.accounts.forEach(account => {
        if (account.account === newTransferedIncome.userAccount) {
          account.incomes.push(newIncome);
          var balance = Number(account.balance);
          account.balance = balance + Number(newIncome.amount);
        }
      });
    },
    mutateUpdateIncome(state, updatedIncome) {
      var index;
      var lastAmount;
      state.selectAccount.incomes.forEach(income => {
        if (income.name === updatedIncome.name) {
          lastAmount = income.amount;
          index = state.selectAccount.incomes.indexOf(income);
          if (index > -1) {
            if (updatedIncome.category !== "" && updatedIncome.amount > 0) {
              state.selectAccount.incomes.splice(index, 1, updatedIncome);
              state.selectAccount.balance =
                state.selectAccount.balance - lastAmount + updatedIncome.amount;
            }
          }
        }
      });
    },
    mutateDeleteIncome(state, incomeToDelete) {
      var index;
      state.selectAccount.incomes.forEach(income => {
        if (income.name === incomeToDelete) {
          index = state.selectAccount.incomes.indexOf(income);
          if (index > -1) {
            state.selectAccount.incomes.splice(index, 1);
            state.selectAccount.balance =
              state.selectAccount.balance - income.amount;
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

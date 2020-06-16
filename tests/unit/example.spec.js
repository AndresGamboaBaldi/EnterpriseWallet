import { assert } from "chai";
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Categories from "@/views/Categories.vue";
import Wallet from "@/views/Wallet.vue";
import Expenses from "@/views/Expenses.vue";
import Register from "@/views/Register.vue";
import Income from "@/views/Income.vue";

import store from "@/store";
import VueRouter from "vue-router";
import Vuex from "vuex";

describe("Transfer Unit Testing", () => {
  let localVue;
  let router;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    router = new VueRouter({ routes: [] });
    localVue.use(Vuex);
  });
  it("Transfer Button does exist", () => {
    const wrapper = shallowMount(Expenses, {
      store,
      router,
      localVue
    });
    let buttonName = "SubmitTransfer";
    assert.exists(wrapper.find(buttonName));
  });
  it("Adding new Transfer works correctly", async () => {
    global.alert = message => {
      console.log(message);
    };
    const wrapper = mount(Expenses, {
      store,
      router,
      localVue
    });
    await wrapper.vm.$store.dispatch("addAccount", {
      account: "root2",
      type: "credit",
      balance: 1000,
      incomes: [],
      expenses: []
    });
    await wrapper.vm.$store.dispatch("addAccount", {
      account: "root3",
      type: "credit",
      balance: 1,
      incomes: [],
      expenses: []
    });
    await wrapper.vm.$store.dispatch("chooseAccount", {
      account: "root2",
      type: "credit",
      balance: 1000,
      incomes: [],
      expenses: []
    });
    const initialExpensesLength =
      wrapper.vm.$store.state.selectAccount.expenses.length;
    const expectedExpensesLength = initialExpensesLength + 1;

    wrapper.vm.$data.transferUser = "root3";
    wrapper.vm.$data.expenseName = "NewTransferedIncome";
    wrapper.vm.$data.expenseCategory = "Other";
    wrapper.vm.$data.expenseAmount = 100;
    wrapper.vm.addNewTransfer();
    assert.equal(
      wrapper.vm.$store.state.selectAccount.expenses.length,
      expectedExpensesLength
    );
  });
});
//CATEGORIES UNIT TEST
describe("Income Category List ", () => {
  let localVue;
  let router;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    router = new VueRouter({ routes: [] });
    localVue.use(Vuex);
  });
  it("Income Lists Work Propperly", () => {
    const wrapper = mount(Categories, {
      store,
      router,
      localVue
    });
    let expectedInitialLength = 2;
    assert.equal(
      expectedInitialLength,
      wrapper.vm.$store.state.categories.income.length
    );

    wrapper.vm.addIncomeCategory("prueba");
    expectedInitialLength = 3;
    assert.equal(
      expectedInitialLength,
      wrapper.vm.$store.state.categories.income.length
    );
  });
  it("Income Interface Exists", () => {
    const wrapper = shallowMount(Categories, {
      store,
      router,
      localVue
    });
    let DivName = "IncomeInterface";
    assert.exists(wrapper.find(DivName));
  });

  it("Income Button Exists", () => {
    const wrapper = shallowMount(Categories, {
      store,
      router,
      localVue
    });
    let buttonName = "SubmitIncomeCategory";
    assert.exists(wrapper.find(buttonName));
  });
});

describe("Expense Category List ", () => {
  let localVue;
  let router;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    router = new VueRouter({ routes: [] });
    localVue.use(Vuex);
  });
  it("Expense Lists Work Propperly", () => {
    const wrapper = mount(Categories, {
      store,
      router,
      localVue
    });
    let expectedInitialLength = 2;
    assert.equal(
      expectedInitialLength,
      wrapper.vm.$store.state.categories.expense.length
    );

    wrapper.vm.addExpenseCategory("prueba");
    expectedInitialLength = 3;
    assert.equal(
      expectedInitialLength,
      wrapper.vm.$store.state.categories.expense.length
    );
  });

  it("Expense Interface Exists", () => {
    const wrapper = shallowMount(Categories, {
      store,
      router,
      localVue
    });
    let DivName = "ExpenseInterface";
    assert.exists(wrapper.find(DivName));
  });

  it("Expense Button Exists", () => {
    const wrapper = shallowMount(Categories, {
      store,
      router,
      localVue
    });
    let buttonName = "SubmitExpenseCategory";
    assert.exists(wrapper.find(buttonName));
  });
});
//WALLET UNIT TEST
describe("Wallet Unit Test ", () => {
  let localVue;
  let router;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    router = new VueRouter({ routes: [] });
    localVue.use(Vuex);
  });
  it("Wallet View Exists", () => {
    const wrapper = shallowMount(Wallet, {
      store,
      router,
      localVue
    });
    let DivName = "WalletView";
    assert.exists(wrapper.find(DivName));
  });
  it("Delete Account Works", () => {
    global.alert = message => {
      console.log(message);
    };
    const wrapper = shallowMount(Wallet, {
      store,
      router,
      localVue
    });
    let expectedInitialLength = wrapper.vm.$store.state.accounts.length;
    wrapper.vm.deleteAccount("root");
    assert.equal(
      expectedInitialLength - 1,
      wrapper.vm.$store.state.accounts.length
    );
  });
});
//REGISTER UNIT TEST
describe("Register Unit Test ", () => {
  let localVue;
  let router;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    router = new VueRouter({ routes: [] });
    localVue.use(Vuex);
  });
  // ->
  it("Add new Account Works", () => {
    global.alert = message => {
      console.log(message);
    };
    const wrapper = shallowMount(Register, {
      store,
      router,
      localVue
    });
    let expectedInitialLength = wrapper.vm.$store.state.accounts.length;
    wrapper.vm.addAccount({ name: "added" });
    assert.equal(
      expectedInitialLength + 1,
      wrapper.vm.$store.state.accounts.length
    );
  });
});
//EXPENSES UNIT TEST
describe("Expenses Logic Tests", () => {
  let localVue;
  let router;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    router = new VueRouter({ routes: [] });
    localVue.use(Vuex);
  });
  it("Testing Expense Field Validation", async () => {
    global.alert = message => {
      console.log(message);
    };
    const wrapper = mount(Expenses, {
      store,
      router,
      localVue
    });
    await wrapper.vm.$store.dispatch("chooseAccount", {
      account: "root",
      type: "debit",
      incomes: [
        {
          name: "prueba1",
          category: "other",
          amount: "15548",
          date: "12/1/2020",
          is: "income"
        }
      ],
      expenses: [
        {
          name: "prueba3",
          category: "other",
          amount: "15548",
          date: "12/5/2020",
          is: "expense"
        }
      ]
    });
    const expectedLength =
      wrapper.vm.$store.state.selectAccount.expenses.length;
    wrapper.vm.$data.expenseName = "";
    wrapper.vm.$data.expenseCategory = "";
    wrapper.vm.$data.expenseAmount = 200;
    wrapper.vm.$data.date = "15/06/2020";
    wrapper.vm.addNewExpense();
    assert.equal(
      wrapper.vm.$store.state.selectAccount.expenses.length,
      expectedLength
    );
  });
  it("Testing Expense Create", () => {
    global.alert = message => {
      console.log(message);
    };
    const wrapper = mount(Expenses, {
      store,
      router,
      localVue
    });
    const initiallength = wrapper.vm.$store.state.selectAccount.expenses.length;
    const expectedlength = initiallength + 1;
    wrapper.vm.addExpense({
      name: "Expense",
      category: "Transaction",
      amount: 0,
      date: "14/06/2020"
    });
    assert.equal(
      wrapper.vm.$store.state.selectAccount.expenses.length,
      expectedlength
    );
  });
  it("Testing Expense Delete", () => {
    const wrapper = mount(Expenses, {
      store,
      router,
      localVue
    });
    wrapper.vm.addExpense({
      name: "Expense",
      category: "Transaction",
      amount: 0,
      date: "14/06/2020"
    });
    const initiallength = wrapper.vm.$store.state.selectAccount.expenses.length;
    const expectedlength = initiallength - 1;
    wrapper.vm.deleteExpense("Expense");
    assert.equal(
      wrapper.vm.$store.state.selectAccount.expenses.length,
      expectedlength
    );
  });
});
describe("Expenses UI Tests", () => {
  let localVue;
  let router;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    router = new VueRouter({ routes: [] });
    localVue.use(Vuex);
  });
  it("The title should be rendered", () => {
    const expectedTitle = "EXPENSES";
    const wrapper = shallowMount(Expenses, {
      store,
      router,
      localVue
    });
    const titleInComponent = wrapper.find("#expensesTitle");
    assert.equal(titleInComponent.text(), expectedTitle);
  });
});
//INCOMES UNIT TEST
describe("Incomes interface", () => {
  let localVue;
  let router;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    router = new VueRouter({ routes: [] });
    localVue.use(Vuex);
  });
  it("Interface exists", () => {
    const wrapper = mount(Income, {
      store,
      router,
      localVue
    });
    let divName = "income";
    assert.exists(wrapper.find(divName));
  });
});
describe("CRUD methods in Income View", () => {
  let localVue;
  let router;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    router = new VueRouter({ routes: [] });
    localVue.use(Vuex);
  });
  it("Validation in fields works proppertly", () => {
    const wrapper = mount(Income, {
      store,
      router,
      localVue
    });
    const expectedLength = wrapper.vm.$store.state.selectAccount.incomes.length;
    //If all fields are invalid
    wrapper.vm.addIncome({
      name: "",
      category: "",
      amount: 0,
      date: "14/06/2020"
    });
    assert.equal(
      wrapper.vm.$store.state.selectAccount.incomes.length,
      expectedLength
    );
    //If 2 fields are invalid
    wrapper.vm.addIncome({
      name: "Income1",
      category: "",
      amount: 0,
      date: "14/06/2020"
    });
    assert.equal(
      wrapper.vm.$store.state.selectAccount.incomes.length,
      expectedLength
    );
    //If 1 field is invalid
    wrapper.vm.addIncome({
      name: "Income2",
      category: "Transaction",
      amount: 0,
      date: "14/06/2020"
    });
    assert.equal(
      wrapper.vm.$store.state.selectAccount.incomes.length,
      expectedLength
    );
  });
  it("Adding new Income works correctly", () => {
    const wrapper = mount(Income, {
      store,
      router,
      localVue
    });
    const initialLength = wrapper.vm.$store.state.selectAccount.incomes.length;
    const expectedLength = initialLength + 2;
    //If all fields are valid
    wrapper.vm.addIncome({
      name: "NewIncome",
      category: "Other",
      amount: 1000,
      date: "14/06/2020"
    });
    wrapper.vm.addIncome({
      name: "NewIncome2",
      category: "Transaction",
      amount: 2000,
      date: "14/06/2020"
    });
    assert.equal(
      wrapper.vm.$store.state.selectAccount.incomes.length,
      expectedLength
    );
  });
  it("Don't add a new Income if its name already exists.", () => {
    const wrapper = mount(Income, {
      store,
      router,
      localVue
    });
    const expectedLength = wrapper.vm.$store.state.selectAccount.incomes.length;
    //If all fields are valid but the newIncome's name already exists
    wrapper.vm.addIncome({
      name: "NewIncome",
      category: "Other",
      amount: 2000,
      date: "14/06/2020"
    });
    assert.equal(
      wrapper.vm.$store.state.selectAccount.incomes.length,
      expectedLength
    );
  });
  it("Updating an Income works correctly", () => {
    const wrapper = mount(Income, {
      store,
      router,
      localVue
    });
    const expectedAmount = wrapper.vm.$store.state.selectAccount.incomes.find(
      income => income.name === "NewIncome"
    ).amount;
    const expectedCategory = wrapper.vm.$store.state.selectAccount.incomes.find(
      income => income.name === "NewIncome"
    ).category;
    //If all fields are valid
    wrapper.vm.updateIncome({
      name: "NewIncome",
      category: "Other",
      amount: 3000,
      date: "14/06/2020"
    });
    assert.notEqual(
      wrapper.vm.$store.state.selectAccount.incomes.find(
        income => income.name === "NewIncome"
      ).amount,
      expectedAmount
    );
    //If all fields are valid
    wrapper.vm.updateIncome({
      name: "NewIncome",
      category: "Transaction",
      amount: 3000,
      date: "14/06/2020"
    });
    assert.notEqual(
      wrapper.vm.$store.state.selectAccount.incomes.find(
        income => income.name === "NewIncome"
      ).category,
      expectedCategory
    );
  });
  it("Delete an Income works correctly", () => {
    const wrapper = mount(Income, {
      store,
      router,
      localVue
    });
    const initialLength = wrapper.vm.$store.state.selectAccount.incomes.length;
    const expectedLength = initialLength - 1;
    //If all fields are valid
    wrapper.vm.deleteIncome("NewIncome2");
    assert.equal(
      wrapper.vm.$store.state.selectAccount.incomes.length,
      expectedLength
    );
  });
});

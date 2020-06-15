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

//CATEGORIES UNIT TEST
describe("Income Category List ", () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
  });
  it("Income Lists Work Propperly", () => {
    const wrapper = mount(Categories, {
      store,
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
      localVue
    });
    let DivName = "IncomeInterface";
    assert.exists(wrapper.find(DivName));
  });

  it("Income Button Exists", () => {
    const wrapper = shallowMount(Categories, {
      store,
      localVue
    });
    let buttonName = "SubmitIncomeCategory";
    assert.exists(wrapper.find(buttonName));
  });
});

describe("Expense Category List ", () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
  });
  it("Expense Lists Work Propperly", () => {
    const wrapper = mount(Categories, {
      store,
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
      localVue
    });
    let DivName = "ExpenseInterface";
    assert.exists(wrapper.find(DivName));
  });

  it("Expense Button Exists", () => {
    const wrapper = shallowMount(Categories, {
      store,
      localVue
    });
    let buttonName = "SubmitExpenseCategory";
    assert.exists(wrapper.find(buttonName));
  });
});
//WALLET UNIT TEST
describe("Wallet Unit Test ", () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
  });
  it("Wallet View Exists", () => {
    const wrapper = shallowMount(Wallet, {
      store,
      localVue
    });
    let DivName = "WalletView";
    assert.exists(wrapper.find(DivName));
  });
  it("Delete Account Works", () => {
    const wrapper = shallowMount(Wallet, {
      store,
      localVue
    });
    wrapper.vm.deleteAccount("root");
    let expectedInitialLength = 0;
    assert.equal(
      expectedInitialLength,
      wrapper.vm.$store.state.accounts.length
    );
  });
});
//REGISTER UNIT TEST
describe("Register Unit Test ", () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
  });
  // ->
  it("Add new Account Works", () => {
    const wrapper = shallowMount(Register, {
      store,
      localVue
    });
    wrapper.vm.addAccount({ name: "added" });
    let expectedInitialLength = 1;
    assert.equal(
      expectedInitialLength,
      wrapper.vm.$store.state.accounts.length
    );
  });
});
//EXPENSES UNIT TEST
describe("Expenses Logic Tests", () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
  });
  /*it("Testing Expense Field Validation", () => {
    const wrapper = mount(Expenses, {
      store,
      localVue
    });
    const expectedLength =
      wrapper.vm.$store.state.selectAccount.expenses.length;
    wrapper.vm.addExpense({
      name: "",
      category: "",
      amount: 0,
      date: "15/06/2020"
    });
    assert.equal(
      wrapper.vm.$store.state.selectAccount.expenses.length,
      expectedLength
    );
  });*/
  it("Testing Expense Create", () => {
    const wrapper = mount(Expenses, {
      store,
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

  it("The title should be rendered", () => {
    const expectedTitle = "EXPENSES";
    const wrapper = shallowMount(Expenses, {
      store,
      localVue
    });
    const titleInComponent = wrapper.find("#expensesTitle");
    assert.equal(titleInComponent.text(), expectedTitle);
  });
});
//INCOMES UNIT TEST
describe("Incomes interface", () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
  });
  it("Interface exists", () => {
    const wrapper = mount(Income, {
      store,
      localVue
    });
    let divName = "income";
    assert.exists(wrapper.find(divName));
  });
});
describe("CRUD methods in Income View", () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
  });
  it("Validation in fields works proppertly", () => {
    const wrapper = mount(Income, {
      store,
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
  it("Delete an Income works correctly", () => {
    const wrapper = mount(Income, {
      store,
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

describe("Transfer Unit Testing", () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
  });
  it("Transfer Button does exist", () => {
    const wrapper = shallowMount(Categories, {
      store,
      localVue
    });
    let buttonName = "SubmitTransfer";
    assert.exists(wrapper.find(buttonName));
  });

  it("Adding new Transfer works correctly", () => {
    const wrapper = mount(Expenses, {
      store,
      localVue
    });
    const initialIncomesLength =
      wrapper.vm.$store.state.selectAccount.incomes.length;
    const expectedIncomesLength = initialIncomesLength + 1;
    //If all fields are valid
    wrapper.vm.addIncome({
      name: "NewTransferedIncome",
      category: "Other",
      amount: 1000,
      date: "14/06/2020"
    });
    console.log("Transfered income added");
    assert.equal(
      wrapper.vm.$store.state.selectAccount.incomes.length,
      expectedIncomesLength
    );
    const initialExpensesLength =
      wrapper.vm.$store.state.selectAccount.expenses.length;
    const expectedExpensesLength = initialExpensesLength + 1;
    wrapper.vm.addExpense({
      name: "NewTransferedExpense",
      category: "Other",
      amount: 1000,
      date: "14/06/2020"
    });
    console.log("Expense of transfer added");
    assert.equal(
      wrapper.vm.$store.state.selectAccount.expenses.length,
      expectedExpensesLength
    );
  });
});

import { assert } from "chai";
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Categories from "@/views/Categories.vue";
import Wallet from "@/views/Wallet.vue";
import Expenses from "@/views/Expenses.vue";
import Register from "@/views/Register.vue";
import store from "@/store";
import VueRouter from "vue-router";
import Vuex from "vuex";

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
describe("Expenses Logic Tests", () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
  });
  it("Testing Expense Create", () => {
    const wrapper = mount(Expenses, {
      store,
      localVue
    });
    //wrapper.vm.chooseAccount("root");
    const initiallength = wrapper.vm.$store.state.selectAccount.expenses.length;
    const expectedlength = initiallength + 1;
    wrapper.vm.addExpense("pruebaa");
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
    const initiallength = wrapper.vm.$store.state.selectAccount.expenses.length;
    const expectedlength = initiallength - 1;
    wrapper.vm.deleteExpense("prueba4");
    assert.equal(
      wrapper.vm.$store.state.selectAccount.expenses.length,
      expectedlength
    );
  });
});
describe("Expenses UI Tests", () => {
  let localVue;

  it("The title should be rendered", () => {
    const expectedTitle = "Expenses";
    const wrapper = shallowMount(Expenses, {
      store,
      localVue
    });
    const titleInComponent = wrapper.find("#expensesTitle");
    assert.equal(titleInComponent.text(), expectedTitle);
  });

  it("2 initial buttons should be rendered ", () => {
    const expectedNumberofButtons = 2;
    const wrapper = shallowMount(Expenses, {
      store,
      localVue
    });
    const buttonsInUI = wrapper.findAll(".buttons");
    assert.isTrue(wrapper.exists());
    assert.equal(buttonsInUI.length, expectedNumberofButtons);
  });
});

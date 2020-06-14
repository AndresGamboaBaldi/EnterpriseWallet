// CHAI
import { /* expect, */ assert } from "chai";
// VUE TEST UTILS
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
//import HelloWorld from "@/components/HelloWorld.vue";
import Categories from "@/views/Categories.vue";
import Wallet from "@/views/Wallet.vue";
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
  // <-
});

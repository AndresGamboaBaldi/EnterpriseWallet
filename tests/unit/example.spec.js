import { assert } from "chai";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import Expenses from "@/views/Expenses.vue";
import store from "@/store";
import VueRouter from "vue-router";
import Vuex from "vuex";

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
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
  });
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

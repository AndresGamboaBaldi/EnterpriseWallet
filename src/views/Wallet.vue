<template>
  <div class="container">
    <h1>Welcome to your WALLET --- {{ obj.account }}</h1>
    <br />
    <button @click="viewdeleteAccount()">Delete Account</button>
    <br />
    <br />
    <input v-model="account" placeholder="obj.account" />
    <br />
    <br />
    <button @click="changeNameAccount()">CHANGE NAME</button>
    <div class="cred">
      <div class="cred" style="background-color: white;">
        <div :key="income.name" v-for="income in incomeList">
          <ul>
            <li>
              {{ income.name }}
              {{ income.category }}
              {{ income.amount }}
              {{ income.date }}
            </li>
          </ul>
        </div>
      </div>
      <label>Select Date: </label>
      <select v-model="incDate">
        <option :key="aux.id" v-for="aux in dateList">{{ aux.name }} </option>
      </select>
      <br />
      <div v-if="incDate === 'Day'">
        <label>Choose date: </label>
        <select v-model="incDay" placeholder="Choose date">
          <option :key="income.name" v-for="income in incomeList">
            {{ income.date }}
          </option>
        </select>
      </div>
      <div v-else>
        <label>Not working</label>
      </div>
      <button @click="submitExpenseCat">Show incomes report</button>
    </div>
    <div class="cred">
      <div class="cred" style="background-color: white;">
        <div :key="expense.name" v-for="expense in expenseList">
          <ul>
            <li>
              {{ expense.name }}
              {{ expense.category }}
              {{ expense.amount }}
              {{ expense.date }}
            </li>
          </ul>
        </div>
      </div>
      <label>Select Date: </label>
      <select v-model="expDate">
        <option
          v-for="fechaExpense in dateList"
          :value="fechaExpense.id"
          :key="fechaExpense.id"
          >{{ fechaExpense.name }}
        </option>
      </select>
      <br />
      <div v-if="expDate === 'Day'">
        <label>Choose date: </label>
        <select v-model="expDay" placeholder="Choose date">
          <option :key="aux.id" v-for="aux in dateList">{{ aux.name }} </option>
        </select>
      </div>
      <div v-else>
        <label>Not working</label>
      </div>
      <button @click="submitExpenseCat">Show expenses report</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Wallet",
  data() {
    return {
      account: "",
      dateList: [
        { name: "Day", id: 1 },
        { name: "Month", id: 2 },
        { name: "Year", id: 3 }
      ],
      selectedfechaExpense: null
    };
  },
  computed: {
    ...mapGetters(["getAccount"]),
    ...mapGetters(["getIncomeList"]),
    ...mapGetters(["getCategoryList"]),
    ...mapGetters(["getExpenseList"]),
    incomeList() {
      return this.getIncomeList;
    },
    expenseList() {
      return this.getExpenseList;
    },
    obj() {
      return this.getAccount;
    }
  },
  methods: {
    ...mapActions(["deleteAccount", "updateAccout"]),
    viewdeleteAccount() {
      this.obj.incomes.length === 0 && this.obj.expenses.length === 0
        ? this.deleteAccount(this.account)
        : alert("Delete option disable");
    },
    changeNameAccount() {
      this.account != ""
        ? this.updateAccout(this.account)
        : alert("Put a valid name account");
    }
  }
};
</script>
<style scoped>
@import "categories.css";
</style>

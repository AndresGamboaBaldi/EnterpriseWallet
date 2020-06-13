<template>
  <div id="expenses" class="main-container">
    <div>
      <br />
      <br />
      <label class>Expenses</label>
      <br />
      <br />
      <br />
      <br />
      <label>Expense's Name: </label>
      <input v-model="expenseName" />
      <br />
      <br />
      <label>Category: </label>
      <select v-model="expenseCategory">
        <option :key="category.name" v-for="category in expenseCategories">{{
          category.name
        }}</option>
      </select>
      <br />
      <br />
      <div v-if="expenseCategory === 'Transaction'">
        <label>Account To Transfer: </label>
        <select v-model="transferUser" placeholder="Account to transfer">
          <option :key="index" v-for="(account, index) in accounts">
            {{ account.account }}
          </option>
        </select>
      </div>
      <br />
      <label>Amount: </label>
      <input v-model="expenseAmount" />
      <label> Bs. </label>
      <br />
      <br />
      <label>Date: </label>
      <span class="showndate"> {{ expenseDate }} </span>
      <br />
      <br />
      <div v-if="expenseCategory === 'Transaction'">
        <button @click="addNewTransfer">Add new Transfer</button>
      </div>
      <div v-else>
        <button @click="addNewExpense">Add new Expense</button>
      </div>
      <br />
      <button @click="modifyExpense" class="buttons">
        Update Expense
      </button>
    </div>
    <br />
    <div class="expenseTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Amount (Bs.)</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr :key="expense.name" v-for="expense in expenseList">
            <td>{{ expense.name }}</td>
            <td>{{ expense.category }}</td>
            <td>{{ expense.amount }}</td>
            <td>{{ expense.date }}</td>
            <td>
              <button @click="removeExpense(expense.name)" class="buttons">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Expenses",
  data() {
    return {
      expenseName: "",
      expenseCategory: "",
      expenseAmount: 0
    };
  },
  computed: {
    ...mapGetters(["getCategoryList"]),
    ...mapGetters(["getAccounts"]),
    ...mapGetters(["getExpenseList"]),
    expenseDate() {
      var date = new Date();
      var fullDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      return fullDate;
    },
    expenseCategories() {
      return this.getCategoryList.expense;
    },
    expenseList() {
      return this.getExpenseList;
    },
    accounts() {
      return this.getAccounts;
    }
  },
  methods: {
    ...mapActions(["addExpense"]),
    ...mapActions(["addIncome"]),
    ...mapActions(["updateExpense"]),
    ...mapActions(["deleteExpense"]),
    ...mapActions(["addIncomeTransfered"]),
    addNewTransfer() {
      this.addExpense({
        name: this.expenseName,
        category: this.expenseCategory,
        amount: this.expenseAmount,
        date: this.expenseDate,
        is: "expense"
      });
      this.addIncomeTransfered({
        userAccount: this.transferUser,
        name: this.expenseName,
        category: this.expenseCategory,
        amount: this.expenseAmount,
        date: this.expenseDate,
        is: "expense"
      });
      this.clearBoxes();
    },
    addNewExpense() {
      this.addExpense({
        name: this.expenseName,
        category: this.expenseCategory,
        amount: this.expenseAmount,
        date: this.expenseDate,
        is: "expense"
      });
      this.clearBoxes();
    },
    modifyExpense() {
      this.updateExpense({
        name: this.expenseName,
        category: this.expenseCategory,
        amount: this.expenseAmount,
        date: this.expenseDate,
        is: "expense"
      });
      this.clearBoxes();
    },
    removeExpense(nameToDelete) {
      this.deleteExpense(nameToDelete);
      this.clearBoxes();
    },
    clearBoxes() {
      this.expenseName = "";
      this.expenseCategory = "";
      this.expenseAmount = 0;
    },
    validateFields() {
      if (
        this.isEmptyString(this.expenseName) ||
        this.isEmptyString(this.expenseCategory) ||
        Number.isFinite(this.expenseAmount)
      ) {
        return false;
      } else {
        return true;
      }
    },
    isEmptyString(string) {
      if (string === "") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style scoped>
table {
  border: 2px solid #194e70;
  border-radius: 3px;
  background-color: rgb(224, 212, 212);
  margin-left: 300px;
}
th {
  background-color: #194e70;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
td {
  background-color: #f9f9f9;
  color: #000;
}
th,
td {
  min-width: 120px;
  padding: 10px 20px;
}
th.active {
  color: #000;
}
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.main-container {
  background: black;
  width: 100%;
  height: 1500px;
  font-size: medium;
}
</style>

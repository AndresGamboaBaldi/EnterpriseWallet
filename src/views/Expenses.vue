<template>
  <div id="income" class="main-container">
    <div>
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
      <label>Amount: </label>
      <input v-model="expenseAmount" />
      <label> Bs. </label>
      <br />
      <br />
      <label>Date: </label>
      <span> {{ expenseDate }} </span>
      <br />
      <br />
      <button @click="addNewExpense">Add new Expense</button>
      <br />
      <br />
      <button @click="modifyExpense">Update Expense</button>
    </div>
    <br />
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
              <button @click="removeExpense(expense.name)">Delete</button>
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
    }
  },
  methods: {
    ...mapActions(["addExpense"]),
    ...mapActions(["updateExpense"]),
    ...mapActions(["deleteExpense"]),
    addNewExpense() {
      this.addExpense({
        name: this.expenseName,
        category: this.expenseCategory,
        amount: this.expenseAmount,
        date: this.expenseDate
      });
      this.clearBoxes();
    },
    modifyExpense() {
      this.updateExpense({
        name: this.expenseName,
        category: this.expenseCategory,
        amount: this.expenseAmount,
        date: this.expenseDate
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
th.active .arrow {
  opacity: 1;
}
.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}
</style>

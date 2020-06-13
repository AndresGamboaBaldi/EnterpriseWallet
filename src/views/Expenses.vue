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
      <label>Amount: </label>
      <input v-model="expenseAmount" />
      <label> Bs. </label>
      <br />
      <br />
      <label>Date: </label>
      <span class="showndate"> {{ expenseDate }} </span>
      <br />
      <br />
      <button @click="addNewExpense" class="buttons">
        Add New Expense
      </button>
      <br />
      <br />
      <button @click="modifyExpense" class="buttons">
        Update Expense
      </button>
    </div>
    <br />
    <br />
    <div v-if="expenseList.length > 0" class="expenseTable">
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
      if (this.validateFields()) {
        this.addExpense({
          name: this.expenseName,
          category: this.expenseCategory,
          amount: this.expenseAmount,
          date: this.expenseDate
        });
        this.clearBoxes();
      } else {
        alert("Error Ocurred, Verify input fields");
      }
    },
    modifyExpense() {
      if (this.validateFields()) {
        this.updateExpense({
          name: this.expenseName,
          category: this.expenseCategory,
          amount: this.expenseAmount,
          date: this.expenseDate
        });
        this.clearBoxes();
      } else {
        alert("Error Ocurred, Verify input fields");
      }
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
<style>
.showndate {
  color: white;
  font-size: 30px;
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

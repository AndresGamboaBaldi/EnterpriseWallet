<template>
  <div id="expenses" class="main-container">
    <div id="nav2">
      <router-link to="/Categories">Categories </router-link> |
      <router-link to="/Income">Incomes </router-link> |
      <router-link to="/expenses">Expenses </router-link>
    </div>
    <div>
      <label class="animated" id="expensesTitle">EXPENSES</label>
      <br />
      <span id="balance" class="card"
        ><b>Account Balance: </b>{{ account.balance }} Bs.</span
      >
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
      <div v-if="expenseCategory === 'Transaction'">
        <label>Account To Transfer: </label>
        <select v-model="transferUser" placeholder="Account to transfer">
          <option :key="index" v-for="(cuenta, index) in filteredAccountList">
            {{ cuenta.account }}
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
        <button @click="addNewTransfer" class="buttons">
          Add new Transfer
        </button>
      </div>
      <div v-else>
        <button @click="addNewExpense" class="buttons">Add new Expense</button>
      </div>
      <br />
      <button id="SubmitTransfer" @click="modifyExpense" class="buttons">
        Update Expense
      </button>
    </div>
    <br />
    <div v-if="expenseList.length > 0" class="expenseTable" id="expensesTable">
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
    ...mapGetters(["getAccount"]),
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
    },
    account() {
      return this.getAccount;
    },
    filteredAccountList(){
      return this.getAccounts.filter(
        item => item.account !== this.account.account
      );
    }
  },
  methods: {
    ...mapActions(["addExpense"]),
    ...mapActions(["addIncome"]),
    ...mapActions(["updateExpense"]),
    ...mapActions(["deleteExpense"]),
    ...mapActions(["addIncomeTransfered"]),
    addNewTransfer() {
      if (this.nameNotExists()) {
        if (this.account.balance >= this.expenseAmount) {
          this.addExpense({
            name: this.expenseName,
            category: this.expenseCategory,
            amount: Number(this.expenseAmount),
            date: this.expenseDate,
            is: "expense"
          });
          this.addIncomeTransfered({
            userAccount: this.transferUser,
            name: this.expenseName,
            category: this.expenseCategory,
            amount: Number(this.expenseAmount),
            date: this.expenseDate,
            is: "income"
          });
          this.clearBoxes();
        } else {
          alert(
            "Balance:" +
              this.account.balance +
              " Bs.\nYou don't have enough  money."
          );
        }
      } else {
        alert("Error Ocurred, Expense name already exists");
      }
    },
    addNewExpense() {
      if (this.nameNotExists()) {
        if (this.validateFields()) {
          if (this.account.balance >= this.expenseAmount) {
            this.addExpense({
              name: this.expenseName,
              category: this.expenseCategory,
              amount: Number(this.expenseAmount),
              date: this.expenseDate,
              is: "expense"
            });
            this.clearBoxes();
          } else {
            alert(
              "Balance:" +
                this.account.balance +
                " Bs.\nYou don't have enough  money."
            );
          }
        } else {
          alert("Error Ocurred, Verify input fields");
        }
      } else {
        alert("Error Ocurred, Name Already Exists");
      }
    },
    modifyExpense() {
      if (this.validateFields()) {
        this.updateExpense({
          name: this.expenseName,
          category: this.expenseCategory,
          amount: Number(this.expenseAmount),
          date: this.expenseDate,
          is: "expense"
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
      var name = this.expenseName;
      var category = this.expenseCategory;
      var amount = this.expenseAmount;
      if (name === "" || name === null || category === "" || amount <= 0) {
        return false;
      } else {
        return true;
      }
    },
    nameNotExists() {
      let exists = false;
      this.expenseList.forEach(expense => {
        if (expense.name === this.expenseName) {
          this.expenseName = "";
          exists = true;
        }
      });
      if (exists) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
<style>
#balance {
  font-size: 25px;
}
.showndate {
  color: white;
  font-size: 30px;
}
.main-container {
  width: 100%;
  height: 1500px;
  font-size: medium;
  font-style: bold;
}
</style>

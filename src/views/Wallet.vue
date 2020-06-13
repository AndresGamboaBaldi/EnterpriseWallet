<template>
  <div class="container">
    <h1>Welcome to your WALLET --- {{ obj.account }}</h1>
    <br />
    <br />
    <input v-model="account" placeholder="" />
    <br />
    <br />
    <button @click="changeNameAccount()">CHANGE NAME</button>
    <button @click="viewdeleteAccount()">Delete Account</button>
    <br />
    <br />
    <label>Choose a Category:</label>
    <input v-model="categorylooked" placeholder="Category" />
    <label>Choose a Date:</label>
    <select v-model="datelooked">
      <option :key="item.name" v-for="item in expenseIncomeList">{{
        item.date
      }}</option>
      <option value="all">All</option>
    </select>
    <br />
    <br />
    <table id="table" border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.code" v-for="item in filteredList">
          <td :class="[item.is === 'income' ? 'green' : 'red']">
            {{ item.name }}
          </td>
          <td :class="[item.is === 'income' ? 'green' : 'red']">
            {{ item.category }}
          </td>
          <td :class="[item.is === 'income' ? 'green' : 'red']">
            {{ item.amount }}
          </td>
          <td :class="[item.is === 'income' ? 'green' : 'red']">
            {{ item.date }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Wallet",
  data() {
    return {
      account: "",
      datelooked: "",
      categorylooked: ""
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
    },
    expenseIncomeList() {
      var incomesExpesesList = this.expenseList.concat(this.incomeList);
      function compare(a, b) {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      }
      incomesExpesesList = incomesExpesesList.sort(compare);
      return incomesExpesesList;
    },
    filteredList() {
      console.log(this.categorylooked + "---" + this.datelooked);
      const listByCategory =
        this.categorylooked === ""
          ? this.expenseIncomeList
          : this.expenseIncomeList.filter(
              item => item.category === this.categorylooked
            );
      return this.datelooked === "" || this.datelooked === "all"
        ? listByCategory
        : listByCategory.filter(item => item.date === this.datelooked);
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
.red {
  background: rgb(248, 117, 100);
}
.green {
  background: rgb(51, 228, 89);
}
table {
  border: 2px solid #194e70;
  border-radius: 3px;
  background-color: rgb(224, 212, 212);
  margin-left: 300px;
}

th {
  background-color: #195770;
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

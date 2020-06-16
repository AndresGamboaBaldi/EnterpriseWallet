<template>
  <div id="WalletView" class="container">
    <div id="nav2">
      <router-link to="/Categories">Categories </router-link> |
      <router-link to="/Income">Incomes </router-link> |
      <router-link to="/expenses">Expenses </router-link>
    </div>
    <h1 class="animated">ACCOUNT: {{ obj.account }}</h1>
    <br />
    <span class="card"><b>Balance: </b>{{ obj.balance }} Bs.</span>
    <br />
    <br />
    <br />
    <br />
    <label>New account's name: </label>
    <input v-model="account" placeholder="" />
    <br />
    <br />
    <button @click="changeNameAccount()">CHANGE NAME</button>
    <button @click="viewdeleteAccount()">Delete Account</button>
    <br />
    <br />
    <label>Choose a Category: </label>
    <input v-model="categorylooked" placeholder="Category" />
    <label>Report:</label>
    <input v-model="reportlooked" placeholder="incomes/expenses/all" />
    <div v-if="reportlooked === 'incomes'">
      <label>Choose a Date:</label>
      <select v-model="datelooked">
        <option :key="item.name" v-for="item in incomeList">{{
          item.date
        }}</option>
        <option value="all">All</option>
      </select>
    </div>
    <div v-else-if="reportlooked === 'expenses'">
      <label>Choose a Date:</label>
      <select v-model="datelooked">
        <option :key="item.name" v-for="item in expenseList">{{
          item.date
        }}</option>
        <option value="all">All</option>
      </select>
    </div>
    <div v-else-if="reportlooked === 'all'">
      <label>Choose a Date:</label>
      <select v-model="datelooked">
        <option :key="item.name" v-for="item in expenseIncomeList">{{
          item.date
        }}</option>
        <option value="all">All</option>
      </select>
    </div>
    <br />
    <br />
    <br />
    <div class="cardView" :key="item.code" v-for="item in filteredList">
      <div :class="[item.is === 'income' ? 'green' : 'red']">
        <span
          ><b>Name: </b>{{ item.name }} <b> Category: </b>{{ item.category }}
          <b> Amount: </b>{{ item.amount }} Bs. <b> Date: </b
          >{{ item.date }}</span
        >
      </div>
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
      datelooked: "",
      categorylooked: "",
      reportlooked: ""
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
      var listByCategory;
      if (this.reportlooked === "incomes") {
        listByCategory =
          this.categorylooked === ""
            ? this.incomeList
            : this.incomeList.filter(
                item => item.category === this.categorylooked
              );
      } else if (this.reportlooked === "expenses") {
        listByCategory =
          this.categorylooked === ""
            ? this.expenseList
            : this.expenseList.filter(
                item => item.category === this.categorylooked
              );
      } else {
        listByCategory =
          this.categorylooked === ""
            ? this.expenseIncomeList
            : this.expenseIncomeList.filter(
                item => item.category === this.categorylooked
              );
      }
      return this.datelooked === "" || this.datelooked === "all"
        ? listByCategory
        : listByCategory.filter(item => item.date === this.datelooked);
    }
  },
  methods: {
    ...mapActions(["deleteAccount", "updateAccout"]),
    viewdeleteAccount() {
      this.obj.incomes.length === 0 &&
      this.obj.expenses.length === 0 &&
      this.obj.account !== ""
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
.cardView {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 8px 10px 0 rgba(253, 250, 250, 0.493);
  transition: 0.3s;
  background-color: #ffff;
  color: rgba(0, 0, 0, 0.726);
  margin-left: 20%;
  margin-right: 20%;
  width: auto;
  border-radius: 20px;
  font-size: 22px;
  text-align: center;
  line-height: 20px;
  margin-top: 2%;
  font-family: "Arial";
}
.red {
  background: rgb(248, 117, 100);
  padding: 10px;
  border-radius: 20px;
  width: auto;
  height: auto;
}
.green {
  background: rgb(49, 214, 85);
  padding: 10px;
  border-radius: 20px;
  width: auto;
  height: auto;
}
.balance {
  color: #fff;
  font-size: 30px;
  font-style: bold;
}
/* On mouse-over, add a deeper shadow */
.cardView:hover {
  box-shadow: 0 8px 16px 0 rgba(193, 207, 170, 0.2);
}
</style>

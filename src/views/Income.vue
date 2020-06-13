<template>
  <div id="income" class="main-container">
    <div>
      <br />
      <br />
      <br />
      <br />
      <label>Income's Name: </label>
      <input v-model="incomeName" />
      <br />
      <br />
      <label>Category: </label>
      <select v-model="incomeCategory">
        <option :key="category.name" v-for="category in incomeCategories">{{
          category.name
        }}</option>
      </select>
      <br />
      <br />
      <label>Amount: </label>
      <input v-model="incomeAmount" />
      <label> Bs. </label>
      <br />
      <br />
      <label>Date: </label>
      <span> {{ incomeDate }} </span>
      <br />
      <br />
      <button @click="registerIncome">REGISTER</button>
      <br />
      <br />
      <button @click="modifyIncome">Update Income</button>
    </div>
    <br />
    <br />
    <div class="incomeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Amount (Bs.)</th>
            <th>Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr :key="income.name" v-for="income in incomeList">
            <td>{{ income.name }}</td>
            <td>{{ income.category }}</td>
            <td>{{ income.amount }}</td>
            <td>{{ income.date }}</td>
            <td><button @click="setData(income.name)">Modify</button></td>
            <td><button @click="removeIncome(income.name)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Income",
  data() {
    return {
      incomeName: "",
      incomeCategory: "",
      incomeAmount: 0
    };
  },
  computed: {
    ...mapGetters(["getCategoryList"]),
    ...mapGetters(["getIncomeList"]),
    incomeDate() {
      var f = new Date();
      var date = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
      return date;
    },
    incomeCategories() {
      return this.getCategoryList.income;
    },
    incomeList() {
      return this.getIncomeList;
    }
  },

  methods: {
    ...mapActions(["addIncome"]),
    ...mapActions(["updateIncome"]),
    ...mapActions(["deleteIncome"]),
    registerIncome() {
      this.addIncome({
        name: this.incomeName,
        category: this.incomeCategory,
        amount: this.incomeAmount,
        date: this.incomeDate,
        is: "income"
      });
      //Clear input boxes
      this.clearBoxes();
    },
    setData(name) {
      this.incomeList.forEach(income => {
        if (income.name === name) {
          this.incomeName = income.name;
          this.incomeCategory = income.category;
          this.incomeAmount = income.amount;
        }
      });
    },
    modifyIncome() {
      this.updateIncome({
        name: this.incomeName,
        category: this.incomeCategory,
        amount: this.incomeAmount,
        date: this.incomeDate,
        is: "income"
      });
      console.log("UPDATED!");
      //Clear input boxes
      this.clearBoxes();
    },
    removeIncome(nameToDelete) {
      this.deleteIncome(nameToDelete);
      console.log("DELETED!");
      //Clear input boxes
      this.clearBoxes();
    },
    clearBoxes() {
      this.incomeName = "";
      this.incomeCategory = "";
      this.incomeAmount = 0;
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

<template>
  <div id="income" class="main-container">
    <div id="nav2">
      <router-link to="/Categories">Categories </router-link> |
      <router-link to="/Income">Incomes </router-link> |
      <router-link to="/expenses">Expenses </router-link>
    </div>
    <label class="animated">INCOMES</label>
    <div>
      <label>Income's Name: </label>
      <input v-if="!this.showNameLabel" v-model="incomeName" />
      <label class="nameLabel" v-if="this.showNameLabel"
        >{{ nameLabel }}
      </label>
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
      <span class="dateLabel"> {{ incomeDate }} </span>
      <br />
      <br />
      <button v-if="this.showRegisterButton" @click="registerIncome">
        REGISTER
      </button>
      <br />
      <br />
      <button v-if="this.showUpdateButton" @click="modifyIncome">UPDATE</button>
    </div>
    <br />
    <br />
    <div v-if="incomeList.length > 0" class="incomeTable">
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>CATEGORY</th>
            <th>AMOUNT (Bs.)</th>
            <th>DATE</th>
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
      incomeAmount: 0,
      showUpdateButton: false,
      showRegisterButton: true,
      showNameLabel: false,
      nameLabel: ""
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
      if (this.validateData()) {
        alert("All fields must be filled.");
      } else {
        var existingName = false;
        this.incomeList.forEach(income => {
          if (income.name === this.incomeName) {
            existingName = true;
            alert(
              "This income's name already exists!. Please introduce another one."
            );
            this.incomeName = "";
          }
        });
        if (!existingName) {
          this.addIncome({
            name: this.incomeName,
            category: this.incomeCategory,
            amount: Number(this.incomeAmount),
            date: this.incomeDate,
            is: "income"
          });
          //Clear input boxes
          this.clearBoxes();
        }
      }
    },
    setData(name) {
      this.incomeList.forEach(income => {
        if (income.name === name) {
          this.showNameLabel = true;
          this.nameLabel = income.name;
          this.incomeCategory = income.category;
          this.incomeAmount = income.amount;
        }
      });
      this.showUpdateButton = true;
      this.showRegisterButton = false;
    },
    modifyIncome() {
      if (this.validateData()) {
        alert("All fields must be filled.");
      } else {
        this.updateIncome({
          name: this.nameLabel,
          category: this.incomeCategory,
          amount: Number(this.incomeAmount),
          date: this.incomeDate,
          is: "income"
        });
        //Clear input boxes
        this.clearBoxes();
        this.showUpdateButton = false;
        this.showRegisterButton = true;
        this.showNameLabel = false;
      }
    },
    removeIncome(nameToDelete) {
      this.deleteIncome(nameToDelete);
      //Clear input boxes
      this.clearBoxes();
    },
    clearBoxes() {
      this.incomeName = "";
      this.incomeCategory = "";
      this.incomeAmount = 0;
    },
    validateData() {
      var name = this.incomeName;
      var category = this.incomeCategory;
      var amount = this.incomeAmount;
      if (this.showNameLabel) {
        if (category === "" || amount <= 0) {
          return true;
        }
      } else {
        if (name === "" || name === null || category === "" || amount <= 0) {
          return true;
        }
      }
    }
  }
};
</script>
<style scoped>
.main-container {
  font-family: "Oswald", sans-serif;
  font-style: bold;
  width: 100%;
  height: 1500px;
}
.nameLabel,
.dateLabel {
  color: #f9f9f9;
  font-size: 25px;
}
.incomeTable{
  font: "Oswald", sans-serif;
  border: 2px solid #bea42f;
  border-radius: 3px;
  background-color: rgb(224, 212, 212);
  margin-left: auto;
  margin-right: auto;
}
.animated {
  font: 700 4em/1 "Oswald", sans-serif;
  letter-spacing: 0;
  padding: 0.25em 0 0.325em;
  display: inline-flex;
  margin: 0 auto;
  padding-top: 60px;
  text-shadow: 0 0 80px rgba(255, 255, 255, 0.5);

  /*Clip Background Image */
  background: url(http://f.cl.ly/items/010q3E1u3p2Q0j1L1S1o/animated_text_fill.png)
    repeat-y;
  -webkit-background-clip: text;
  background-clip: text;

  /* Animate Background Image */
  -webkit-text-fill-color: transparent;
  animation: aitf 80s linear infinite;
  /* Activate hardware acceleration for smoother animations */
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
/* Animate Background Image */
@keyframes aitf {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>

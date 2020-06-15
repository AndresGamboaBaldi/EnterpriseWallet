<template>
  <div>
    <div id="nav2">
      <router-link to="/Categories">Categories </router-link> |
      <router-link to="/Income">Incomes </router-link> |
      <router-link to="/expenses">Expenses </router-link>
    </div>
    <label class="animated">CATEGORIES</label>
    <br />
    <br />
    <div id="IncomeInterface" class="cred">
      <div class="cred" style="background-color: white;">
        <div :key="category.name" v-for="category in categories.income">
          <ul>
            <li>
              {{ category.name }}
            </li>
          </ul>
        </div>
      </div>
      <input v-model="NewIncome" placeholder="insert new income category" />
      <button id="SubmitIncomeCategory" @click="submitIncomeCat">
        ADD NEW INCOME CATEGORY
      </button>
    </div>
    <div id="ExpenseInterface" class="cred">
      <div class="cred" style="background-color: white;">
        <div :key="category.name" v-for="category in categories.expense">
          <ul>
            <li>
              {{ category.name }}
            </li>
          </ul>
        </div>
      </div>
      <input v-model="NewExpense" placeholder="insert new expense category" />
      <button id="SubmitExpenseCategory" @click="submitExpenseCat">
        ADD NEW EXPENSE CATEGORY
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Categories",
  data() {
    return {
      NewIncome: "",
      NewExpense: ""
    };
  },

  computed: {
    ...mapGetters(["getCategoryList"]),
    // getList,
    categories() {
      return this.getCategoryList;
    }
  },

  methods: {
    ...mapActions(["addIncomeCategory"]),
    ...mapActions(["addExpenseCategory"]),
    submitIncomeCat() {
      this.addIncomeCategory({ name: this.NewIncome });
      this.NewIncome = "";
    },
    submitExpenseCat() {
      this.addExpenseCategory({ name: this.NewExpense });
      this.NewExpense = "";
    }
  }
};
</script>
<style scoped>
@import "categories.css";
</style>

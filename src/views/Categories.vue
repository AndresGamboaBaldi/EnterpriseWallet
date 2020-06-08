<template>
  <div>
    <br />
    <br />
    <br />
    <div class="cred">
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
      <button @click="submitIncomeCat">ADD NEW INCOME CATEGORY</button>
    </div>
    <div class="cred">
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
      <button @click="submitExpenseCat">ADD NEW EXPENSE CATEGORY</button>
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

<template>
  <div class="about">
    <h1 class="animated">Create new Account</h1>
    <br />
    <label>New account: </label>
    <input v-model="newAccount" placeholder="New User" />
    <br />
    <br />
    <label>Type of Account :</label>
    <br />
    <input type="radio" v-model="newType" value="debit" />DEBIT
    <br />
    <input type="radio" v-model="newType" value="credit" />CREDIT
    <br />
    <br />
    <button @click="validateContext()">CREATE</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Register",
  components: {},
  data() {
    return {
      newAccount: "",
      newType: ""
    };
  },
  methods: {
    ...mapActions(["addAccount"]),
    validateContext() {
      this.newAccount === "" || this.newType === ""
        ? alert("Must put a User Name or Type")
        : this.submitAccount();
    },
    submitAccount() {
      this.addAccount({
        account: this.newAccount,
        type: this.newType,
        balance: 0,
        incomes: [],
        expenses: []
      });
    }
  }
};
</script>

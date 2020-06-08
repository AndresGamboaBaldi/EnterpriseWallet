<template>
  <div class="container">
    <h1>Welcome to your WALLET --- {{ obj.account }}</h1>
    <br />
    <button @click="deleteAccount()">Delete Account</button>
    <br />
    <br />
    <input v-model="account" placeholder="obj.account" />
    <br />
    <br />
    <button @click="changeNameAccount()">CHANGE NAME</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Wallet",
  data() {
    return {
      account: ""
    };
  },
  computed: {
    ...mapGetters(["getAccount"]),
    obj() {
      return this.getAccount;
    }
  },
  methods: {
    ...mapActions(["deleteAccount", "updateAccout"]),
    deleteAccount() {
      console.log(this.obj.incomes.length);
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

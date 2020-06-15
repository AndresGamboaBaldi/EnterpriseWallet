<template>
  <div class="home">
    <br />
    <HelloWorld class="animated" msg="Welcome to your Enterprise Wallet " />
    <br />
    <label>Account's name: </label>
    <input v-model="account" placeholder="Choose Account" />
    <br />
    <br />
    <button @click="validateContext()">CHOOSE</button>
    <br />
    <br />
    <div class="accountList" :key="index" v-for="(account, index) in accounts">
      <ul>
        <li>
          {{ account.account }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      account: ""
    };
  },
  computed: {
    ...mapGetters(["getAccounts"]),
    accounts() {
      return this.getAccounts;
    }
  },
  methods: {
    ...mapActions(["chooseAccount"]),
    validateContext() {
      this.accounts.find(element => element.account === this.account)
        ? this.selectedAccount()
        : alert("The user name doesn't exist");
    },
    selectedAccount() {
      const findAccount = this.accounts.find(
        element => element.account === this.account
      );
      this.chooseAccount(findAccount);
    }
  }
};
</script>

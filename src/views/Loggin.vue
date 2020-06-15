<template>
  <div class="home">
    <br />
    <HelloWorld
      class="animated"
      style="font-size: 40px"
      msg="Welcome to iWallet "
    />
    <br />
    <label>Account's name: </label>
    <input v-model="account" placeholder="Choose Account" />
    <br />
    <br />
    <button @click="validateContext()">CHOOSE</button>
    <br />
    <br />
    <div class="card" :key="index" v-for="(account, index) in accounts">
      <div class="imageContainer">
        <img class="logo" src="../assets/money.png" />
      </div>
      <div class="textContainer">
        <span>
          <p style="font-size:30px">
            <b>{{ account.account }}</b>
          </p>
          <p><b>Type: </b>{{ account.type }}</p>
          <p>
            <b>{{ account.balance }} Bs.</b>
          </p>
        </span>
      </div>
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

<template>
  <div class="home">
    <HelloWorld msg="Welcome to My Enterprise Wallet " />
    <br />
    <input v-model="account" placeholder="User name" />
    <br />
    <br />
    <button @click="validateContext()">LOGGIN</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import * as data from "./Users.json";
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      account: "",
      list: data.obj
    };
  },
  methods: {
    validateContext() {
      this.list.find(element => element.account === this.account)
        ? this.submitUser()
        : alert("The user name doesn't exist");
    },
    ...mapActions(["setUser"]),
    submitUser() {
      const allFromUser = this.list.find(item => item.account === this.account);
      console.log(allFromUser);
      this.setUser(allFromUser);
    }
  }
};
</script>

<template>
  <div class="about">
    <h1>Create new Account</h1>
    <br />
    <input v-model="account" placeholder="New User" />
    <br />
    <br />
    <label>Type of Account :</label>
    <br />
    <input type="radio" v-model="type" value="debit" />DEBIT
    <br />
    <input type="radio" v-model="type" value="credit" />CREDIT
    <br />
    <br />
    <button @click="validateContext()">CREATE</button>
  </div>
</template>

<script>
import Router from "vue-router";
import Vue from "vue";
Vue.use(Router);

export default {
  name: "Register",
  components: {},
  data() {
    return {
      acount: "",
      type: ""
    };
  },
  methods: {
    validateContext() {
      this.acount === "" || this.type === ""
        ? alert("Must put a User Name or Type")
        : this.name;
    }
  }
};
</script>

<template>
  <div class="container">
    <h1>Welcome to your WALLET --- {{ obj.account }}</h1>
    <li>{{ obj.type }}</li>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Wallet",
  computed: {
    ...mapGetters(["getUser"]),
    obj() {
      return this.getUser;
    }
  }
};
</script>

<template>
  <div id="app">
    <div id="nav">
    
      <router-link to="/">Loggin </router-link> |
      <router-link to="/register">Register </router-link> |
      <router-link to="/wallet">Wallet </router-link> |
      <router-link to="/Categories">Categories </router-link>
      <router-link to="/Income">Incomes </router-link>
      <router-link to="/expenses">Expenses </router-link>

    </div>
    <br />
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  position: absolute;
  top: 0;
  right: 0;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #b942b9;
}
</style>

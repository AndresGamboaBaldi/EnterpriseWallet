<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Loggin </router-link> |
      <router-link to="/register">Register </router-link> |
      <router-link to="/wallet">Wallet </router-link> |
      <router-link to="/Categories">Categories </router-link> |
      <router-link to="/Income">Incomes </router-link> |
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
  background: rgb(15, 15, 15);
  text-align: center;
  color: rgb(194, 146, 34);
}

#nav {
  position: absolute;
  top: 0;
  right: 0;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: rgb(194, 146, 34);
}
label {
  color: rgb(194, 146, 34);
  font-size: 30px;
  font-family: Verdana;
  font-weight: 10px;
}
button {
  background-color: rgb(194, 146, 34);
  cursor: pointer;
  color: #f9f9f9;
  width: 200px;
  font-weight: 400px;
  font-size: medium;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 15px;
  border: 6px double rgba(15, 10, 93, 0.322);
}
table {
  border: 2px solid rgba(0, 0, 0);
  background-color: rgba(0, 0, 0);
}
th {
  background-color: rgb(194, 146, 34);
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: medium;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
tbody td:nth-child(even) {
  background-color: rgb(245, 213, 139);
}
td {
  background-color: white;
  color: rgba(0, 0, 0);
}
th,
td {
  min-width: 525px;
  padding: 10px 20px;
}
th.active {
  color: #000;
}
th.active .arrow {
  opacity: 1;
}
.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}
</style>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Loggin </router-link> |
      <router-link to="/register">Register </router-link> |
      <router-link to="/wallet">Wallet </router-link>
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
  background: rgb(15, 15, 15);
  color: rgb(194, 146, 34);
  width: 100%;
  height: 1500px;
}

#nav {
  position: left;
  top: 0;
  right: 0;
  padding: 20px;
  height: 5px;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: rgb(194, 146, 34);
}

#nav a:hover {
  font-weight: bold;
  color: rgb(222, 222, 222);
}

#nav2 {
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
  height: 5px;
}

#nav2 a {
  font-weight: bold;
  color: white;
}

#nav2 a:hover {
  font-weight: bold;
  color: rgb(222, 222, 222);
}

#nav2 a.router-link-exact-active {
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

button:hover {
  background-color: rgb(184, 137, 27);
}
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(253, 250, 250, 0.548);
  transition: 0.3s;
  background-color: #ffff;
  color: rgba(0, 0, 0, 0.794);
  padding: 10px;
  margin-top: 20px;
  margin-left: 30%;
  margin-right: 30%;
  width: auto;
  height: auto;
  border-radius: 20px;
  font-size: 40px;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.imageContainer {
  display: inline-block;
}
.logo {
  display: inline-block;
  width: 50%;
  height: auto;
  padding-right: 20%;
}
.textContainer {
  display: inline-block;
  font-size: 20px;
  width: auto;
  text-align: right;
  line-height: 7px;
  padding-right: 3px;
}
input,
select {
  font-size: 20px;
  text-align: center;
}
table {
  font: "Oswald", sans-serif;
  border: 2px solid #bea42f;
  border-radius: 3px;
  background-color: rgb(224, 212, 212);
  margin-left: auto;
  margin-right: auto;
}
th {
  background-color: #a07d2b;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
td {
  background-color: #f9f9f9;
  color: #000;
}
th,
td {
  min-width: 120px;
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

.animated {
  font: 600 4em/1 "Oswald", sans-serif;
  text-align: center;
  font-style: bold;
  letter-spacing: 0;
  padding: 0.65em 0 0.325em;
  display: inline-flex;
  margin: 10 auto;
  padding-top: 60px;
  text-shadow: 0 0 80px rgba(255, 255, 255, 0.5);

  /*Clip Background Image */
  background: url(http://f.cl.ly/items/010q3E1u3p2Q0j1L1S1o/animated_text_fill.png)
    repeat-y;
  /*background-image: url("/assets/animated_title.png"), repeat-y;*/
  -webkit-background-clip: text;
  background-clip: text;

  /* Animate Background Image */
  -webkit-text-fill-color: transparent;
  animation: aitf 80s linear infinite;
  /* Activate hardware acceleration for smoother animations */
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
/* Animate Background Image */
@keyframes aitf {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>

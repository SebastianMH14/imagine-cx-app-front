<template>
  <div id="app">
    <AppNavbar />
    <router-view></router-view>
  </div>
</template>

<script>
import AppNavbar from "./components/Navbar.vue";

export default {
  components: {
    AppNavbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>

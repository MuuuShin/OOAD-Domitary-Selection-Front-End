<template>
  <div id="app">
    <Navbar/>
    <HelloWorld/>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue';
  import Navbar from './components/Navbar.vue';  
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1f3e5e;
  margin-top: 60px;
}
</style>

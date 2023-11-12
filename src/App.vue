<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand >
        <img alt="SUSTech logo" src="./assets/logo.png">
        宿舍选择系统
      </b-navbar-brand>
      <b-button-group v-show="$route.meta.show">
        <b-button>主页</b-button>
        <b-button>队伍</b-button>
        <b-button>消息</b-button>
        <b-button variant="warning">个人主页</b-button>
      </b-button-group>
    </b-navbar>
    <router-view/>
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

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

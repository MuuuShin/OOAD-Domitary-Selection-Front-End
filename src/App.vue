<template>
  <div id="app">
    <!--    <b-navbar toggleable="lg" type="dark" variant="success" style="padding-left: 20px; padding-right: 20px;">-->
    <!--&lt;!&ndash;      <b-navbar-brand >&ndash;&gt;-->
    <!--&lt;!&ndash;        <img alt="SUSTech logo" src="./assets/logo.png">&ndash;&gt;-->
    <!--&lt;!&ndash;        宿舍选择系统&ndash;&gt;-->
    <!--&lt;!&ndash;      </b-navbar-brand>&ndash;&gt;-->
    <!--      <b-button-group class="nv-bg" v-show="$route.meta.show">-->
    <!--        <b-button @click="jumpHome" >主页</b-button>-->
    <!--        <b-button @click="jumpTeam">队伍</b-button>-->
    <!--        <b-button @click="jumpMessage">消息</b-button>-->
    <!--        <b-button variant="warning" @click="jumpPersonal">个人主页</b-button>-->
    <!--      </b-button-group>-->
    <!--    </b-navbar>-->
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    getId() {
      const id = 114514
      return id
    },
    getTeamId() {
      const TeamId = 1919810
      return TeamId
    },
    jumpHome() {
      this.$router.push('/home')
    },
    jumpTeam() {
      const id = this.getTeamId()
      this.$router.push({path: "/team", query: {id}})
    },
    jumpMessage() {
      const id = this.getId()
      this.$router.push({path: "/whisper", query: {id}})
    },
    jumpPersonal() {
      const id = this.getId()
      this.$router.push({path: "/user", query: {id}})
    },

  },
  mounted() {
    //如果没有设置Auth,而localStorage中有Auth,则将其设置为localStorage中的值
    if (!this.$store.state.Auth && localStorage.getItem('userAuthToken')) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('userAuthToken')
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nv-bg {
  margin-left: auto;
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

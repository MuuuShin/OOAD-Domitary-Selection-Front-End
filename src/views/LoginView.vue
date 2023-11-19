<template>
  <div class="container">
    <div id="login">
      <b-container fluid="sm">
        <b-card
          border-variant="primary"
          header="log in"
          header-bg-variant="primary"
          header-text-variant="white"
          align="center"
        >
          <LoginForm :form="form"></LoginForm>
        </b-card>
      </b-container>     
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";

export default {
  name: "LoginView",
  components: {
    LoginForm
  },
  data() {
    return {}
  },
  methods: {},
  computed: {}
}
</script>

<style>
.container {
  width: 100%;
  height: 100%;
}

#loginForm {
  text-align: center;
  font-size: 20px;
  margin-top: 0px;
}
</style>
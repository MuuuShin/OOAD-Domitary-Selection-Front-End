<template>
  <div class="container">
    <div id="login">
      <b-container fluid="lg">
        <b-row align-h="center" align-v="center" style="height: 80vh">
          <b-col sm="12" md="6">
            <b-card
              border-variant="secondary"
              header="Log In"
              header-bg-variant="secondary"
              header-text-variant="white"
              align="center"
              class="shadow"
            >
              <LoginForm :form="form"></LoginForm>
            </b-card>
          </b-col>
        </b-row>
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
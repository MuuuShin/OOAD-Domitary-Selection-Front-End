<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <b-form @submit="onSubmit" class="login-form">
      <!-- 学号输入 -->
      <b-form-group
          id="input-group-1"
          label="学号"
          label-for="input-1"

          class="form-group"
      >
        <b-form-input
            id="input-1"
            v-model="form.userID"
            type="userID"
            required
            placeholder="username"
            class="form-control"
        ></b-form-input>
      </b-form-group>

      <!-- 密码输入 -->
      <b-form-group
          id="input-group-2"
          label="密码"
          label-for="input-2"
          class="form-group"
      >
        <b-form-input
            id="input-2"
            v-model="form.pass"
            required
            placeholder="password"
            class="form-control"
            type="password"
        ></b-form-input>
      </b-form-group>

      <!-- 教师复选框 -->
      <b-form-checkbox
          id="checkbox-1"
          v-model="status"
          name="checkbox-1"
          value="accepted"
          unchecked-value="not_accepted"
          class="form-checkbox"
      >
        <h6>我是教师</h6>

      </b-form-checkbox>

      <!-- 登录按钮 -->
      <b-button type="submit" variant="primary" class="submit-button">登录</b-button>

      <!-- 忘记密码 -->
      <b-button v-b-modal.modal-1 class="forgot-password-button">忘记密码</b-button>

      <!-- 忘记密码模态框 -->
      <b-modal id="modal-1" title="忘记密码" class="forgot-password-modal">
        <p class="my-4">请邮件联系teacher@mail.sustech.edu.cn以修改密码</p>
      </b-modal>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userID: '',
        pass: ''
      },
      status: 'not_accepted'
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
      //TODO: implement the log in method
    }
  }
}
</script>

<style>
.login-container {
  background-color: #f6f8fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  max-width: 400px;
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.login-form .form-group {
  margin-bottom: 15px;
}

.login-form .form-control {
  border-radius: 6px;
  border: 1px solid #d1d5da;
}

.login-form .submit-button, .forgot-password-button {
  width: 100%;
  margin-top: 10px;
  border-radius: 6px;
}

.login-form .forgot-password-modal .modal-content {
  border-radius: 6px;
}
</style>

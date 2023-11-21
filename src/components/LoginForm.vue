<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-1"
        label="学号:"
        label-for="input-1"
        description="请输入学号"
      >
        <b-form-input
          id="input-1"
          v-model="form.userID"
          type="userID"
          required
        ></b-form-input>
      </b-form-group>
  
      <b-form-group id="input-group-2" label="密码:" label-for="input-2" discription="默认密码为学号">
        <b-form-input
          id="input-2"
          v-model="form.pass"
          required
          placeholder="password"
        ></b-form-input>
      </b-form-group>
      <h1></h1>
      <b-button type="submit" variant="primary">登录</b-button>
      <b-button v-b-modal.modal-1>忘记密码</b-button>
      <b-modal id="modal-1" title="忘记密码">
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
        }
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      toggle() {
      console.log('Toggle button clicked')
      this.show = !this.show
    },
    dismissed() {
      console.log('Alert dismissed')
    }
    },
    watch: {
      show(newVal) {
        console.log('Alert is now ' + (newVal ? 'visible' : 'hidden'))
      }
    }
  }
</script>  
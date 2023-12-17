<template>
    <div class="login-container">
        <b-form @submit="onSubmit" class="login-form">
            <h2 class="login-title">Log In</h2>

            <b-form-group
                id="input-group-1"
                label="账号:"
                label-for="input-1"
                description="请输入账号"
            >
                <b-form-input
                    id="input-1"
                    v-model="form.username"
                    type="userID"
                    required
                    placeholder="account"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="密码:" label-for="input-2" description="默认密码为学号">
                <b-form-input
                    id="input-2"
                    v-model="form.password"
                    required
                    placeholder="password"
                ></b-form-input>
            </b-form-group>
            <h1></h1>
            <b-form-checkbox
                id="checkbox-1"
                v-model="isTeacher"
                name="checkbox-1"
                value=true
                unchecked-value=false
            >
                我是教师
            </b-form-checkbox>
            <b-button type="submit" variant="primary">登录</b-button>
            <b-button v-b-modal.modal-1>忘记密码</b-button>

            <b-button :disabled="loading" type="submit" variant="primary" class="login-button">
                <b-spinner v-if="loading" small></b-spinner>
                <span v-if="!loading">登录</span>
            </b-button>

            <b-button v-b-modal.modal-1 class="forgot-password">忘记密码</b-button>
            <b-modal id="modal-1" title="忘记密码">
                <p class="my-4">请邮件联系teacher@mail.sustech.edu.cn以修改密码</p>
            </b-modal>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                userID: '',
                password: ''
            },
            isTeacher: false,
            loading: false
        }
    },
    methods: {
        async onSubmit(evt) {
            evt.preventDefault()
            alert(JSON.stringify(this.form))
            //TODO: implement the log in method
            try {
                this.loading = true;
                //axios.defaults.headers.common['Authorization'] = `Bearer`;
                let request = {
                    username: this.form.userID,
                    password: this.form.password,
                    isTeacher: this.form.isTeacher
                };

                const response = await axios.post('/login', request);
                console.log(response.data);
                if (response.data.code !== 200) {
                    alert('登录失败');
                    return;
                }
                alert('登录成功');

                // 获取JWT令牌
                const authToken = response.data.data;

                // 将JWT令牌存储在本地
                localStorage.setItem('userAuthToken', authToken);

                // 设置Axios的默认请求头，包含JWT令牌
                axios.defaults.headers.common['Authorization'] = `${authToken}`;

                // 跳转到home
                await this.$router.push('/home');


            } catch (error) {
                console.error('登录失败:', error);
                alert('登录失败');
            } finally {
                this.loading = false;
            }
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
    },
}
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh
}

.login-form {
    width: 300px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.5rem;
}

.login-button {
    width: 100%;
    margin-top: 20px;
}

.forgot-password {
    display: block;
    width: 100%;
    margin-top: 10px;
    text-align: center;
}
</style>

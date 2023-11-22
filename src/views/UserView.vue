<template>
    <div class="about">
      <b-container fluid>
        <b-row>
          <!-- Left Section -->
          <b-col md="6">
            <b-card title="照片表" class="mb-2">
              <!-- Your form fields for displaying personal photos go here -->
              <b-form>
                <!-- Form fields go here -->
              </b-form>
            </b-card>

            <b-card title="照片" class="mb-2">
              <b-img src="path/to/your/photo" fluid alt="个人照片"></b-img>
            </b-card>

            <b-card title="上传照片按钮" class="mb-2">
              <b-form @submit="uploadPhoto">
                <b-form-file v-model="photo" accept="image/*"></b-form-file>
                <b-button type="submit" variant="primary">上传照片</b-button>
              </b-form>
            </b-card>
          </b-col>

          <!-- Right Section -->
          <b-col md="6">
            <b-card title="个人信息表" class="mb-2">
              <b-table :items="personalInfo" bordered responsive>
                <b-table-column field="key" label="属性"></b-table-column>
                <b-table-column field="value" label="值"></b-table-column>
              </b-table>
            </b-card>

            <b-card title="修改按钮" class="mb-2">
              <b-button @click="openForm">修改个人信息</b-button>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
      <b-modal v-model="isFormOpen" @hide="closeForm" hide-footer>
        <UserForm @closeForm="closeForm" />
      </b-modal>
    </div>
</template>
  
<script>
  import UserForm from "@/components/UserForm";
  export default{
    components: {
      UserForm,
    },
    data() {
        return {
              personalInfo:[
              { key: '姓名', value: '1' },
              { key: '学号', value: '2' },
              { key: '性别', value: '3' },
              { key: '年龄', value: '4' },
              { key: '专业', value: '5' },
              { key: '入睡', value: '6' },
              { key: '起床', value: '7' },
              { key: '兴趣', value: '8' }
            ],
            isFormOpen: false,
        }
      },
      methods: {
      uploadPhoto() {
        //Todo: Handle photo upload logic
      },
      openForm() {
        this.isFormOpen = true;
      },
      closeForm() {
        this.isFormOpen = false;
      },
      },
  }
</script>
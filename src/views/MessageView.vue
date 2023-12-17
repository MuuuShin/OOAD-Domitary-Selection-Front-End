<template>
  <div class="container-fluid">
    <b-row>
      <!-- 左侧聊天列表 -->
      <b-col md="3">
        <b-list-group v-if="showChatList">
          <b-list-group-item
            v-for="contact in contacts"
            :key="contact.id"
            @click="selectChat(contact)"
            :class="{ 'active': contact === selectedChat }"
          >
            <b-avatar :src="contact.avatar" class="mr-2"></b-avatar>
            {{ contact.name }}
          </b-list-group-item>
        </b-list-group>
      </b-col>

      <b-col md="9">
        <div v-if="selectedChat">
          <!-- 聊天信息 -->
          <b-card v-for="message in selectedChat.messages" :key="message.id" class="mb-2" :style="message.sender === 'me' ? 'background-color: #4CAF50; color: #000; margin-left: 20%; width: 80%;' : 'background-color: #000; color: #fff; width: 80%;'">
            <!-- 区分消息来源 -->
            <p>
              {{ message.content }}
            </p>
          </b-card>

          <!-- 输入框和发送键 -->
          <b-form @submit.prevent="sendMessage">
            <b-input-group>
              <b-form-input v-model="newMessage" placeholder="输入聊天内容"></b-form-input>
              <b-input-group-append>
                <b-button type="submit" variant="primary">发送</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showChatList: true,
      contacts: [
        { id: 1, name: 'User 1', avatar: 'avatar1.jpg', messages: [] },
        { id: 2, name: 'User 2', avatar: 'avatar2.jpg', messages: [] },
        // Add more contacts as needed
      ],
      selectedChat: null,
      newMessage: '',
    };
  },
  methods: {
    selectChat(contact) {
      this.selectedChat = contact;
    },
    sendMessage() {
      if (this.selectedChat) {
        const message = {
          content: this.newMessage,
          timestamp: new Date(),
          sender: 'me', // 'me' 表示自己发送的消息，'other' 表示对方发送的消息
        };
        this.selectedChat.messages.push(message);
        this.newMessage = ''; // 清空输入框
      }
    },
  },
};
</script>

<style>
/* 添加自定义样式以美化界面 */
.container-fluid {
  padding: 20px;
}

.b-list-group-item {
  cursor: pointer;
}

.b-list-group-item.active {
  background-color: #007bff;
  color: #fff;
}

.b-card {
  max-width: 300px;
}

.b-input-group {
  margin-top: 10px;
}
</style>

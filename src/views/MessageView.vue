<template>
  <div class="chat-container">
    <!-- 左侧聊天用户列表 -->
    <div class="chat-sidebar">
      <div v-for="(user, index) in users" :key="index" @click="selectUser(user)"
           :class="{ 'active': user === selectedUser }">
        {{ user.name }}
        <span v-if="user.hasNewMessage" class="new-message-dot"></span>
      </div>
    </div>

    <!-- 右侧聊天框 -->
    <div class="chat-box">
      <div v-if="selectedUser">
        <div class="chat-header">
          <h2>{{ selectedUser.name }}</h2>
        </div>
        <div class="chat-messages">
          <div v-for="(message, index) in selectedUser.messages" :key="index" class="message"
               :class="{ 'own-message': message.isOwn }">
            {{ message.text }}
          </div>
        </div>
        <div v-if="selectedUser.id !== 0" class="chat-input">
          <textarea v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..."></textarea>
          <button @click="sendMessage">Send</button>
        </div>
        <div v-else class="system-message">
          System messages are not editable.
        </div>
      </div>
      <div v-else>
        <p>Select a user to start chatting.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  height: 100vh;
  background-color: #f0f0f0;
}

.chat-sidebar {
  width: 20%;
  padding: 20px;
  background-color: #333;
  color: #fff;
  overflow-y: auto;
}

.chat-sidebar div {
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.chat-sidebar div:hover {
  background-color: #555;
}

.new-message-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  margin-left: 5px;
}

.chat-box {
  flex-grow: 1;
  padding: 20px;
}

.chat-header {
  background-color: #444;
  color: #fff;
  padding: 10px;
  text-align: center;
}

.chat-messages {
  height: 60vh;
  overflow-y: auto;
}

.message {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.own-message {
  background-color: #3498db;
  color: #fff;
  align-self: flex-end;
}

.chat-input {
  height: calc(40vh - 110px);
  margin-top: 20px;
  display: flex;
}

.chat-input input {
  flex-grow: 2; /* 增大输入框宽度 */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
}

.chat-input button {
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.system-message {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.chat-input textarea {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}

</style>

<script>
export default {
  data() {
    return {
      users: [
        {id: 0, name: 'System', hasNewMessage: false, messages: []},
        {
          id: 1, name: 'User 1', hasNewMessage: false, messages: [{
            text: 'Hello!',
            isOwn: true,
            timestamp: '2024-01-01T12:34:56', // 可能的发送时间
            sender: {
              id: 1,
              name: 'User123',
              // 其他用户信息
            }
          }]
        },
        {id: 2, name: 'User 2', hasNewMessage: false, messages: []},
        // Add more users as needed
      ],
      selectedUser: null,
      newMessage: '',
    };
  },
  methods: {
    selectUser(user) {
      this.selectedUser = user;
      user.hasNewMessage = false; // Marking messages as read
    },
    sendMessage() {
      if (this.newMessage.trim() === '') return;

      this.selectedUser.messages.push({
        text: this.newMessage,
        isOwn: true,
      });

      // Simulating a reply from the other user after a delay
      setTimeout(() => {
        this.selectedUser.messages.push({
          text: 'Thanks for your message!',
          isOwn: false,
        });
        this.selectedUser.hasNewMessage = true; // Marking messages as unread
      }, 1000);

      this.newMessage = '';
    },
  },
};
</script>

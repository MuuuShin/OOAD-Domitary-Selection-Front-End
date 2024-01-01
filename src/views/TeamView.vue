<template>
  <div>
    <!-- 如果用户没有队伍 -->
    <div v-if="team.groupId === 0" class="no-team">
      <p>你还没有队伍</p>
      <div class="buttons">
        <button @click="$router.push('/team/search')">去搜索队伍</button>
        <button @click="openCreatePopup">创建队伍</button>
      </div>
    </div>

    <!-- 如果用户有队伍或是队伍成员 -->
    <div v-else class="team-details">
      <!-- 队伍成员表单 -->
      <div v-for="(member, index) in team.members" :key="index" class="member-form">
        <div class="member-info">
          <img :src="member.imgURL" alt="Member Image" class="member-image"/>
          <div class="member-details">
            <h3>{{ member.name }}</h3>
            <p>{{ member.intro }}</p>
          </div>
        </div>

        <!-- 如果用户是队长，显示踢出按钮 -->
        <button v-if="isLeader && member.studentId !== team.leader" @click="kickMember(member.studentId)">
          踢出
        </button>
      </div>

      <!-- 显示队伍收藏按钮 -->
      <button v-if="isMember" @click="viewFavorites">队伍收藏</button>

      <!-- 加入/退出队伍按钮 -->
      <button @click="toggleJoinLeave" :disabled="waiting || joinButtonDisabled">
        {{ isMember ? (waiting ? '等待中' : '退出') : '加入' }}
      </button>
    </div>

    <!-- 加入队伍弹窗 -->
    <transition name="fade">
      <div v-if="showJoinPopup" class="popup-overlay">
        <div class="popup">
          <h2>申请加入队伍</h2>
          <textarea v-model="applicationText" placeholder="输入申请文本"></textarea>
          <div class="buttons">
            <button @click="cancelJoin">取消</button>
            <button @click="confirmJoin">确定</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 创建队伍弹窗 -->
    <transition name="fade">
      <div v-if="showCreatePopup" class="popup-overlay">
        <div class="popup">
          <h2>创建队伍</h2>
          <label for="teamName">队伍名称：</label>
          <input id="teamName" v-model="createTeamName" placeholder="输入队伍名称">
          <div class="buttons">
            <button @click="cancelCreate">取消</button>
            <button @click="confirmCreate">创建</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<style scoped>
.no-team {
  text-align: center;
  margin-top: 20px;
  margin-top: 40px;
}

.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

.team-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.member-form {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.member-info {
  display: flex;
  align-items: center;
}

.member-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.member-details {
  text-align: left;
}

button {
  margin-top: 10px;
  padding: 8px;
  background-color: #2c3e50; /* 深灰色 */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #95a5a6; /* 浅灰色 */
  cursor: not-allowed;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px; /* 设置宽度 */
  margin: 0 auto; /* 水平居中 */
}

.popup textarea {
  width: 100%;
  height: 80px;
  margin: 10px 0;
}

input {
  width: 100%;
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
{
  opacity: 0;
}
</style>




<script>
import axios from "axios";

export default {
  data() {
    return {
      team: {
        groupId: 1,
        name: "Team 1",
        leader: 1,
        roomId: 514,
        intro: "This is a team.",
        members: [
          {studentId: 1, name: '张三', intro: "Engineering", imgURL: null},
          {studentId: 2, name: '李四', intro: "Engineering", imgURL: null},
          {studentId: 3, name: '王五', intro: "Engineering", imgURL: null},
          {studentId: 4, name: '赵六', intro: "Engineering", imgURL: null},
        ],
      },
      isMember: false, // 用于判断当前用户是否为此队伍成员,如果是,则查看详细队伍信息,否则只能查看队伍大概信息
      isLeader: false, // 用于判断当前用户是否为此队伍队长,如果是,则可以修改队伍信息以及可以踢人
      waiting: false,  // 用于判断当前用户是否已经发送了加入队伍请求,如果是,则使加入按钮转变为等待中并且不可点击
      joinButtonDisabled: false, // 用于判断当前用户是否可以加入队伍,如果是,则使加入按钮不可点击
      showJoinPopup: false,  // 控制弹窗显示与隐藏
      applicationText: '',  // 用户输入的申请文本
      showCreatePopup: false,  // 控制弹窗显示与隐藏
      createTeamName: '',  // 用户输入的队伍名称
    };
  },
  methods: {
    // 属于队伍详细信息,只有队员才能查看收藏
    viewFavorites() {
      this.$router.push({path: "/team/favour_list"});
    },
    // 绑定在加入/退出队伍按钮上,用于监听用户点击
    toggleJoinLeave() {
      if (this.isMember) {
        // Leave team
        axios.post(`/teams/${this.team.groupId}/leave`)
            .then((response) => {
              console.log(response);
              if (response.data.code !== 200) {
                alert("退出队伍失败: " + response.data.msg);
                return -1;
              }
              alert("退出队伍成功");
              this.initTeam();
            })
            .catch((error) => {
              alert("退出队伍失败: " + error);
              console.log(error);
            })
      } else {
        // Join team
        this.joinButtonDisabled = true;  // 禁用加入按钮
        this.openJoinPopup();
        this.joinButtonDisabled = false;
      }
    },
    kickOutMember(studentId) {
      axios.delete(`/teams/${this.team.groupId}/members`, {data: {studentId}})
          .then((response) => {
            console.log(response);
            if (response.data.code !== 200) {
              alert("踢出队员失败: " + response.data.msg);
              return -1;
            }
            alert("踢出队员成功");
            this.initTeam();
          })
          .catch((error) => {
            alert("踢出队员失败: " + error);
            console.log(error);
          })
    },
    // 如果用户没有任何队伍(且此时不是在查看其他队伍),则可以创建队伍
    createTeam() {
      axios.post(`/teams`, {name: this.createTeamName})
          .then((response) => {
            console.log(response);
            if (response.data.code !== 200) {
              alert("创建队伍失败: " + response.data.msg);
              return -1;
            }
            alert("创建队伍成功");
            this.initTeam();
          })
          .catch((error) => {
            alert("创建队伍失败: " + error);
            console.log(error);
          })
    },
    // 打开加入弹窗
    openJoinPopup() {
      this.showJoinPopup = true;
    },

    // 取消加入
    cancelJoin() {
      this.showJoinPopup = false;
    },

    // 确认加入
    confirmJoin() {
      // 在这里可以处理用户点击确定按钮的逻辑，例如发送加入请求
      axios.post(`/teams/join`, {leaderId: this.team.leader.toString(), message: this.applicationText})
          .then((response) => {
            console.log(response);
            if (response.data.code !== 200) {
              alert("发送请求失败: " + response.data.msg)
              return -1;
            }
            alert("已发送加入队伍请求");
            this.waiting = true;
          })
          .catch((error) => {
            alert("发送请求失败: " + error);
            console.log(error);
          })
      // 然后关闭弹窗
      this.showJoinPopup = false;
    },

    // 打开创建队伍弹窗
    openCreatePopup() {
      this.showCreatePopup = true;
    },

    // 取消创建队伍
    cancelCreate() {
      this.showCreatePopup = false;
    },

    // 确认创建队伍
    confirmCreate() {
      this.createTeam()
      this.showCreatePopup = false;
    },


    // 获取队伍信息
    async fetchTeam() {
      // 获取query参数
      const teamIdString = this.$route.query.teamId;
      let teamId;
      if (!(teamIdString && teamIdString.trim() !== '')) {
        if (localStorage.getItem('teamId') === 'null') {
          console.error("无效的团队 ID:", teamIdString);
          this.team.groupId = 0;
          this.isLeader = false;
          this.isMember = false;

          return -1;
        }
        teamId = parseInt(localStorage.getItem('teamId'));
      } else {
        teamId = parseInt(teamIdString);
      }
      if (isNaN(teamId)) {
        console.error("无效的团队 ID:", teamIdString);
        this.team.groupId = -1;
        return -1;
      }
      return await axios.get(`/teams/${teamId}`)
          .then((response) => {
            const json = response.data;
            if (json.code !== 200) {
              alert("获取队伍信息失败: " + json.msg);
              console.log(response);
              return -1;
            }
            //this.team = json.data;
            this.team.groupId = json.data.groupId;
            this.team.name = json.data.name;
            this.team.leader = json.data.leader;
            this.team.roomId = json.data.roomId;
            this.team.intro = json.data.intro;
            console.log(this._data);

            return 0;
          })
          .catch((error) => {
            alert("获取队伍信息失败: " + error);
            console.log(error);
            return -1;
          })
    },
    // 获取队伍成员信息
    async fetchTeamMembers() {
      await axios.get(`/teams/${this.team.groupId}/members`)
          .then((response) => {
            if (response.data.code !== 200) {
              alert("获取队伍成员失败: " + response.data.msg);
              console.log(response);
              return -1;
            }
            this.team.members = response.data.data;
          })
          .catch((error) => {
            alert("获取队伍成员失败: " + error);
            console.log(error);
          })
    },
    // 设置用户权限
    setPermissions() {
      //
      const userId = parseInt(localStorage.getItem('userId'));
      //对齐类型
      this.isMember = this.team.members.some((member) => member.studentId === userId);
      this.isLeader = this.team.leader === userId;
      this.joinButtonDisabled = localStorage['teamId'] !== 'null' && !this.isMember;
    },
    async updateUser() {
      const id = localStorage.getItem('userId');
      await axios.get("/users", {params: {id: id}})
          .then((response) => {
            if (response.data.code !== 200) {
              alert("获取用户信息失败: " + response.data.msg)
              console.log(response)
              return -1
            }
            const user = response.data.data;
            localStorage.setItem('userId', user.studentId);
            localStorage.setItem('teamId', user.groupId);
            localStorage.setItem('account', user.account);
            localStorage.setItem('name', user.name);
          })
          .catch((error) => {
            alert('获取用户信息失败: ' + error.message);
            console.log(error)
            return -1
          })
    },
    async initTeam() {
      await this.updateUser();
      const isInTeam = await this.fetchTeam();
      if (isInTeam !== -1) {
        await this.fetchTeamMembers();
        this.setPermissions();
      }
    },
  },
  mounted() {
    this.initTeam();
  },
};
</script>
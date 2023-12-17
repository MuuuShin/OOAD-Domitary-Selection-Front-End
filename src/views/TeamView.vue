<template>
  <div>
    <!-- 查看收藏按钮 -->
    <b-button variant="primary" class="mr-2" @click="viewFavorites">查看收藏</b-button>

    <!-- 加入/退出队伍按钮 -->
    <b-button variant="success" class="mr-2" @click="toggleJoinLeave">
      {{ isMember ? '退出队伍' : '加入队伍' }}
    </b-button>

    <!-- 队伍信息List -->
    <b-list-group class="mt-3" v-if="team.members.length > 0">
      <b-list-group-item v-for="member in team.members" :key="member.id">
        <router-link :to="{ path: 'user', query: { id: member.id } }">
          {{ member.name }}
        </router-link>
        <span v-if="team.leaderId === member.id">(队长)</span>
      </b-list-group-item>
    </b-list-group>
    <p v-else>No team members.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: {
        // Replace with actual team data
        teamid: 1,
        leaderId: 1,
        members: [
          { id: 1, name: '张三' },
          { id: 2, name: '李四' },
          { id: 3, name: '王五' },
          { id: 4, name: '赵六' },
        ],
      },
      isMember: false, // TODO: Replace with logic to check if the user is a team member
    };
  },
  methods: {
    getTeamId(){
      const id = 114514
      // TODO: get the TeamID
      return id
    },
    viewFavorites() {
      const id = this.getTeamId()
      this.$router.push({path:"/team/favour_list",query: {id}})
    },
    toggleJoinLeave() {
      if (this.isMember) {
        // TODO: Implement logic to leave the team
      } else {
        // TODO: Implement logic to join the team
      }
    },

  },
  created: {
    
  }
};
</script>

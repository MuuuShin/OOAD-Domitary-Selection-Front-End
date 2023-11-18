<template>
    <div class="homeview">
      <div>
        <b-row>
          <b-col></b-col>
          <b-col><b-card no-body>
            <b-list-group>
              <b-list-group-item button @click="jumpRoomSearch">房间查询</b-list-group-item>
              <b-list-group-item button @click="jumpTeamSearch">队伍查询</b-list-group-item>
            </b-list-group>
          </b-card></b-col>
          <b-col></b-col>
            <b-col><b-card header="选房时段">
              <b-card-body>
                选房时段表
              </b-card-body>
              <b-button>
                查看更多
              </b-button>
            </b-card>
          </b-col>
          <b-col></b-col>
        </b-row>
      </div>
    </div>
  </template>
  
<script>
  export default{
    methods: {
      jumpRoomSearch(){
        this.$router.push('/room/search')
      },
      jumpTeamSearch(){
        this.$router.push('/team/search')
      }
    }
  }
</script>
<template>
  <div class="homeview">
    <div class="page-container">
      <b-row class="mt-4">
        <b-col md="1"></b-col> 
        <b-col md="6"> 
          <b-card no-body>
            <b-list-group>
              <b-list-group-item button @click="jumpRoomSearch" style="height: 100px; font-size: 40px;">房间查询</b-list-group-item>
              <b-list-group-item button @click="jumpTeamSearch" style="height: 100px; font-size: 40px;">队伍查询</b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>

        <b-col md="1"></b-col> 

        <b-col md="3"> 
          <b-card header="选房时段">
            <b-card-body>
              选房时段表
            </b-card-body>
            <b-button>
              查看更多
            </b-button>
          </b-card>
        </b-col>
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
<style>
.page-container {
  margin-top: 50px; 
}
</style>
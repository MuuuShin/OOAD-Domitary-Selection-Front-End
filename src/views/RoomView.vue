<template>
  <div>
    <b-row class="mt-4">
      <b-col md="1"></b-col>
      <!-- 左侧信息展示卡 -->
      <b-col md="4">
        <b-card fluid>
          <!-- 房间信息展示 -->
          <div>
            <h2>{{ room.name }}</h2>
            <p>区域：{{ room.area }}</p>
            <p>楼栋：{{ room.building }}</p>
            <p>楼层：{{ room.floor }}</p>
            <p>人数：{{ room.capacity }}</p>
            <p>被收藏数：{{ room.isFavoured }}</p>
          </div>
          <!-- 学生端显示收藏按钮 -->
          <b-button v-if="isStudent" @click="addToFavorites">收藏</b-button>
          <!-- 教师端显示编辑按钮 -->
          <b-button v-if="isTeacher" @click="openEditForm">编辑</b-button>
        </b-card>
      </b-col>

      <!-- 右侧房间图片 -->
      <b-col md="6">
        <b-img :src="room.image" fluid thumbnail></b-img>
        <!-- 上传图片按钮，仅教师端显示 -->
        <b-button v-if="isTeacher" @click="uploadImage" class="mt-2">上传图片</b-button>
      </b-col>
      <b-col md="1"></b-col>
    </b-row>
    <!-- 评论区 -->
    <b-row class="mt-2">
      <b-col md="1"></b-col>
      <b-col>
        <b-media-list>
          <!-- 遍历评论，每个评论作为一个 media -->
          <b-card v-for="comment in room.comments" :key="comment.id">
            <!-- 评论内容 -->
            <p>{{ comment.content }}</p>
            <!-- 添加回复按钮 -->
            <b-button @click="replyToComment(comment)">回复</b-button>
          </b-card>
          <!-- 添加回复的按钮 -->
          <b-button @click="addComment">添加评论</b-button>
        </b-media-list>
      </b-col>
      <b-col md="1"></b-col>
    </b-row>


    <!-- 修改信息表单 -->
    <b-modal v-model="isEditing" title="修改房间信息">
      <!-- 编辑表单内容 -->
      <b-form @submit.stop.prevent="updateRoom">
        <b-form-group label="房间名" label-for="roomName">
          <b-form-input id="roomName" v-model="room.name" required></b-form-input>
        </b-form-group>
        <b-form-group label="区域" label-for="roomArea">
          <b-form-input id="roomArea" v-model="room.area" required></b-form-input>
        </b-form-group>
        <b-form-group label="楼栋" label-for="roomPrice">
          <b-form-input id="roomBuilding" v-model="room.building" required></b-form-input>
        </b-form-group>
        <b-form-group label="楼层" label-for="roomPrice">
          <b-form-input id="roomFloor" v-model="room.floor" required></b-form-input>
        </b-form-group>
        <b-form-group label="人数" label-for="roomPrice">
          <b-form-input id="roomCapacity" v-model="room.capacity" required></b-form-input>
        </b-form-group>
        <!-- 提交按钮 -->
        <b-button type="submit" variant="primary">提交</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      room: {
        // Replace with actual room data
        id: '514',
        name: '514',
        area: '湖畔',
        building: '1',
        floor: '1',
        capacity: '4',
        isFavoured: '1919810',
        image: 'room-image.jpg',
        comments: [
          {id: 1, content: 'Great room!'},
          // Other comments
        ],
      },
      isStudent: false, // Replace with logic to check if the user is a student
      isTeacher: true, // Replace with logic to check if the user is a teacher
      isEditing: false,
    };
  },
  created() {
    const roomId = this.$route.query.roomId;
    this.fetchRoomData(roomId);
  },
  methods: {
    fetchRoomData(roomId) {
      axios.get(`/rooms/${roomId}`)
          .then((response) => {
            console.log(response)
            if (response.data.code !== 200) {
              alert("获取房间信息失败: " + response.data.msg)
              return -1
            }

            this.room.id = response.data.data.id
            this.room.name = response.data.data.roomNumber
            this.room.area = response.data.data.region
            this.room.building = response.data.data.dormitory
            this.room.floor = response.data.data.floor
            //todo: 没做完
          })
          .catch((error) => {
            console.log(error)
            alert("获取房间信息失败: " + error)
          })
      axios.get(`/rooms/${roomId}/comments`)
          .then((response) => {
            console.log(response)
            if (response.data.code !== 200) {
              alert("获取评论失败: " + response.data.msg)
              return -1
            }
            this.room.comments = response.data.data
          })
          .catch((error) => {
            console.log(error)
            alert("获取评论失败: " + error)
          })

    },
    addToFavorites() {
      const roomId = this.room.id
      let request = {roomId: roomId}
      axios.post(`/teams/${this.teamId}/favorites`, request)
          .then((response) => {
            if(response.data.code === 200) {
              alert("收藏成功!");
              //更新页面
              //todo:按钮变成已收藏
            }else {
              alert("收藏失败: "+response.data.msg);
            }
            console.log(response)
          })
          .catch((error) => {
            alert('收藏失败: '+error.message);
            console.log(error)
            return -1
          })
      return roomId
    },
    openEditForm() {
      this.isEditing = true;
    },
    updateRoom() {
      // TODO: Implement logic to update room information
      //老师?
      this.isEditing = false;
    },
    uploadImage() {
      // TODO: Implement logic to upload room image
      // 搁置
    },
    replyToComment(commentId) {
      let request={
        title: "test",
        body: "test",
        postId: commentId
      }
      axios.post(`/rooms/comments`, request)
          .then((response) => {
            console.log(response)
            if (response.data.code !== 200) {
              alert("添加评论失败: " + response.data.msg)
              return -1
            }
            //评论成功
            this.fetchRoomData(this.room.id);

          })
          .catch((error) => {
            console.log(error)
            alert("添加评论失败: " + error)
          })
    },
    addComment() {
      this.replyToComment(this.room.id)
    },
  },
};
</script>

//  const response= await axios.get('/rooms/{id}', request)
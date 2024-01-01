<template>
  <div class="about">
    <b-card header="已收藏房间">
      <b-table
          show-empty
          small
          stacked="md"
          :items="rooms"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filterIncludedFields="filterOn"
          @filtered="onFiltered"
      >
        <template v-slot:cell(actions)="row">
          <b-button size="sm" @click="viewRoomDetails(row.item)" class="mr-1">
            查看详情
          </b-button>
          <b-button size="sm" @click="deleteFavourRoom(row.item)" class="mr-1">
            解除收藏
          </b-button>
        </template>
      </b-table>
      <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
      ></b-pagination>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      rooms: [{
        // district: '湖畔',
        // building: '1',

        roomId: 1,
        name: "102",
        type: 4,
        intro: "爷",
        status: 1,
        statusStr: "空闲",
        floorId: 1,
        commentBaseId: 1,
        capacity: 4,
        imgURL: null
      }], // Store room data here
      fields: [
        {key: 'roomId', label: 'Room Id', sortable: false},
        {key: 'name', label: 'Name', class: 'text-center'},
        {key: 'statusStr', label: 'Status', sortable: false},
        // {key: 'district', label: 'District', class: 'text-center'},
        // {key: 'building', label: 'Building', class: 'text-center'},
        {key: 'floorId', label: 'Floor', class: 'text-center'},
        {key: 'capacity', label: 'Capacity', class: 'text-center'},
        {key: 'actions', label: 'Actions'}
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      //pageOptions: [5, 10, 15],
      filter: null,
      filterOn: [],
      teamId: -1,
    };
  },
  methods: {
    fetchFavourRooms() {
      axios.get(`/teams/${this.teamId}/favorites`)
          .then((response) => {
            if (response.data.code !== 200) {
              alert("获取收藏失败: " + response.data.msg)
              console.log(response)
              return -1
            }
            this.rooms = response.data.data
            for(let i=0;i<this.rooms.length;i++){
              this.rooms[i].statusStr = this.rooms[i].status===1?"空闲":"占用"
              this.rooms[i].capacity = this.rooms[i].type % 4 + 1
            }
            this.totalRows = response.data.data.length
            console.log(response)
            if (this.rooms.length === 0) {
              alert("暂无收藏")
            }
            if (this.currentPage !== 1 && this.currentPage >= Math.ceil(this.totalRows / this.perPage)) {
              this.currentPage = Math.ceil(this.totalRows / this.perPage)
            }
          })
          .catch((error) => {
            alert('获取收藏失败: ' + error.message);
            console.log(error)
            return -1
          })
    },
    viewRoomDetails(room) {
      const roomId = room.roomId
      this.$router.push({path: "/room", query: {roomId}});
    },
    deleteFavourRoom(room) {
      const roomId = room.roomId.toString()
      axios.delete(`/teams/${this.teamId}/favorites`, {data: {roomId}})
          .then((response) => {
            console.log(response)
            if (response.data.code === 200) {
              alert("删除成功!");
            } else {
              alert("删除失败: " + response.data.msg);
            }
            this.fetchFavourRooms()
          })
          .catch((error) => {
            alert('删除失败: ' + error.message);
            console.log(error)
            return -1
          })
      return roomId
    },
  },
  mounted() {
    if(localStorage.getItem('teamId')==='null'){
      alert("请先加入队伍")
      this.$router.push('/home')
    }
    this.currentPage = 1
    this.teamId = parseInt(localStorage.getItem('teamId'))
    this.fetchFavourRooms(); // Fetch teams when the component is mounted

  },
};
</script>
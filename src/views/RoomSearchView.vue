<template>
  <div>
    <b-row class="mt-4">
      <b-col md="1"></b-col>
      <b-col md="2">
        <b-card no-body>
          <filter-form @applyFilter="fetchRooms"/>
        </b-card>
      </b-col>

      <b-col md="1"></b-col>

      <b-col md="7">
        <b-card header="房间查询">
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
              <b-button size="sm" @click="favourRoom(row.item)" class="mr-1">
                收藏
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
      </b-col>
    </b-row>
  </div>
</template>

<script>
import FilterForm from '@/components/RoomFilterForm.vue';
import axios from "axios";

export default {
  components: {
    FilterForm,
  },
  data() {
    return {
      rooms: [{
        id: 514,
        district: '湖畔',
        building: '1',
        floor: '1',
        capacity: '4',
      }], // Store room data here
      fields: [
        {key: 'id', label: 'Room Id', sortable: false},
        {key: 'district', label: 'District', class: 'text-center'},
        {key: 'building', label: 'Building', class: 'text-center'},
        {key: 'floor', label: 'Floor', class: 'text-center'},
        {key: 'capacity', label: 'Capacity', class: 'text-center'},
        {key: 'actions', label: 'Actions'}
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      //pageOptions: [5, 10, 15],
      filter: null,
      filterOn: [],
      teamId: 0,
    };
  },
  methods: {
    async fetchRooms() {
      if (FilterForm.region == null) {
        //返回所有房间
      } else if (FilterForm.building == null) {
        //返回该区域所有房间
      } else if (FilterForm.floor1 == null) {
        //返回该楼栋所有房间
      } else {
        axios.get('/floors/' + FilterForm.floor1 + '/rooms')
            .then((response) => {
              console.log(response)
              if (response.data.code !== 200) {
                alert("获取房间失败: "+response.data.msg)
                return;
              }
              //返回该楼层所有房间
              //todo: 房间两边的内容对不上的,收藏那里我不知道是不是有同样的问题
              this.rooms = response.data.data
              this.totalRows = response.data.data.length
            })
            .catch((error) => {
              alert('获取房间失败: '+error.message);
              console.log(error)
            })
      }
    },
    getRoomKey(room) { //todo: 方法存在的意义
      return room.id
    },
    viewRoomDetails(room) {
      const roomId = this.getRoomKey(room)
      this.$router.push({path: "/room"+roomId})
    },
    favourRoom(room) {
      const roomId = this.getRoomKey(room)
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
    //todo:这里需要一个方法写按钮是已收藏(灰的),收藏(绿的)
  },
  mounted() {
    this.fetchRooms(); // Fetch teams when the component is mounted
  },
};
</script>

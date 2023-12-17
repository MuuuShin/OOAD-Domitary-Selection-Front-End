<template>
  <div>
    <b-row class="mt-4">
      <b-col md="1"></b-col>
      <b-col md="2">
        <b-card no-body>
          <filter-form @applyFilter="fetchRooms" />
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
          { key: 'id', label: 'Room Id', sortable: false },
          { key: 'district', label: 'District', class: 'text-center' },
          { key: 'building', label: 'Building', class: 'text-center' },
          { key: 'floor', label: 'Floor', class: 'text-center' },
          { key: 'capacity', label: 'Capacity', class: 'text-center' },
          { key: 'actions', label: 'Actions' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        //pageOptions: [5, 10, 15],
        filter: null,
        filterOn: [],
    };
  },
  methods: {
    async fetchRooms() {
        let request = {}
        if (FilterForm.region == null) {
            //返回所有房间
        } else if (FilterForm.building == null) {
            //返回该区域所有房间
        } else if (FilterForm.floor1 == null) {
            //返回该楼栋所有房间
        } else {
            const response = await axios.get('/floors/'+FilterForm.floor1+'/rooms', request);
            //返回该楼层所有房间
            this.rooms = response.data
            this.totalRows = response.data.length
        }
        // TODO: Fetch data from the API
        // Update this.rooms and this.totalRows based on the API response
    },
    getRoomKey(room){
      const roomId = room.id
      // TODO: Get the primary key for the room from the backend
        // 错误的,这里应该事先在fetchRooms() 就有key了
      return roomId
    },
    viewRoomDetails(room) {
      const roomId = this.getRoomKey(room)
      // TODO: Get the primary key for the room from the backend
      this.$router.push({path:"/room",query: {roomId}})
    },
    async favourRoom(room) {
        const roomId = this.getRoomKey(room)
        let request = {roomId: roomId}
        const response = await axios.post('/teams'+'/favorites', request);
        console.log( response.data)
        // TODO: add room to team favourite list
        return roomId
    },
  },
  mounted() {
    this.fetchRooms(); // Fetch teams when the component is mounted
  },
};
</script>

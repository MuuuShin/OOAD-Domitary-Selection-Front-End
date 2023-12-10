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
  export default {
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
    fetchFavourRooms() {
      // TODO: Fetch data from the API
      // Update this.rooms and this.totalRows based on the API response
    },
    getRoomKey(room){
      const roomId = room.id
      // TODO: Get the primary key for the room from the backend
      return roomId
    },
    viewRoomDetails(room) {
      const roomId = this.getRoomKey(room)
      // TODO: Get the primary key for the room from the backend
      this.$router.push({path:"/room",query: {roomId}})
    },
    deleteFavourRoom(room) {
      const roomId = this.getRoomKey(room)
      // TODO: delete room to team favourite list
      return roomId
    },
  },
  mounted() {
    this.fetchFavourRooms(); // Fetch teams when the component is mounted
  },
};
</script>
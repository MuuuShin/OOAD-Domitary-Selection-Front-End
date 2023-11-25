<template>
  <div>
    <b-row class="mt-4">
      <b-col md="1"></b-col>
      <b-col md="2">
        <b-card no-body>
          <filter-form @applyFilter="fetchTeams" />
        </b-card>
      </b-col>

      <b-col md="1"></b-col>

      <b-col md="7">
        <b-card header="队伍查询">
          <b-table
            show-empty
            small
            stacked="md"
            :items="teams"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filterIncludedFields="filterOn"
            @filtered="onFiltered"
          >
            <template v-slot:cell(actions)="row">
              <b-button size="sm" @click="viewTeamDetails(row.item.id)" class="mr-1">
                查看详情
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
import FilterForm from '@/components/TeamFilterForm.vue';

export default {
  components: {
    FilterForm,
  },
  data() {
    return {
      teams: [{
        id: 1,
        P1: '张三',
        P2: '李四',
        P3: '王五',
        P4: '赵六',
      }], // Store teams data here
      fields: [
          { key: 'id', label: 'Team Id', sortable: false },
          { key: 'P1', label: 'Person 1', class: 'text-center' },
          { key: 'P2', label: 'Person 2', class: 'text-center' },
          { key: 'P3', label: 'Person 3', class: 'text-center' },
          { key: 'P4', label: 'Person 4', class: 'text-center' },
          { key: 'actions', label: 'Actions' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15],
        filter: null,
        filterOn: [],
    };
  },
  methods: {
    fetchTeams() {
      // TODO: Fetch data from the API
      // Update this.teams and this.totalRows based on the API response
    },
    viewTeamDetails(teamId) {
      this.$router.push({path:"/team",query: {teamId}})
    },
  },
  mounted() {
    this.fetchTeams(); // Fetch teams when the component is mounted
  },
};
</script>

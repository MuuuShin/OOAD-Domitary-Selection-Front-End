<template>
    <b-form @submit.prevent="applyFilter">
      <b-form-group label="人数：" label-for="numPeople">
        <b-form-select v-model="numPeople" :options="numPeopleOptions"></b-form-select>
      </b-form-group>
  
      <b-form-group label="区域：" label-for="district">
        <b-form-select v-model="district" :options="districtOptions"></b-form-select>
      </b-form-group>
  
      <b-form-group label="楼栋：" label-for="building">
        <b-form-select v-model="building" :options="buildingOptions"></b-form-select>
      </b-form-group>
  
      <b-form-group label="楼层：" label-for="floor">
        <b-form-select v-model="floor1" :options="floorOptions"></b-form-select>
      </b-form-group>
  
      <b-button type="submit">查询</b-button>
    </b-form>
  </template>
  
  <script>
  import axios from "axios";

  export default {
    data() {
      return {
        numPeople: null,
        district: null,
        building: null,
        floor1: null,
        numPeopleOptions: [2, 3, 4],
        districtOptions: ['湖畔', '二期'],
        buildingOptions: [],
        floorOptions: []
      };
    },
    methods: {
      async applyFilter() {
          alert("啊伟大伟大")
          //TODO: Handle filter logic here
          if (this.district == null) {
             //没办法查看所有房间啊
          } else if (this.building == null) {
              const response = await axios.get('/regions/'+this.district+'/dormitories')
              this.buildingOptions = response.data

          } else if (this.floor1 == null) {
              const response = await axios.get('/dormitories/'+this.building+'/floors')
              this.floorOptions = response.data

          } else {
              const response = await axios.get('/floors/'+this.floor1+'/rooms')
              this.rooms = response.data
          }
          console.log('Filter Applied:', this.numPeople, this.district, this.building, this.floor1);
      },
    },
      async mounted() {
          const response = await axios.get('/regions')
          this.districtOptions = response.data
      }
  };
  </script>
  
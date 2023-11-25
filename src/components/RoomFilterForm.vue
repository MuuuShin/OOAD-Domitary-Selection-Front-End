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
        <b-form-select v-model="floor" :options="floorOptions"></b-form-select>
      </b-form-group>
  
      <b-button type="submit">查询</b-button>
    </b-form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        numPeople: null,
        district: null,
        building: null,
        floor: null,
        numPeopleOptions: [2, 3, 4],
        districtOptions: ['湖畔', '二期'],
        buildingOptions: [],
        floorOptions: []
      };
    },
    methods: {
      applyFilter() {
        //TODO: Handle filter logic here
        console.log('Filter Applied:', this.numPeople, this.sleepTime, this.wakeUpTime, this.features);
      },
    },
  };
  </script>
  
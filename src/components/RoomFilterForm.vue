<template>
  <b-form @submit.stop.prevent="$emit('applyFilter', {numPeople, district, building, floor1})">
    <b-form-group label="人数：" label-for="numPeople">
      <b-form-select v-model="numPeople" :options="numPeopleOptions"></b-form-select>
    </b-form-group>

    <b-form-group label="区域：" label-for="district">
      <b-form-select v-model="district" :options="districtOptions" @change="onChange"></b-form-select>
    </b-form-group>

    <b-form-group label="楼栋：" label-for="building">
      <b-form-select v-model="building" :options="buildingOptions" @change="onChange"></b-form-select>
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
    onChange() {
      alert("啊伟大伟大")
      //TODO: Handle filter logic here
      if (this.district == null) {
        //没办法查看所有房间啊
        //啥也不干
      } else if (this.building == null) {
        axios.get(`/regions/${this.district}/dormitories`)
            .then((response) => {
              this.buildingOptions = response.data
            })
            .catch((error) => {
              console.log(error)
            })

      } else if (this.floor1 == null) {
        axios.get(`/dormitories/${this.building}/floors`)
            .then((response) => {
              this.floorOptions = response.data
            })
            .catch((error) => {
              console.log(error)
            })
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
  
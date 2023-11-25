<template>
  <b-form @submit.prevent="applyFilter">
    <b-form-group label="人数：" label-for="numPeople">
      <b-form-select v-model="numPeople" :options="numPeopleOptions"></b-form-select>
    </b-form-group>

    <b-form-group label="入睡时间：" label-for="sleepTime">
      <b-form-timepicker v-model="sleepTime"></b-form-timepicker>
    </b-form-group>

    <b-form-group label="起床时间：" label-for="wakeUpTime">
      <b-form-timepicker v-model="wakeUpTime"></b-form-timepicker>
    </b-form-group>

    <b-form-group label="特征：" label-for="features">
      <b-form-textarea v-model="features" rows="3"></b-form-textarea>
    </b-form-group>

    <b-button type="submit">查询</b-button>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      numPeople: null,
      sleepTime: null,
      wakeUpTime: null,
      features: '',
      numPeopleOptions: [2, 3, 4],
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

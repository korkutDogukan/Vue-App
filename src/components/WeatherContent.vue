<template>
  <div class="weatherContent">
    <main :class="weatherControl">
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Search..."
          v-model="query"
          @keydown.enter="searchCity"
        />
      </div>

      <div class="weather-wrap" v-if="lengthControl.length > 0">
        <div class="location-box">
          <div class="location">
            {{ weather.name }}, {{ weather.sys.country }}
          </div>
          <div class="date">{{ searchDate }}</div>
          <div class="hours">{{ searchHours }}</div>
        </div>
        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }}°C</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import swal from "sweetalert";
const api_key = ref("b258f6e389533d687e4b5f7b7cf7f394");
const url_base = ref("https://api.openweathermap.org/data/2.5/");
const query = ref("");
const weather = ref([]);
const lengthControl = ref([]);
const searchCity = () => {
  if (query.value.length > 0) {
    axios
      .get(
        `${url_base.value}weather?q=${query.value}&units=metric&APPID=${api_key.value}`
      )
      .then((get_response) => {
        weather.value = get_response.data;
        lengthControl.value = get_response.data.weather;
        console.log(weather.value);
      });
  } else {
    swal("Please write the city name !!");
  }
};

const searchDate = computed(() => {
  return new Date().toDateString();
});

const searchHours = computed(() => {
  return new Date().toLocaleTimeString();
});

const weatherControl = computed(() => {
  if (typeof weather.value.main != 'undefined' && weather.value.main.temp > 35) {
    return "extremehot";
  } else if (typeof weather.value.main != 'undefined' && weather.value.main.temp > 25) {
    return "hot";
  } else if (typeof weather.value.main != 'undefined' && weather.value.main.temp > 15) {
    return "warm";
  } else if (typeof weather.value.main != 'undefined' && weather.value.main.temp > 10) {
    return "normal";
  } else if (typeof weather.value.main != 'undefined' && weather.value.main.temp > 0) {
    return "cold";
  } else if (typeof weather.value.main != 'undefined' && weather.value.main.temp > -10) {
    return "verycold";
  } else {
    return "extremecold";
  }
});
</script>

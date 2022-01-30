<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-2">
        <div class="input-group mb-3">
          <input type="number" class="form-control" v-model="money1" />
        </div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="money2" disabled />
        </div>
      </div>

      <div class="col-md-1">
        <select
          class="form-select mb-3"
          aria-label="Default select example"
          v-model="selectedElement"
        >
          <option selected>
            {{ selectedElement }}
          </option>
          <option v-for="value in countryCurrencies" :key="value">
            {{ value }}
          </option>
        </select>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="selectedElement2"
        >
          <option selected>
            {{ selectedElement2 }}
          </option>
          <option v-for="value in countryCurrencies" :key="value">
            {{ value }}
          </option>
        </select>
      </div>

      <div class="col-md-2">
        <button
          @click="exchangeMoney"
          type="button"
          id="exchange"
          class="btn btn-success"
        >
          Çevir
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";
// const api = ref(
//   "http://api.exchangeratesapi.io/v1/latest?access_key=4c0588da19140062426b946e62fb3482&format=1"
// );
const countriesApi = ref(
  "https://api.fastforex.io/currencies?api_key=9044400405-a8576f37a2-r6itbx"
);

const money1 = ref(1);
const money2 = ref(null);
const selectType = ref([]);
const selectedElement = ref(null);
const selectedElement2 = ref(null);

const countryCurrencies = ref([]);

axios.get(countriesApi.value).then((get_response) => {
  selectType.value = get_response.data.currencies;
  const entry = selectType.value;
  for (const i in entry) {
    countryCurrencies.value.push(i);
  }
  selectedElement.value = countryCurrencies.value[42];
  selectedElement2.value = countryCurrencies.value[130];
});

axios
  .get(
    `https://api.fastforex.io/convert?from=EUR&to=TRY&amount=1.00&api_key=9044400405-a8576f37a2-r6itbx`
  )
  .then((get_response) => {
    money2.value = get_response.data.result.TRY;
  });

const exchangeMoney = () => {
  axios
    .get(
      `https://api.fastforex.io/convert?from=${selectedElement.value}&to=${selectedElement2.value}&amount=${money1.value}.00&api_key=9044400405-a8576f37a2-r6itbx`
    )
    .then((get_response) => {
      money2.value = (get_response.data.result.rate * money1.value).toFixed(2);
    });
};
</script>

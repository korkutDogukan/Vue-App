<template>
  <div class="exchangeContentContainer">
    <div class="exchangeBackground">
      <div class="row">
        <div class="exchangeCol">
          <input class="input-box" type="number" v-model="money1" />
          <input type="text" class="input-box" v-model="money2" disabled />
        </div>
        <div class="exchangeCol2">
          <select v-model="selectedElement">
            <option selected disabled>
              {{ selectedElement }}
            </option>
            <option v-for="value in countryCurrencies" :key="value">
              {{ value }}
            </option>
          </select>
          <select v-model="selectedElement2">
            <option selected disabled>
              {{ selectedElement2 }}
            </option>
            <option v-for="value in countryCurrencies" :key="value">
              {{ value }}
            </option>
          </select>
        </div>
        <div class="exchangeBtn">
          <button
            @click="reverseBtn"
            class="reverseBtn"
            type="button"
            id="exchange"
          >
            <i class="fas fa-sync-alt"></i>
          </button>
          <button
            @click="exchangeMoney"
            class="calculateBtn"
            type="button"
            id="exchange"
          >
            <i class="fas fa-calculator"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="exchangeExplain">
          <p class="firstExplain">Equals {{ money1 }} {{ explainCountry }}</p>
          <p class="secondExplain">{{ money2 }} {{ explainCountry2 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";
import swal from "sweetalert";
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
const explainCountry = ref("Euro");
const explainCountry2 = ref("Turkish Lira");

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
  if (money1.value != "" && money1.value>0) {
    axios
      .get(
        `https://api.fastforex.io/convert?from=${selectedElement.value}&to=${
          selectedElement2.value
        }&amount=${Math.round(
          money1.value
        )}.00&api_key=9044400405-a8576f37a2-r6itbx`
      )
      .then((get_response) => {
        money2.value =
          get_response.data.result[selectedElement2.value].toFixed(2);
      });

    axios.get(countriesApi.value).then((get_response) => {
      explainCountry.value =
        get_response.data.currencies[selectedElement.value];
      explainCountry2.value =
        get_response.data.currencies[selectedElement2.value];
    });
  } else {
    swal("Please enter a valid number.");
  }
};

const reverseBtn = () => {
  const newText = selectedElement.value;
  const newText2 = selectedElement2.value;

  selectedElement.value = newText2;
  selectedElement2.value = newText;
};
</script>

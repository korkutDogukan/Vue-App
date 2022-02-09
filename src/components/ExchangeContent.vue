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
            <option v-for="value in selectType" :key="value">
              {{ value }}
            </option>
          </select>
          <select v-model="selectedElement2">
            <option selected disabled>
              {{ selectedElement2 }}
            </option>
            <option v-for="value in selectType" :key="value">
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
  "https://v6.exchangerate-api.com/v6/0c990a61c16c217e90d153c0/codes"
);

const money1 = ref(1);
const money2 = ref(null);
const selectType = ref([]);
const selectedElement = ref(null);
const selectedElement2 = ref(null);
const explainCountry = ref("Euro");
const explainCountry2 = ref("Turkish Lira");

// const countryCurrencies = ref([]);

axios.get(countriesApi.value).then((get_response) => {
  get_response.data.supported_codes.forEach((element) => {
    selectType.value.push(element[0]);
  });

  // const entry = selectType.value;
  // for (const i in entry) {
  //   countryCurrencies.value.push(i);
  // }

  selectedElement.value = selectType.value[42];
  selectedElement2.value = selectType.value[138];
});

axios
  .get(`https://v6.exchangerate-api.com/v6/0c990a61c16c217e90d153c0/latest/EUR`)
  .then((get_response) => {
    money2.value = get_response.data.conversion_rates.TRY.toFixed(2);
  });

const exchangeMoney = () => {
  if (money1.value != "" && money1.value > 0) {
    axios
      .get(
        `https://v6.exchangerate-api.com/v6/0c990a61c16c217e90d153c0/pair/${selectedElement.value}/${selectedElement2.value}/${money1.value}`
      )
      .then((get_response) => {
        money2.value = get_response.data.conversion_result.toFixed(2);
      });

    axios.get(countriesApi.value).then((get_response) => {
      for (var i = 0; i < get_response.data.supported_codes.length; i++) {
        if (get_response.data.supported_codes[i][0] == selectedElement.value) {
          explainCountry.value = get_response.data.supported_codes[i][1];
        }
        if (get_response.data.supported_codes[i][0] == selectedElement2.value) {
          explainCountry2.value = get_response.data.supported_codes[i][1];
        }
      }
    });
  } else {
    swal("Please enter a valid number.");
  }

  //   axios.get(countriesApi.value).then((get_response) => {
  //     explainCountry.value =
  //       get_response.data.currencies[selectedElement.value];
  //     explainCountry2.value =
  //       get_response.data.currencies[selectedElement2.value];
  //   });
  // } else {
  //   swal("Please enter a valid number.");
  // }
};

const reverseBtn = () => {
  const newText = selectedElement.value;
  const newText2 = selectedElement2.value;

  selectedElement.value = newText2;
  selectedElement2.value = newText;
};
</script>

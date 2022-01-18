<template>
  <div class="loginContainer">
    <div class="card">
      <h3>LOGIN</h3>
      <form>
        <input
          v-model="userData.username"
          type="text"
          class="input-box"
          placeholder="Username"
          required
        />
        <input
          v-model="userData.password"
          type="password"
          class="input-box"
          placeholder="Password"
          required
        />
      </form>
      <button @click="onLogin" class="loginBtn">Submit</button>
      <p>
        I'm not a member, I want to<router-link
          :to="{ name: 'RegisterPage' }"
          class="loginNewAccount"
        >
          become a member.</router-link
        >
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import swal from "sweetalert";
const router = useRouter();
const store = useStore();

const userData = ref({
  username: null,
  password: null,
});

const onLogin = () => {
  axios
    .get(
      `http://localhost:3000/users?userName=${userData.value.username}&password=${userData.value.password}`
    )
    .then((get_response) => {
      if (get_response.data.length > 0) {
        swal("Login successful");
        store.commit("setUser", get_response?.data[0]);
        router.push({ name: "HomePage" });
      } else {
        swal(
          "The information you entered is incorrect, please check your information."
        );
      }
    });
};
</script>
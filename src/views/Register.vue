<template>
  <div class="registerContainer">
    <div class="card">
      <h3>REGISTER</h3>
      <form>
        <input
          v-model="userData.userName"
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
      <button @click="onSave" class="loginBtn">Submit</button>
      <p>
        I'm already a member, I want to<router-link
          :to="{ name: 'LoginPage' }"
          class="loginNewAccount"
        >
          login.</router-link
        >
      </p>
    </div>
  </div>
</template>

// <script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import swal from "sweetalert";

const router = useRouter();

const userData = ref({ userName: null, password: null });

const onSave = () => {
  if (userData.value.userName !== null && userData.value.password !== null) {
    axios
      .get(
        `http://localhost:3000/users?userName=${userData.value.userName}`
      )
      .then((get_response) => {
        if (get_response.data.length > 0) {
          swal(
            "This username has already been taken. Please try another username."
          );
        } else {
          axios.post("http://localhost:3000/users", userData.value).then(() => {
            swal("Registration successful, you are redirected to login page.");
            router.push({ name: "LoginPage" });
          });
        }
      });
  } else {
    swal("Please fill in the required fields!!!");
  }
};
</script>
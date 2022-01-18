<template>
  <div class="accountInfo">
    <div class="accountInfoHeader">
      <h3>Delete Account</h3>
    </div>
    <div class="accountInfoBody">
      <p>If you delete your account all your records are gone!!!</p>
      <button @click="deleteAccount" class="deleteAccountBtn" type="Button">
        Delete My Account
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import swal from "sweetalert";

const router = useRouter();
const store = useStore();

const deleteAccount = () => {
  axios
    .get(
      `http://localhost:3000/itemList?userId=${store.getters._getCurrentUser.id}`
    )
    .then((get_response) => {
      if (confirm("Are you sure you want to delete your account?")) {
        if (get_response.data.length > 0) {
          swal("First you should delete all your list items!!!");
        } else {
          axios.delete(
            `http://localhost:3000/users/${store.getters._getCurrentUser.id}`
          );
          swal("Your account has been successfully deleted.");
          store.commit("setUser", null);
          router.push({ name: "LoginPage" });
        }
      } else {
        console.log(
          "Account deletion has been cancelled.You are redirected to the login page."
        );
      }
    });
};
</script>

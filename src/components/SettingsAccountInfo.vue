<template>
  <div class="accountInfo">
    <div class="accountInfoHeader">
      <h3>Account Information</h3>
    </div>
    <div class="accountInfoBody">
      <table>
        <tr>
          <td>Username</td>
          <td>:</td>
          <td>{{ store.getters._getCurrentUser.userName }}</td>
        </tr>
        <tr>
          <td>Password</td>
          <td>:</td>
          <td v-if="showPass">
            {{ store.getters._getCurrentUser.password }}
            <i @click="showPass = !showPass" class="far fa-eye-slash"></i>
          </td>
          <td v-else>
            ***** <i class="far fa-eye" @click="showPass = !showPass"></i>
          </td>
        </tr>
        <tr>
          <td>ID</td>
          <td>:</td>
          <td>{{ store.getters._getCurrentUser.id }}</td>
        </tr>
      </table>
      <div>
        <button
          @click="changePassShowBtn = !changePassShowBtn"
          type="button"
          class="changePassShowBtn"
        >
          Change Password
        </button>
        <div v-show="changePassShowBtn">
          <form>
            <input
              v-model="oldPass"
              type="text"
              class="input-box"
              placeholder="Old Password"
              required
            />
            <input
              v-model="newPass"
              type="text"
              class="input-box"
              placeholder="New Password"
              required
            />
          </form>
          <div class="btnDiv">
            <button @click="changePass" type="button" class="changePassBtn">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { ref } from "vue";
import swal from "sweetalert";
import axios from "axios";

const store = useStore();

const showPass = ref(false);
const changePassShowBtn = ref(false);

const oldPass = ref("");
const newPass = ref("");
const changePass = () => {
  if (oldPass.value.length > 0 && newPass.value.length > 0) {
    if (oldPass.value === store.getters._getCurrentUser.password) {
      axios.patch(
        `http://localhost:3000/users/${store.getters._getCurrentUser.id}`,
        { password: newPass.value }
      );
      store.commit("setUser", {
        ...store.getters._getCurrentUser,
        password: newPass.value,
      });
      swal("Your password has been updated.");
      oldPass.value = "";
      newPass.value = "";
    } else {
      swal("The old password you entered does not match!!!");
    }
  } else {
    swal("Please fill in the blanks!!!");
  }
};
</script>
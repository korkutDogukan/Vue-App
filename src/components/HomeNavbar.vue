<template>
  <div class="homeNavbar">
    <p class="homeIcon"><i class="fas fa-network-wired"></i></p>
    <p @click="goSettings" class="homeSettings">
      <i class="fas fa-users-cog"></i>
    </p>
    <button @click="logout" class="logoutBtn">Logout</button>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const goSettings = () => {
  setTimeout(() => {
    router.push({ name: "SettingsPage" });
  }, 200);
};

const logout = () => {
  store.commit("setUser", null);
  setTimeout(() => {
    router.push({ name: "LoginPage" });
  }, 500);
};
</script>
<template>
  <div class="listNavbar">
    <p class="listIcon"><i class="fas fa-money-bill"></i> EXCHANGE</p>
    <button class="homeBtn" @click="goHome">
      <i class="fas fa-home"></i> Home
    </button>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  setTimeout(() => {
    router.push({ name: "HomePage" });
  }, 150);
};
</script>

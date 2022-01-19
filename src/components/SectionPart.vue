<template>
  <div class="row">
    <div class="col">
      <h1>MultiApp</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nulla
        saepe, ex dignissimos dicta eum autem minus reiciendis, amet natus
        molestiae, quia iure maxime voluptates unde! Quidem quis nobis saepe!
      </p>
    </div>
    <div class="col">
      <div @click="goList" class="sectionCard card-1">
        <h3>List</h3>
      </div>
      <div @click="goFastTyping" class="sectionCard card-2">
        <h3>FastTyping</h3>
      </div>
      <div class="sectionCard card-3">
        <h3>List App</h3>
      </div>
      <div class="sectionCard card-4">
        <h3>List App</h3>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goFastTyping = () => {
  setTimeout(() => {
    router.push({ name: "FastTypingPage" });
  }, 150);
};

const goList = () => {
  setTimeout(() => {
    router.push({ name: "ListPage" });
  }, 150);
};
</script>

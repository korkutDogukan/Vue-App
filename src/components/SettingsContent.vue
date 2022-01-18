<template>
  <div class="settingsContent">
    <div class="row">
      <div class="col">
        <SettingsAccountInfo></SettingsAccountInfo>
      </div>
      <div class="col">
        <SettingsAccountDelete></SettingsAccountDelete>
      </div>
    </div>
  </div>
</template>
<script setup>
import SettingsAccountInfo from "@/components/SettingsAccountInfo";
import SettingsAccountDelete from "@/components/SettingsAccountDelete";
</script>
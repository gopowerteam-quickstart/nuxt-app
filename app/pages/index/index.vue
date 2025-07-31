<script setup lang="ts">
const appStore = useStore()
</script>

<template>
  <div>
    <div>
      index page: {{ appStore.app.name }}
    </div>
    <button @click="() => appStore.app.updateName(`${appStore.app.name}x`)">
      +++
    </button>
    <button @click="() => appStore.app.updateName(`${appStore.app.name.slice(0, -1)}`)">
      ---
    </button>
  </div>
</template>

<style scoped>

</style>

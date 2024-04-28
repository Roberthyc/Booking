<script setup lang="ts">
import { ref } from 'vue'

const isMobile = ref()
</script>

<template>
  <slot v-if="!isMobile" />

  <div class="result-container" v-else>请在手机上浏览</div>
</template>

<style lang="less" scoped>
.result-container {
  width: 100%;
  min-height: var(--app-height);
  display: flex;
  justify-content: center;
  align-items: center;
}

.result {
  width: 40%;
  min-width: 375px;
}
</style>

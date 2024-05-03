<script setup lang="ts">
import signIn from '@/stacks/sign-in.vue';
import { useGlobalStore } from '@/store';
const global=useGlobalStore()
let search= window.location.search
let userMsg=JSON.parse(decodeURI(search).split('?')[1])
global.userMsg=userMsg
</script>

<template>
  <slot v-if="!userMsg.openid" /> 
  <signIn v-else :user-msg="userMsg"/>
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

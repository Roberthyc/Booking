<script setup lang="ts">
const systemValue = ref(false)
const userValue = ref(false)

function userValueChange(e: any){
  console.log(e)
}
function systemValueChange(e:any){
  console.log(e)
}
</script>

<template>
  <router-stack>
    <div class="settings">
      <app-header :title="$t('Settings')">
        <template #left>
          <app-back />
        </template>
      </app-header>

      <div class="settings-list">
        <var-cell title="系统管理权限">
          <template #icon>
            <var-icon class="settings-icon" size="6vmin" name="image" />
          </template>
          <template #extra>
            <var-switch class="settings-switch" size="5.2vmin" v-model="systemValue" @change="systemValueChange"/>
          </template>
        </var-cell>
        <var-cell title="用户管理权限">
          <template #icon>
            <var-icon class="settings-icon" size="6vmin" name="image" />
          </template>
          <template #extra>
            <var-switch class="settings-switch" size="5.2vmin" v-model="userValue" @change="userValueChange"/>
          </template>
        </var-cell>
      </div>
    </div>
  </router-stack>
</template>

<style lang="less" scoped>
.settings {
  --cell-padding: 16px 12px;
  padding: var(--app-bar-height) 0 0;

  &-list {
    padding: 10px 0;
  }

  &-icon,
  &-slider-icon {
    margin-right: 20px;
    margin-left: 8px;
  }

  &-slider-icon {
    margin-bottom: 10px;
  }

  &-switch {
    margin-right: 4px;
  }
}
</style>

<script setup lang="ts">

const active = ref(0)
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
        <var-tabs elevation item-direction="vertical" color="var(--color-primary)" active-color="#ffffff"
          inactive-color="#ffffff" v-model:active="active">
          <var-tab  >
            <var-icon class="tabs-example-icon" name="account-circle" />
            <div>用户管理</div>
          </var-tab>
          <var-tab >
            <var-icon class="tabs-example-icon" name="message-text-outline" />
            <div>会议管理</div>
          </var-tab>
        </var-tabs>

        <var-tabs-items v-model:active="active">
    <var-tab-item>
      <card />
    </var-tab-item>
    <var-tab-item>
      <room-management/>
    </var-tab-item>
  </var-tabs-items>
      </div>
    </div>
  </router-stack>
</template>

<style lang="less" scoped>
.settings {
  --cell-padding: 16px 12px;
  padding: var(--app-bar-height) 0 0;

  &-list {
    padding: 0px 0;
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

.tabs-example-icon {
  margin-bottom: 5px;
}
</style>

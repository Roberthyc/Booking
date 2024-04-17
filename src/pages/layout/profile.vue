<script setup lang="ts">
import { ref } from 'vue'
const isRefresh = ref(false)

function handleRefresh() {
  isRefresh.value = false
}
const loading = ref(false)
const finished = ref(false)
const list = ref([1, 2, 3])
const floating = ref(false)
const active = ref(0)
function load() {
  setTimeout(() => {
    loading.value = false
    finished.value = true
  }, 1000)
}

</script>

<template>
  <div class="profile">
    <var-pull-refresh v-model="isRefresh" @refresh="handleRefresh">
      <app-header>
        <template #left>
          <app-side-menu />
        </template>
        <template #right>
          <app-locale-switch />
          <app-theme-switch />
        </template>
        <template #content>
          <div class="profile-header-content">
            <div class="profile-user">
              <var-avatar class="profile-user-avatar" src="@/assets/images/avatar.jpg" size="22vmin" bordered />
              <div class="profile-user-suffix">
                <div class="profile-user-name">{{ $t('Your Name') }}</div>
                <var-space class="profile-user-extra" :size="[0, '1.6vmin']">
                  <span>{{ $t('Male') }}</span>
                  <span>/</span>
                  <span>100 {{ $t('Followers') }}</span>
                  <span>/</span>
                  <span>49 {{ $t('Likes') }}</span>
                </var-space>
              </div>
            </div>

          </div>
        </template>
      </app-header>
      <var-tabs v-model:active="active">
        <var-tab>用户权限管理</var-tab>
        <var-tab>系统权限管理</var-tab>
      </var-tabs>

      <var-tabs-items v-model:active="active">
        <var-tab-item>
          <var-list :finished="finished" v-model:loading="loading" @load="load">
            <var-space class="room-list" direction="column" size="large" justify="center" floating>
              <var-card class="card" v-for="item in list" :key="item" outline :floating-duration="650"
                v-model:floating="floating">
                <template #title @click="floating = true">
                  <text style="font-weight: bolder; font-size: x-large"> 2212 </text>
                </template>
                <template #description>
                  <var-divider dashed />
                  <var-space justify="space-between">
                    <var-space direction="column">
                      <var-space>
                        <var-button size="mini">预约时间：2024.1.31——2024.2.5</var-button>
                      </var-space>
                      <var-space>
                        <var-icon name="account-circle" />
                        <var-button size="mini">申请人：张三</var-button>
                      </var-space>
                    </var-space>
                    <var-button type="primary">
                      通过
                    </var-button>
                    <var-button type="primary">
                      否决
                    </var-button>
                  </var-space>
                </template>
                <template #extra> </template>
                <template #floating-content>
                  <var-divider dashed />
                  <div class="card-example-text">
                    <time-grid />
                  </div>
                </template>
              </var-card>
            </var-space>
          </var-list>
        </var-tab-item>
        <var-tab-item>
          <var-list :finished="finished" v-model:loading="loading" @load="load">
            <var-space class="room-list" direction="column" size="large" justify="center" floating>
              <var-card class="card" v-for="item in list" :key="item" outline :floating-duration="650"
                v-model:floating="floating">
                <template #title @click="floating = true">
                  <var-icon name="account-circle" />
                  <text style="font-weight: bolder; font-size: x-large"> 申请人：张三 </text>
                </template>
                <template #description>
                  <var-divider dashed />
                  <var-space justify="space-between">
                    <var-space direction="column">
                      <var-space>
                        <var-button size="normal">电话号码：164898984</var-button>
                      </var-space>
                      <var-space>
                        <var-button size="normal">学号：S231231024</var-button>
                      </var-space>
                    </var-space>
                    <var-button type="primary">
                      通过
                    </var-button>
                    <var-button type="primary">
                      否决
                    </var-button>
                  </var-space>
                </template>
                <template #extra> </template>
                <template #floating-content>
                  <var-divider dashed />
                  <div class="card-example-text">
                    <time-grid />
                  </div>
                </template>
              </var-card>
            </var-space>
          </var-list>
        </var-tab-item>
      </var-tabs-items>

    </var-pull-refresh>

    <var-fab type="primary" right="5vmin" bottom="20vmin"
      :drag="{ boundary: { left: '2vmin', right: '2vmin', top: '55vmin', bottom: '15vmin' } }">
      <var-button class="action" type="primary" round>
        <var-icon name="phone" />
      </var-button>
      <var-button class="action" type="primary" round>
        <var-icon name="star" />
      </var-button>
      <var-button class="action" type="primary" round>
        <var-icon name="heart" />
      </var-button>
    </var-fab>
  </div>

  <router-stack-view />
</template>

<style lang="less" scoped>
.profile {
  --profile-header-height: 155px;
  --avatar-border: 3px solid #fff;
  padding-top: calc(var(--profile-header-height));

  --date-picker-border-radius: 0;
  --card-padding: 5px;
  --card-footer-margin: 0;
  --card-title-margin: 0;
  --badge-icon-size: 8px;

  &-user {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 104px;

    &-suffix {
      margin-left: 14px;
    }

    &-name {
      font-size: 24px;
    }

    &-avatar {
      flex-shrink: 0;
    }

    &-extra {
      padding-top: 10px;
      color: #ccc;
      font-size: 14px;
      align-items: baseline;
    }
  }

}

.room-list {
  padding: 0 10px;
}

.var-badge--default {
  height: 10px !important;
}
</style>

<route>
  {
    meta: {
      stacks: [
        {
          name: 'sign-in',
          children: [
            {
              name: 'sign-up'
            },
            {
              name: 'forgot-password'
            }
          ]
        },
        {
          name: 'sign-up'
        },
        {
          name: 'settings'
        }
      ]
    }
  }
</route>

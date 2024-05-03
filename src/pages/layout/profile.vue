<script setup lang="ts">
import { ref } from 'vue'
import fetchData from '@/utils/fetchData';
import { useGlobalStore } from '@/store';
const global=useGlobalStore()
const {URL}=global
const systemAuthorityUrl=URL+'/userList'//需要审核的注册用户列表
const changeStatusUrl=URL+'/changeStatus'
const isRefresh = ref(false)
const loading = ref(false)
const finished = ref(false)
const list=ref([1,2,3])
const systemAuthorityList = ref([])
const floating = ref(false)
const active = ref(0)
const show = ref(false)
const msg=ref('')

function handleClick(userId:Number,auditStatus:String){
  fetchData(changeStatusUrl,'post',{
    auditStatus,
    userId
  }).then((result)=>{
    msg.value=result.msg;
    show.value=true;
  })

} 

function handleRefresh() {
  fetchData(systemAuthorityUrl,'get').then(r=>r.json()
  ).then(r=>{
    systemAuthorityList.value=r.rows
    isRefresh.value = false
    console.log(systemAuthorityList);
  })
 
}

function load() {
  setTimeout(() => {
    loading.value = false
    finished.value = true
  }, 1000)
}

onMounted(()=>{
  handleRefresh();
})

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
          <var-snackbar type="info" v-model:show="show">{{ msg }}</var-snackbar>
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
        <var-tab>会议室申请</var-tab>
        <var-tab>系统权限申请</var-tab>
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
                    <var-button type="primary" >
                      通过
                    </var-button>
                    <var-button type="primary" >
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
              <var-card class="card" v-for="item in systemAuthorityList" :key="item" outline :floating-duration="650"
                v-model:floating="floating">
                <template #title @click="floating = true">
                  <var-icon name="account-circle" />
                  <text style="font-weight: bolder; font-size: x-large"> 申请人：{{item.realName}} </text>
                </template>
                <template #description>
                  <var-divider dashed />
                  <var-space justify="space-between">
                    <var-space direction="column">
                      <var-space>
                        <var-button size="normal">学号：{{item.userNo}}</var-button>
                      </var-space>
                    </var-space>
                    <var-button type="primary" @click="handleClick(item.userId,'0')">
                      通过
                    </var-button>
                    <var-button type="primary" @click="handleClick(item.userId,'1')">
                      否决
                    </var-button>
                  </var-space>
                </template>
                <template #extra>
          
               </template>
              </var-card>
            </var-space>
          </var-list>
        </var-tab-item>
      </var-tabs-items>

    </var-pull-refresh>
<!-- 
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
    </var-fab> 悬浮按钮-->
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
        },
        {
          name: 'user-management'
        }
      ]
    }
  }
</route>

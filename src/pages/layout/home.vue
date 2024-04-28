<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGlobalStore } from '@/store'
import fengeUrl from '@/assets/images/分割.png'
import fetchData from '@/utils/fetchData'
const active = ref('card')
const isRefresh = ref(false)
const loading = ref(false)
const finished = ref(false)
const current = ref()
const history = ref()
const timeReg = /(?<=-)\d{2}-\d{2}/g
const dateReg = /\d{2}:\d{2}/g
const store = useGlobalStore()
const imgPreview = ref(false)
const { studentID, URL } = store
const { today } = storeToRefs(store)
const noticeValue = ref(['1'])
const expand = ref(true)
const endOfListMarker = ref(null)
const endOfListMarker2 = ref(null)
const currentUrl = `${URL}/activities?userNo=${studentID}`
const historyUrl = `${URL}/historyActivities?userNo=${studentID}`
const imgUrl = `http://113.250.189.122:8090/api/wechat/generate?qrText=S231231095`
let observer: IntersectionObserver

async function handleRefresh() {
  fetchList().then(() => (isRefresh.value = false))
}

function handleNoticeChange(val: any) {}

function imagePreview() {
  imgPreview.value = true
}

async function load() {
  loading.value = true
  fetchList().then(() => {
    loading.value = false

    finished.value = true
  })
}

async function fetchList() {
  return Promise.all([fetchData(currentUrl), fetchData(historyUrl)]).then((response) => {
    response.map(async (value: { rows: any; json: () => any; url: string }) => {
      if (value.url === currentUrl) {
        value = await value.json()
        current.value = value.rows
      } else {
        value = await value.json()
        history.value = value.rows
      }
    })
  })
}

onMounted(async () => {
  fetchList()
  observer = new IntersectionObserver((entries) => {
    // entries 是一个包含所有被观察元素的数组
    // 在本例中我们只观察一个元素，因此 entries 的长度为1
    const entry = entries[0]
    if (entry.isIntersecting) {
      // 当滚动容器底部进入视口时触发的操作
      load()
    }
  })

  // 将滚动容器底部的标记元素添加到观察列表中
  observer.observe(endOfListMarker.value)
  observer.observe(endOfListMarker2.value)
})

onBeforeUnmount(() => {
  observer.disconnect()
})
</script>

<template>
  <div class="home">
    <app-header
      >.0.
      <template #left>
        <app-side-menu />
      </template>
      <template #right>
        <app-locale-switch />
        <app-theme-switch />
      </template>
      <template #content>
        <var-tabs color="transparent" active-color="#fff" inactive-color="#ddd" v-model:active="active">
          <var-tab name="card">{{ $t('QR') }}</var-tab>
          <var-tab name="plainCard">{{ $t('历史会议') }}</var-tab>
        </var-tabs>
      </template>
    </app-header>
    <var-overlay v-model:show="imgPreview">
      <div class="overlay-content" @click.stop>
        <var-image width="300px" height="300px" :src="imgUrl" @click="imagePreview" />
      </div>
    </var-overlay>
    <var-pull-refresh v-model="isRefresh" @refresh="handleRefresh">
      <var-tabs-items v-model:active="active">
        <var-tab-item class="home-tab-item" name="card" style="display: flex; flex-direction: column">
          <var-space class="home-tab-item-space" direction="column" size="large" align="center">
            <var-collapse-transition :expand="expand">
              <var-image width="200px" height="200px" :src="imgUrl" @click="imagePreview" />
            </var-collapse-transition>
            <var-button type="primary" color="var(--color-primary)" @click="expand = !expand"
              >请扫身份码进入会议室</var-button
            >
          </var-space>
          <div style="flex: 1">
            <div style="display: flex; flex-direction: column; height: 300px; overflow-y: auto">
              <var-list :finished="finished" v-model:loading="loading" @load="load">
                <var-space direction="column" v-for="(item, index) in current" :key="index">
                  <div style="display: flex; align-items: center">
                    <div style="flex: 1">
                      <div style="font-size: small">{{ item.startTime.match(timeReg)[0] }}</div>
                      <div style="font-size: x-large">{{ item.startTime.match(dateReg)[0] }}</div>
                    </div>
                    <div style="flex: 1; align-items: flex-start">
                      <VarImage :src="fengeUrl" width="10px" />
                    </div>
                    <div style="flex: 4">
                      <div style="font-size: large">{{ item.displayTitle }}</div>
                      <div style="font-size: small; text-align: right">
                        <var-icon name="map-marker-radius-outline" />
                        {{ item.roomName }}
                      </div>
                    </div>
                  </div>
                </var-space>
                <div ref="endOfListMarker"></div>
              </var-list>
            </div>
          </div>
          <var-collapse v-model="noticeValue" @change="handleNoticeChange">
            <var-collapse-item title="会议通知：" name="1">今晚组会临时取消！</var-collapse-item>
          </var-collapse>
        </var-tab-item>
        <var-tab-item class="home-tab-item" name="plainCard">
          <div style="flex: 1">
            <div style="display: flex; flex-direction: column; height: 300px; overflow-y: auto">
              <var-list :finished="finished" v-model:loading="loading" @load="load">
                <var-space direction="column" v-for="(item, index) in history" :key="index">
                  <div style="display: flex; align-items: center">
                    <div style="flex: 1">
                      <div style="font-size: small">{{ item.startTime.match(timeReg)[0] }}</div>
                      <div style="font-size: x-large">{{ item.startTime.match(dateReg)[0] }}</div>
                    </div>
                    <div style="flex: 1; align-items: flex-start">
                      <VarImage :src="fengeUrl" width="10px" />
                    </div>
                    <div style="flex: 4">
                      <div style="font-size: large">{{ item.displayTitle }}</div>
                      <div style="font-size: small; text-align: right">
                        <var-icon name="map-marker-radius-outline" />
                        {{ item.roomName }}
                      </div>
                    </div>
                  </div>
                </var-space>
                <div ref="endOfListMarker2"></div>
              </var-list>
            </div>
          </div>
        </var-tab-item>
      </var-tabs-items>
    </var-pull-refresh>
  </div>

  <router-stack-view />
</template>

<style lang="less" scoped>
:root {
  --divider-color: rgba(0, 0, 0, 0.6);
}

.home {
  --home-header-height: 98px;
  padding: calc(var(--home-header-height) + 16px) 14px 16px;

  &-tab-item {
    min-height: calc(var(--app-height) - 190px);
  }

  &-tab-item-space {
    padding: 4px;
  }
}

.var-overlay {
  background-color: #929292;
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
          name: 'detail'
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
: any: any[]: (arg0: any) => any: any: any[]: { startTime: number; }: any: any[]: { startTime: number; }

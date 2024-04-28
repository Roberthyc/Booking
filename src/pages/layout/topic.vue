<script setup lang="ts">
import { useGlobalStore, useBookStore } from '@/store'
import fetchData from '@/utils/fetchData'
const datePickerModel = new Date().toISOString().replace(/T.*$/, '')
const global = useGlobalStore()
const book = useBookStore()
const { bookMeetingRoom } = storeToRefs(book)
const isRefresh = ref(false)
const { date } = storeToRefs(global)
const selectDate = ref(datePickerModel)
const loading = ref(false)
const finished = ref(false)
let listData: any = ref([])
const floating = ref(false)
const { URL } = global
const url = `${URL}/freeRoomsByDate?dateTime=`

async function handleRefresh() {
  let url2 = url + selectDate.value
  listData.value = (await (await fetchData(url2)).json()).rows
  isRefresh.value = false
}

function load() {
  loading.value = false
  finished.value = true
}
function dateChange(e: any) {
  selectDate.value = e
  handleRefresh()
}

async function onBookButton(item: any) {
  bookMeetingRoom.value.roomId = item.roomId
  bookMeetingRoom.value.roomName = item.roomName
  date.value = selectDate.value
  floating.value = true
}

onMounted(async () => {
  let url2 = url + datePickerModel
  listData.value = (await (await fetchData(url2)).json()).rows
})
</script>
<template>
  <div class="topic">
    <var-pull-refresh v-model="isRefresh" @refresh="handleRefresh">
      <app-header>
        <template #left>
          <app-side-menu />
        </template>
        <template #right>
          <app-locale-switch />
          <app-theme-switch />
        </template>
      </app-header>

      <var-date-picker v-model="datePickerModel" :on-change="dateChange" />

      <var-list :finished="finished" v-model:loading="loading" @load="load">
        <var-space class="room-list" direction="column" size="large" justify="center" floating>
          <var-card
            class="card"
            outline
            :floating-duration="650"
            v-model:floating="floating"
            v-for="(item, key) in listData"
            :item="item"
            :key="key"
          >
            <template #title>
              <text style="font-weight: bolder; font-size: x-large"> {{ item.roomName }} </text>
            </template>
            <template #description>
              <var-divider dashed />
              <var-space justify="space-between">
                <var-space direction="column">
                  <var-space direction="row">
                    <var-button
                      size="mini"
                      v-for="detailItem in item.srwDeviceList"
                      :item="item"
                      :key="detailItem.deviceCode"
                    >
                      {{ detailItem.deviceName }}
                    </var-button>
                  </var-space>
                  <var-space>
                    <var-icon name="account-circle" />
                    <text style="font-size: small">容量：{{ item.capacity }}人</text>
                  </var-space>
                </var-space>

                <var-tooltip v-if="item.isApproval">
                  <var-button type="primary" @click="onBookButton(item)">预约</var-button>
                </var-tooltip>

                <var-tooltip v-else content="该会议室需要审核">
                  <var-button
                    class="check-button"
                    type="primary"
                    @click="onBookButton(item)"
                    style="padding-right: 3.4px"
                  >
                    <template #default>
                      预约
                      <var-icon name="information-outline" size="12" />
                    </template>
                  </var-button>
                </var-tooltip>
              </var-space>
            </template>

            <template #floating-content>
              <var-divider dashed />
              <div class="card-example-text">
                <time-grid />
              </div>
            </template>
          </var-card>
        </var-space>
      </var-list>
    </var-pull-refresh>
  </div>
  <router-stack-view />
</template>

<style lang="less" scoped>
.topic {
  padding: calc(var(--app-bar-height)) 0 0;
  --date-picker-border-radius: 0;
  --card-padding: 5px;
  --card-footer-margin: 0;
  --card-title-margin: 0;
  --badge-icon-size: 8px;

  &-item {
    display: flex;
    align-items: center;

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      margin-right: 15px;
    }

    &-active {
      color: var(--color-primary);
    }

    &-child {
      padding: 0 7px;
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

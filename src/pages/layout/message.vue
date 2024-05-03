<script setup lang="ts">
import { useBookStore, useGlobalStore } from '@/store'
import fetchData from '@/utils/fetchData'
const store = useGlobalStore()
const book = useBookStore()
const { studentID, URL } = store
const { bookMeetingRoom } = storeToRefs(book)
const buildingsUrl = `${URL}/buildings`
const roomsUrl = `${URL}/rooms?buildingId=`
const isRefresh = ref(false)
const location = ref<any>('选择会议室')
const columns = <any>[]
function handleRefresh() {
  isRefresh.value = false
}
async function picker() {
  const { state, texts, indexes } = await Picker({
    cascade: true,
    columns: columns,
    onConfirm(values, indexes) {
      //Snackbar(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
      bookMeetingRoom.value.roomId = columns[indexes[0]].children[indexes[1]].roomId
      bookMeetingRoom.value.roomName = values.pop()
    }
  })
}

onMounted(async () => {
  let value = (await (await fetchData(buildingsUrl)).json()).rows

  for (let item of value) {
    let roomsObject = <any>{ text: item.buildingName, children: [] }
    let url = roomsUrl + item.buildingId
    let rooms = (await (await fetchData(url)).json()).rows
    for (let room of rooms) {
      let roomObject = { text: room.roomName, roomId: room.roomId }
      roomsObject.children.push(roomObject)
    }
    columns.push(roomsObject)
  }
})
</script>

<template>
  <div class="message">
    <app-header>
      <template #left>
        <app-side-menu />
      </template>
      <template #right>
        <app-locale-switch />
        <app-theme-switch />
      </template>
    </app-header>

    <var-button type="primary" elevation="false" block @click="picker">
      <template #default>
        <var-button type="primary" outline style="border-color: rgba(199, 198, 198, 0.377)">
          {{ bookMeetingRoom.roomName ? bookMeetingRoom.roomName : location }}
        </var-button>
      </template>
    </var-button>

    <time-grid style="margin-bottom: 50px" />
  </div>

  <router-stack-view />
</template>

<style lang="less" scoped>
.message {
  padding: calc(var(--app-bar-height)) 0 0;
}

.var-button {
  border-radius: 0;
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

<script setup lang="ts">
import { useGlobalStore, useBookStore } from '../store'
import fetchData from '../utils/fetchData'
import { ref, onMounted } from 'vue'
const datePickerModel = new Date().toISOString().replace(/T.*$/, '')
const global = useGlobalStore()
const loading = ref(false)
const finished = ref(false)
let listData: any = ref([])
const floating = ref(false)
const { URL } = global
const url = `${URL}/freeRoomsByDate?dateTime=`
const startUsingValue = ref(false)
const checkValue = ref(false)

function userValueChange(e: any) {
    console.log(e)
}
function systemValueChange(e: any) {
    console.log(e)
}
function load() {
    loading.value = false
    finished.value = true
}

onMounted(async () => {
    let url2 = url + datePickerModel
    listData.value = (await (await fetchData(url2)).json()).rows
})
</script>

<template>
    <router-stack>
        <div class="settings">
            <app-header>
                <template #left>
                    <app-back />
                </template>
            </app-header>

            <div class="settings-list">
                <var-list :finished="finished" v-model:loading="loading" @load="load">
                    <var-space class="room-list" direction="column" size="large" justify="center" floating>
                        <var-card class="card" outline :floating-duration="650" v-model:floating="floating"
                            v-for="(item, key) in listData" :item="item" :key="key">
                            <template #title>
                                <text style="font-weight: bolder; font-size: x-large"> {{ item.roomName }} </text>
                            </template>
                            <template #description>
                                <var-divider dashed />
                                <var-space justify="space-between">
                                    <var-space direction="column">
                                        <var-space direction="row">
                                            <var-button size="mini" v-for="detailItem in item.srwDeviceList"
                                                :item="item" :key="detailItem.deviceCode">
                                                {{ detailItem.deviceName }}
                                            </var-button>
                                        </var-space>
                                        <var-space>
                                            <var-icon name="account-circle" />
                                            <text style="font-size: small">容量：{{ item.capacity }}人</text>
                                        </var-space>
                                    </var-space>
                                    <var-space direction="column">
                                        <var-cell title="会议室启用">
                                            <template #extra>
                                                <var-switch class="settings-switch" size="5.2vmin" v-model="startUsingValue"
                                                    @change="systemValueChange" />
                                            </template>
                                        </var-cell>
                                        <var-cell title="会议室是否需要审核">
                                            <template #extra>
                                                <var-switch class="settings-switch" size="5.2vmin" v-model="checkValue"
                                                    @change="systemValueChange" />
                                            </template>
                                        </var-cell>
                                    </var-space>
                                </var-space>
                            </template>
                        </var-card>
                    </var-space>
                </var-list>
        
            </div>
        </div>
    </router-stack>
</template>

<style lang="less" scoped>
.settings {
    --cell-padding:0px;
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


.room-list {
    padding: 0 10px;
}

.var-badge--default {
    height: 10px !important;
}
</style>

<script setup lang="ts">
import { Form } from '@varlet/ui'
import { validateNotEmpty } from '@/utils/validate'
import fetchData from '@/utils/fetchData'
import { sessionStorage } from '@/utils/storage'
import { useGlobalStore } from '@/store'
const globalstore = useGlobalStore
const { WXURL } = globalstore()
const form = ref<Form>()
const center = ref(false)
const isViewPassword = ref(false)
const account = reactive({
  username: '',
  password: ''
})

const props = defineProps(['userMsg'])

async function submit() {
  const valid = await form.value?.validate()
  if (valid) {
    await fetchData(WXURL, 'post', {
      "code": "",
      "openId": props.userMsg.openid,
      "password": "admin123",
      "phonenumber": "",
      "realName": account.username,
      "userNo": account.password,
      "username": "",
      "uuid": ""
    }).then(x =>{
      center.value=true
      Snackbar.success(x.msg)
    });
    
    // sessionStorage.set('token', data.token)
    
  }
}
</script>

<template>
  <router-stack>
    <div class="sign-in">
    <var-popup v-model:show="center" :close-on-click-overlay='false'>
    <div class="popup-example-block">
      请等待管理员审核通过
    </div>
  </var-popup>
      <var-image src="@/assets/images/logo.svg" width="24vmin" height="24vmin" />

      <var-form ref="form" class="sign-in-form">
        <var-space direction="column" :size="['8vmin', 0]">
          <var-input variant="outlined" :placeholder="$t('Please input {field}', { field: $t('username') })"
            :rules="[validateNotEmpty()]" v-model="account.username">
            <template #prepend-icon>
              <var-icon class="sign-in-form-input-icon" name="account-circle" />
            </template>
          </var-input>
          <var-input variant="outlined" :placeholder="$t('Please input {field}', { field: $t('password') })"
            :rules="[validateNotEmpty()]" :type="isViewPassword ? 'text' : 'password'" v-model="account.password">
            <template #prepend-icon>
              <var-icon class="sign-in-form-input-icon" name="lock" />
            </template>
            <template #append-icon>

            </template>
          </var-input>


          <var-button type="primary" block size="large" auto-loading @click="submit">{{ $t('提交') }}</var-button>
          <var-space class="sign-in-form-text" justify="center">
            {{ $t('第一次使用，需要审核信息') }}
          </var-space>
        </var-space>
      </var-form>
    </div>
  </router-stack>
</template>

<style lang="less" scoped>
.sign-in {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: calc(80px + var(--app-bar-height)) 0 60px;

  &-form {
    width: 280px;
    margin-top: 50px;

    &-input-icon {
      margin-right: 10px;
      font-size: 24px;
    }

    &-text {
      font-size: 14px;
      color: var(--color-primary);
    }
  }
}
.popup-example-block {
  padding: 24px;
  width: 280px;
}
</style>

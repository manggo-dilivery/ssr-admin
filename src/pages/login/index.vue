<template>
  <div class="login-container">
    <div class="login-weaper">
      <div class="login-left">
        <img class="img" src="@/assets/img/logo.png" alt="">
        <p class="title">企业级开发平台</p>
      </div>
      <div class="login-border">
        <div class="login-main">
          <h4 class="login-title">
            登录
          </h4>
          <userLogin></userLogin>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import website from '@/config/website'
  import userLogin from "./userLogin";
  export default {
    name: "login",
    components: {
      userLogin
    },
    data() {
      return{
        website,
        time: ''
      }
    },
    methods: {
      asd() {
        console.log('1233123')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

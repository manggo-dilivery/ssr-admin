<template>
  <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="loginForm"
           :model="loginForm"
           style="height: 350px"
           label-width="0">
    <el-form-item prop="tenantId">
      <div class="userloginItem">
        <svg-icon icon-class="tenantKey"></svg-icon>
        <el-input size="small"
                  @keyup.enter.native="handleLogin"
                  v-model="loginForm.tenantId"
                  auto-complete="off"
                  placeholder="请输入租户ID">
        </el-input>
      </div>
    </el-form-item>
    <el-form-item prop="username">
      <div class="userloginItem">
        <svg-icon icon-class="username"></svg-icon>
        <el-input size="small"
                  @keyup.enter.native="handleLogin"
                  v-model="loginForm.username"
                  auto-complete="off"
                  placeholder="请输入用户名">
        </el-input>
      </div>
    </el-form-item>
    <el-form-item prop="password">
      <div class="userloginItem">
        <svg-icon icon-class="password"></svg-icon>
        <el-input size="small"
                  @keyup.enter.native="handleLogin"
                  type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="请输入密码">
        </el-input>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 size="small"
                 @click.native.prevent="handleLogin"
                 class="login-submit">登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  // import {mapGetters} from "vuex";
  // import {info} from "@/api/system/tenant";
  // import {getCaptcha} from "@/api/user";
  // import {getTopUrl} from "@/util/util";

  export default {
    name: "userLogin",
    data() {
      return {
        loginForm: {
          //租户ID
          tenantId: "000000",
          //用户名
          username: "admin",
          //密码
          password: "admin"
        },
        loginRules: {
          tenantId: [
            {required: false, message: "请输入租户ID", trigger: "blur"}
          ],
          username: [
            {required: true, message: "请输入用户名", trigger: "blur"}
          ],
          password: [
            {required: true, message: "请输入密码", trigger: "blur"},
            {min: 1, message: "密码长度最少为6位", trigger: "blur"}
          ]
        }
      };
    },
    mounted() {

    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            // const loading = this.$loading({
            //   lock: true,
            //   text: '登录中,请稍后。。。',
            //   spinner: "el-icon-loading"
            // });
            this.$store.dispatch("user/LoginByUsername", this.loginForm).then(() => {
              this.$router.push({path: '/'});
              // loading.close();
            }).catch(() => {
              // loading.close();
              // this.refreshCode();
            });
          }
        });
      }
    }
  };
</script>

<style>
  .userloginItem{
    display: flex;align-items: center;
    border-bottom: 1px solid #ebedf2;
    height: 41px !important;
  }
</style>

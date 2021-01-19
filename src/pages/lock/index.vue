<template>
  <div class="lock-container">
    <div class="lock-form">
      <div class="animated"
           :class="{'shake':passwdError,'bounceOut':pass}">
        <h3 class="title">{{userInfo.username}}</h3>
        <el-input placeholder="请输入登录密码"
                  type="password"
                  class="input-with-select animated"
                  v-model="passwd"
                  @keyup.enter.native="handleLogin">
          <el-button slot="append"
                     icon="el-icon-right"
                     @click="handleLogin"></el-button>
          <el-button slot="append"
                     icon="el-icon-switch-button"
                     @click="handleLogout"></el-button>
        </el-input>
      </div>

    </div>
  </div>
</template>
<script>
import {getStore} from "@/util/store";

export default {
  name: "lock",
  data() {
    return {
      passwd: "",
      passwdError: false,
      pass: false,
      lockPasswd: ''
    };
  },
  created() {},
  mounted() {
    this.lockPasswd = getStore({name: 'lockPasswd'})
    if (this.lockPasswd) {
      this.$store.commit('common/SET_LOCK_PASSWD', this.lockPasswd)
    }
  },
  computed: {
    userInfo() {return this.$store.state.user.userInfo},
    tag() {return this.$store.state.common.currTag}
  },
  props: [],
  methods: {
    handleLogout() {
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("user/LogOut").then(() => {
          this.$store.commit("common/CLEAR_LOCK");
          this.$router.push({ path: "/login" });
        });
      });
    },
    handleLogin() {
      if (this.passwd !== this.lockPasswd) {
        this.passwd = "";
        this.$message({
          message: "解锁密码错误,请重新输入",
          type: "error"
        });
        this.passwdError = true;
        setTimeout(() => {
          this.passwdError = false;
        }, 1000);
        return;
      }
      this.pass = true;
      setTimeout(() => {
        this.$store.commit("common/CLEAR_LOCK");
        this.$router.push({
          path: '/'
        });
      }, 1000);
    }
  },
  components: {}
};
</script>

<style lang="scss">
.lock-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .title {
    margin-bottom: 8px;
    color: #333;
  }
}
.lock-container::before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("/img/login.png");
  background-size: cover;
}
.lock-form {
  width: 300px;
}
</style>

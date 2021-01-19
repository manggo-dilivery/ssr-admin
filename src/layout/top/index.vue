<template>
  <div class="avue-top">
    <div class="top-bar__left">
      <div @click="setCollapse" class="avue-breadcrumb"
           :class="[{ 'avue-breadcrumb-active': isCollapse }]">
        <svg-icon icon-class="navigation" class-name="iconNav"></svg-icon>
      </div>
    </div>
    <div class="top-bar__right">
      <el-tooltip effect="dark"
                  content="锁屏"
                  placement="bottom">
        <div class="top-bar__item">
          <top-lock></top-lock>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark"
                  content="主题"
                  placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-theme></top-theme>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark"
                  :content="isFullScreen ? '退出全屏' : '全屏'"
                  placement="bottom">
        <div class="top-bar__item" @click="handleScreen">
          <svg-icon icon-class="fullScreen" class-name="topNavIconCommon"></svg-icon>
        </div>
      </el-tooltip>
      <img class="top-bar__img"
           :src="userInfo.avatar">
      <el-dropdown>
        <span class="el-dropdown-link" style="cursor:pointer;">
          {{userInfo.userName}}
          <svg-icon icon-class="arrow_down"></svg-icon>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout"
                            divided>退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  import {fullscreenToggel} from "@/util/util";
  import {getStore} from "@/util/store";
  import topTheme from "./top-theme";
  import TopLock from './top-lock'

  export default {
    name: "top",
    components: {
      topTheme,
      TopLock
    },
    computed: {
      isCollapse() {return this.$store.state.common.isCollapse}
    },
    data() {
      return {
        userInfo: {},
        isFullScreen: false
      };
    },
    filters: {},
    mounted() {
      this.userInfo = getStore({name: 'userInfo'})
    },
    methods: {
      handleScreen() {
        this.isFullScreen = !this.isFullScreen
        fullscreenToggel();
      },
      setCollapse() {
        this.$store.commit("common/SET_COLLAPSE");
      },
      logout() {
        this.$confirm('确定登出吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning"
        }).then(() => {
          this.$store.dispatch("user/LogOut").then(() => {
            this.$router.push({path: "/login"});
          });
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .iconNav{
    cursor: pointer;
  }
</style>

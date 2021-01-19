<template>
  <div class="avue-contail" :class="{'avue--collapse':isCollapse}">
    <div class="avue-header">
      <!-- 顶部导航栏 -->
      <top ref="top"/>
    </div>
    <div class="avue-layout">
      <div class="avue-left">
        <!-- 左侧导航栏 -->
        <sidebar/>
      </div>
      <div class="avue-main">
        <tag/>
        <div style="height:100%;overflow-y:auto;overflow-x:hidden;" id="avue-view" v-show="!isSearch">
          <keep-alive>
            <router-view class="avue-view" v-if="$route.meta.$keepAlive"/>
          </keep-alive>
          <router-view class="avue-view" v-if="!$route.meta.$keepAlive"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import top from "./top/index";
  import sidebar from "./sidebar/index";
  import tag from './tags/tags'
  export default {
    name: "layout",
    provide() {
      return {
        index: this
      }
    },
    components: {
      top,
      sidebar,
      tag
    },
    computed: {
      isCollapse() {return this.$store.state.common.isCollapse},
      menu() {return this.$store.state.user.menu}
    },
    data() {
      return {
        isSearch: false
      }
    },
    methods: {
      openMenu(userId) {
        console.log('userId', userId)
        if (!this.menu.length) {
          // this.$store.dispatch('user/GetMenu', userId).then(() => {
          //   // this.$router.addRoutes(data)
          //   // console.log('data', data)
          //   // console.log('$router', this.$router)
          // })
        }
      }
    }
  }
</script>

<style scoped>

</style>

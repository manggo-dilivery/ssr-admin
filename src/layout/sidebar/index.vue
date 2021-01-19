<template>
  <div class="avue-sidebar">
    <logo/>
    <el-scrollbar style="height:100%">
      <!--<div v-if="!menu.length"-->
           <!--class="avue-sidebar&#45;&#45;tip">-->
        <!--没有发现菜单-->
      <!--</div>-->
      <el-menu unique-opened
               mode="vertical"
               :default-active="currTag.value"
               :show-timeout="200"
               :first="true"
               :collapse="isCollapse">
        <sidebarItem :menu="$router.options.routes" :curr-tag="currTag" :invalid="invalid"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import logo from "./logo";
  import sidebarItem from './sidebarItem'
  import {getStore} from "@/util/store";

  export default {
    name: "sideBar",
    inject: ['index'],
    components: {logo, sidebarItem},
    computed: {
      menu() {return this.$store.state.user.menu},
      keyCollapse() {return this.$store.state.common.isCollapse},
      isCollapse() {return this.$store.state.common.isCollapse}
    },
    data() {
      return{
        currTag: {},
        invalid: false
      }
    },
    created() {
      this.currTag = this.$store.state.tag.currTag
    },
    mounted() {
      const userInfo = getStore({name: 'userInfo'})
      if (userInfo) {
        this.index.openMenu(userInfo.user_id)
      }
      this.currTag = getStore({name: 'currTag'})
      window.onresize = (e) => {
        this.invalid = e.currentTarget.innerWidth >= 992
      }
    }
  }
</script>

<style scoped>

</style>

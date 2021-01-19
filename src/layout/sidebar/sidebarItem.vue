<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <el-menu-item v-if="!item.children && item.meta && item.meta.menu"
                    :key="item.key"
                    :index="item.key">
        <svg-icon :icon-class="item.source"></svg-icon>
        <span slot="title" :class="{'el-menu--display': isCollapse && first}">{{item.name}}</span>
      </el-menu-item>
      <el-submenu v-else-if="item.children && item.meta && item.meta.menu"
                  :key="item.key"
                  :index="item.key">
        <template slot="title">
          <svg-icon :icon-class="item.source" class-name="menu_icon"></svg-icon>
          <span slot="title" :class="{'el-menu--display': isCollapse && first}">{{item.name}}</span>
        </template>
        <template v-for="child in item.children">
          <el-menu-item v-if="!child.children && child.meta && child.meta.menu"
                        :index="child.key"
                        @click="open(child)"
                        :key="child.key">
            <svg-icon :icon-class="child.source" class-name="menu_icon"></svg-icon>
            <span slot="title">{{child.name}}</span>
          </el-menu-item>
          <sidebar-item v-else
                        :menu="[child]"
                        :curr-tag="currTag"
                        :invalid="invalid"
                        :key="child.key"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
  export default {
    name: "sidebarItem",
    computed: {
      isCollapse() {return this.$store.state.common.isCollapse}
    },
    props: {
      menu: {
        required: true
      },
      currTag: {
        required: true
      },
      invalid: {
        required: true
      },
      first: {
        type: Boolean,
        default: true
      },
    },
    methods: {
      open(item) {
        if (this.currTag.value === item.path) return
        this.$router.push(item.path)
      },
      // validateActive(item) {
      //   if (process.env.VUE_APP_TARGET === 'web') {
      //     return item.path === this.currTag.value
      //   }
      // }
    }
  }
</script>

<style scoped>
</style>

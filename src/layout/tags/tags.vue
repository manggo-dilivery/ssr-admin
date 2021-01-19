<template>
  <div class="avue-tags"
       v-if="showTag">
    <div class="avue-tags__box">
      <el-tabs v-model="active"
               type="card"
               :closable="tagLen !== 1"
               @tab-click="openTag"
               @edit="menuTag">
        <el-tab-pane v-for="item in tagList"
                     :key="item.value"
                     :label="item.label"
                     :name="item.value">
        </el-tab-pane>
      </el-tabs>
      <el-dropdown class="avue-tags__menu">
        <el-button type="primary"
                   size="mini">
          更多
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <!--          <el-dropdown-item @click.native="$parent.isSearch=true">{{$t('tagsView.search')}}</el-dropdown-item>-->
          <el-dropdown-item @click.native="closeOthersTags">关闭其它</el-dropdown-item>
          <el-dropdown-item @click.native="closeAllTags">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tags",
    computed: {
      showTag() {return this.$store.state.common.showTag},
      tagList() {return this.$store.state.tag.tagList},
      currTag() {return this.$store.state.tag.currTag},
      tagLen() {return this.$store.state.tag.tagList.length || 0}
    },
    watch: {
      currTag() {
        this.setActive()
      }
    },
    data() {
      return {
        active: '/home'
      }
    },
    mounted() {
      this.$store.commit('tag/SET_TAG_LIST')
    },
    methods: {
      openTag(item) {
        if (item.name === this.currTag.value) return
        const tagData = {
          label: item.label,
          params: '',
          query: '',
          value: item.name
        }
        this.$store.commit('tag/SET_CURR_TAG', tagData)
        this.$router.push({path: item.name})
      },
      menuTag(value, action) {
        if (action === 'remove') {
          // console.log('value', value)
          let {tag, key} = this.findTag(value)
          console.log('tag', tag)
          this.$store.commit('tag/DEL_TAG', tag)
          if (tag.value === this.currTag.value) {
            tag = this.tagList[key === 0 ? key : key - 1]
            this.$store.commit('tag/SET_CURR_TAG', tag)
            this.$router.push({path: tag.value})
            this.$store.commit('tag/SET_CURR_TAG', tag)
          }
        }
      },
      setActive() {
        const arr = this.tagList.filter(item => item.value === this.currTag.value)
        if (arr.length) {
          this.active = this.currTag.value
        }
      },
      findTag(value) {
        let tag, key;
        this.tagList.map((item, index) => {
          if (item.value === value) {
            tag = item;
            key = index
          }
        })
        return {tag, key}
      },
      closeOthersTags() {
        // this.contextmenuFlag = false;
        this.$store.commit("tag/DEL_TAG_OTHER");
      },
      closeAllTags() {
        // this.contextmenuFlag = false;
        this.$store.commit("tag/DEL_ALL_TAG");
        this.$router.push({path: '/home'});
      }
    }
  }
</script>

<style>
  .el-tabs__nav .el-tabs__item:nth-child(1) span{
    display: none;
  }
</style>

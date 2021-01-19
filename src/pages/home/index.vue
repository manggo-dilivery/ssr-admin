<template>
    <basic-container>
        <p>this is home page</p>
        <!--<img :src="img" alt="">-->
        <p>asd</p>
        <i class="bicon-backtop"></i>
        <svg-icon icon-class="lock"/>
    </basic-container>
</template>

<script>
  // import img from '@/assets/img.jpg'
  // import {mapState} from 'vuex'
  import titleMixin from '@/util/titleMixin'

  export default {
    name: 'home',
    mixins: [titleMixin],
    title() {
      return '首页'
    },
    data() {
      return {
        // img
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>

</style>

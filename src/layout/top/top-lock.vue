<template>
  <span>
    <div @click="handleLock">
      <svg-icon icon-class="lock2" class-name="topNavIconCommon"></svg-icon>
    </div>
    <el-dialog title="设置锁屏密码"
               :visible.sync="box"
               width="30%"
               append-to-body>
      <el-form :model="form"
               ref="form"
               label-width="80px">
        <el-form-item label="锁屏密码"
                      prop="passwd"
                      :rules="[{ required: true, message: '锁屏密码不能为空'}]">
          <el-input v-model="form.passwd"
                    placeholder="请输入锁屏密码" />
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="handleSetLock">确 定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import { validatenull } from "@/util/validate";
export default {
  name: "top-lock",
  data() {
    return {
      box: false,
      form: {
        passwd: ""
      }
    };
  },
  created() {},
  mounted() {},
  computed: {
    lockPasswd() {return this.$store.state.common.lockPasswd}
  },
  props: [],
  methods: {
    handleSetLock() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$store.commit("common/SET_LOCK_PASSWD", this.form.passwd);
          this.handleLock();
        }
      });
    },
    handleLock() {
      if (validatenull(this.lockPasswd)) {
        this.box = true;
        return;
      }
      this.$store.commit("common/SET_LOCK");
      setTimeout(() => {
        this.$router.push({ path: "/lock" });
      }, 100);
    }
  },
  components: {}
};
</script>

<style lang="scss">

</style>

<template>
  <div class="pf-user-safe-body">
    <el-form label-position="left" label-width="80px" :model="safe" ref="safe">
      <el-form-item label="旧密码">
        <el-input type="password" v-model="safe.oldPasswd"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input type="password" v-model="safe.newPasswd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="safe.checkPasswd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changePasswd()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import _util from '@/assets/js/util';

  export default {
    name: "Safe.vue",
    data() {
      return {
        passwdUrl: '/panda/front/change/passwd',
        safe: {oldPasswd: '', newPasswd: '', checkPasswd: ''},
      }
    },
    methods: {
      changePasswd() {
        if (this.safe.oldPasswd == '' || this.safe.newPasswd == '' || this.safe.checkPasswd == '') {
          this.$message({type: 'error', message: "密码不能为空"});
          return;
        } else if (this.safe.oldPasswd === this.safe.newPasswd) {
          this.$message({type: 'error', message: "新旧密码不能一样"});
          return;
        } else if (this.safe.newPasswd !== this.safe.checkPasswd) {
          this.$message({type: 'error', message: "两次输入密码不一致"});
          return;
        }
        _util.requestPost(this, this.passwdUrl,
          {...this.safe}, () => {
            this.safe = {};
          });
      }
    }
  }
</script>

<style scoped>

  .pf-user-safe-body {
    width: 400px;
    margin: auto;
  }

</style>
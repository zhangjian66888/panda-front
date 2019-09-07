<template>
  <div class="pf-user-info-body">
    <el-form label-position="left" label-width="80px" :model="info" :rules="infoRule" ref="info">
      <el-form-item label="账号">
        <span>{{info.username}}</span>
      </el-form-item>
      <el-form-item label="姓名">
        <span>{{info.zhName}}</span>
      </el-form-item>
      <el-form-item label="业务线">
        <span>{{info.businessLineName}}</span>
      </el-form-item>
      <el-form-item label="所属组">
        <span>{{info.groupName}}</span>
      </el-form-item>
      <el-form-item label="邮箱">
        <span>{{info.email}}</span>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="info.mobile" :disabled="mobileDisabled">
          <el-button slot="append" class="pd-edit-save-btn" @click="editSaveMobile"
                     :icon="mobileDisabled ? 'el-icon-edit' : 'el-icon-check'"></el-button>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import _util from '@/assets/js/util';

  export default {
    name: "Info.vue",
    data() {
      let checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      return {
        infoUrl: '/panda/front/user/info',
        info: {},
        infoRule: {
          mobile: [
            {validator: checkPhone, trigger: 'blur'},
          ],
        },
        mobileDisabled: true,
      }
    },
    mounted() {
      this.queryInfo();
    },
    methods: {
      queryInfo() {
        _util.requestGet(this, this.infoUrl, {}, (data) => {
          this.info = data
        });
      },
      editSaveMobile() {
        if (!this.mobileDisabled) {
          this.$refs['info'].validate((valid) => {
            if (valid) {
              this.mobileDisabled = !this.mobileDisabled;
              console.log("pass", this.info.mobile)
            } else {
              return false;
            }
          });
        } else {
          this.mobileDisabled = !this.mobileDisabled;
        }
      }
    }
  }
</script>

<style scoped>
  .pf-user-info-body {
    width: 400px;
    margin: auto;
  }

</style>
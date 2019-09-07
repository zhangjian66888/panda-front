<template>
  <div class="pf-user-resource-body">
    <slot v-for="(value, key) in resources">
      <pf-divider height="20px" type="empty"></pf-divider>
      <el-row>
        <el-col :span="5">
          <el-tag type="success">{{key}}</el-tag>
        </el-col>
        <el-col :span="1">|</el-col>
        <el-col :span="18">
          <el-tag v-for="item in value">{{item.roleName}}</el-tag>
        </el-col>
      </el-row>
    </slot>
  </div>
</template>

<script>
  import _util from '@/assets/js/util';

  export default {
    name: "Resource.vue",
    data() {
      return {
        resourceUrl: '/panda/front/user/resource',
        resources: []
      }
    },
    mounted() {
      this.userResource();
    },
    methods: {
      userResource() {
        _util.requestGet(this, this.resourceUrl, {}, (data) => {
          this.resources = _util.groupBy(data, function (item) {
            let key = item.envName + '-' + item.businessLineName + '-' +item.appName;
            return key;
          });
          Object.keys(this.resources).forEach((key) => {
            console.log(key, this.resources[key]);
          });
        });
      }
    }
  }
</script>

<style scoped>
  .pf-user-resource-body {
    margin: auto;
    padding: 0px 150px;
  }

  .pf-user-resource-body .el-tag {
    margin-left: 5px;
  }
</style>
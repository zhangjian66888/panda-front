<template>
  <div class="pf-gap-body">
    <el-tabs tab-position="left">
      <el-tab-pane label="用户信息">
        <Info></Info>
      </el-tab-pane>
      <el-tab-pane label="安全中心">
        <Safe></Safe>
      </el-tab-pane>
      <el-tab-pane label="我的权限">
        <Resource></Resource>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Info from './Info.vue';
  import Safe from './Safe.vue';
  import Resource from './Resource.vue';

  export default {
    name: "Index.vue",
    components: {Info, Safe, Resource},
    data() {
      return {}
    }
  }
</script>

<style>
  .pf-gap-body {
    padding: 0px 10px;
  }

</style>
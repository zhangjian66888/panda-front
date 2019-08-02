<template>
  <div :class="panelClass? panelClass : 'pf-panel'">
    <el-row v-if="title">
      <el-col :span="24" :class="titleClass ? titleClass : 'pf-panel-title'"> {{title}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24" :class="bodyClass ? bodyClass : 'pf-panel-body'">
        <slot></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      panelClass: String,
      titleClass: String,
      bodyClass: String,
    },
    methods: {}
  }
</script>

<style scoped>
  .pf-panel {
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    border-color: #ddd;
  }

  .pf-panel-title {
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    color: #333;
    background-color: #f5f5f5;
    border-color: #ddd;
  }

  .pf-panel-body {
    padding: 5px 10px;
    min-height: 80px;
    /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
  }
</style>
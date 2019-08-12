<template>
  <div :class="type ? 'pf-divider-'+ type : 'pf-divider-line'"
       :style="height ? 'height:'+ height: ''"
  ></div>
</template>

<script>
  export default {
    name: "divider",
    props: {
      type: String,
      height: String,
    }
  }
</script>

<style scoped>
  .pf-divider-line {
    width: 100%;
    border-bottom: 1px solid  #ddd;
  }

  .pf-divider-dotted {
    width: 100%;
    border-bottom: 1px dashed #ddd;
  }

  .pf-divider-empty {
    width: 100%;
    min-height: 2px;
  }
</style>
<template>
  <el-container class="pf-content">
    <el-header class="pf-header" height="50px">
      <div class="pf-menu-icon" @mouseover="showMenu">
        <i class="el-icon-menu"></i>
      </div>
      <div class="pf-topbar-info" v-if="isLogin">
        <div><i class="el-icon-bell"/></div>
        <div><i class="el-icon-setting"/></div>
        <div><i class="el-icon-user"/></div>
      </div>
      <div class="pf-topbar-info" v-else>
        <div>
          <el-button type="text">登录</el-button>
        </div>
      </div>
    </el-header>
    <el-main class="pf-main">
      <router-view/>
    </el-main>

    <el-dialog :visible.sync="menuVisible" width="200px" :show-close="false"
               top="0px"
               custom-class="pf-dialog">

      <el-menu
          :router="true"
          class="pf-menu"
          text-color="#fff"
          background-color="rgba(0,0,0,0.0)"
          active-text-color="#ffd04b"
          :default-active="activeMenu"
          @select="selectMenu">
        <el-menu-item index="/Home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/app/Index" :disabled="!isLogin">
          <i class="el-icon-s-grid"></i>
          <span slot="title">应用列表</span>
        </el-menu-item>
        <el-menu-item index="/permission/Apply" :disabled="!isLogin">
          <i class="el-icon-document"></i>
          <span slot="title">权限申请</span>
        </el-menu-item>
        <el-menu-item index="/permission/Approval" :disabled="!isLogin">
          <i class="el-icon-setting"></i>
          <span slot="title">权限审批</span>
        </el-menu-item>
      </el-menu>
    </el-dialog>
  </el-container>
</template>

<script>

  export default {
    name: "Index.vue",
    data() {
      return {
        isLogin: this.$store.state.accessToken ? true : false,
        menuVisible: false,
        activeMenu: '/Home'
      }
    },
    created: function () {
      this.$router.push("/Home");
    },
    methods: {
      showMenu: function () {
        this.menuVisible = true;
      },
      selectMenu: function (obj) {
        this.menuVisible = false;
        console.log("isLogin", this.$store.state);
      }
    }
  }
</script>

<style>

  .pf-content {

  }

  .pf-content .el-header {
    padding: 0px;
  }

  .pf-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .08);
    background-color: #333333;
    width: 100%;
    height: 50px;
    padding: 0px;
    color: #fff;
  }

  .pf-header .pf-menu-icon {
    float: left;
    background-color: #333333;
    width: 50px;
    height: 50px;
    font-size: 20px;
    text-align: center;
    color: #fff;
    line-height: 50px;
    border-right: 1px solid hsla(0, 0%, 100%, .15);
  }

  .pf-dialog {
    position: fixed !important;
    top: 50px;
    left: 0px;
    height: calc(100vh - 50px);
    background-color: #272b2e !important;
  }

  .pf-dialog .el-dialog__body {
    padding: 0px 0px 30px 0px;
  }

  .pf-dialog .pf-menu {
    border-right: 0px;
  }

  .pf-dialog .pf-menu .el-menu-item:hover {
    background-color: rgba(0, 0, 0, 0.3) !important;
  }

  .pf-header .pf-topbar-info {
    float: right;
    height: 50px;
    line-height: 50px;
  }

  .pf-header .pf-topbar-info div {
    margin-right: 10px;
    float: left;
  }

  .pf-main {
    margin-top: 50px;
  }

  .dialog-fade-enter-active .el-dialog.pf-dialog {
    animation: anim-open .3s;
  }

  .dialog-fade-leave-active .el-dialog.pf-dialog {
    animation: anim-close .3s;
  }

  @keyframes anim-open {
    0% {
      left: -200px;
      opacity: 1;
    }
    100% {
      left: 0px;
      opacity: 1;
    }
  }

  @keyframes anim-close {
    0% {
      left: 0px;
      opacity: 1;
    }
    100% {
      left: -200px;
      opacity: 0;
    }
  }


</style>
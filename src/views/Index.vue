<template>
  <el-container class="pf-content">
    <el-header class="pf-header" height="50px">
      <div class="pf-menu-icon" @mouseover="showMenu">
        <i class="el-icon-menu"></i>
      </div>
      <div class="pf-topbar-info" v-if="isLogin">
        <div><i class="el-icon-bell"/></div>
        <div>
          <router-link to="/User"><i class="el-icon-user"/></router-link>
        </div>
        <div><a href="javascript:void(0);" @click="logout"><i class="el-icon-switch-button"/></a></div>
      </div>
      <div class="pf-topbar-info" v-else>
        <div>
          <el-button type="text" @click="toLogin">登录</el-button>
        </div>
      </div>
    </el-header>
    <el-main class="pf-main">
      <router-view/>
    </el-main>

    <el-dialog :visible.sync="menuVisible" width="200px" :show-close="false"
               top="0px"
               custom-class="pf-meun-dialog">
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
        <el-menu-item index="/resource/Apply" :disabled="!isLogin">
          <i class="el-icon-document"></i>
          <span slot="title">权限申请</span>
        </el-menu-item>
        <el-menu-item index="/apply/Index" :disabled="!isLogin">
          <i class="el-icon-notebook-1"></i>
          <span slot="title">申请列表</span>
        </el-menu-item>
        <el-menu-item index="/approval/Index" :disabled="!isLogin">
          <i class="el-icon-notebook-2"></i>
          <span slot="title">权限审批</span>
        </el-menu-item>
      </el-menu>
    </el-dialog>

    <el-dialog :visible.sync="loginVisible" title="登录" width="400px" class="pf-dialog-body">
      <el-form label-width="80px" :model="loginInfo" :rules="rules" ref="loginInfo" class="pd-login-form"
               @keyup.enter.native="submitForm('loginInfo')">
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginInfo.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="vcode">
          <el-input v-model="loginInfo.vcode">
            <el-button slot="append" @click="createVCode">{{vcode}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginInfo')">登录</el-button>
          <el-button @click="closeForm()">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
  import {mapMutations} from 'vuex'
  import _util from '@/assets/js/util';
  import store from '@/store'

  export default {
    name: "Index.vue",
    data() {
      let checkVCode = (rule, value, callback) => {
        if (value == null || value == '') {
          callback(new Error('code is required'));
        } else if (value.toUpperCase() !== this.vcode) {
          callback(new Error('code is error!'));
        } else {
          callback();
        }
      };
      return {
        isLogin: this.$store.state.accessToken ? true : false,
        menuVisible: false,
        loginVisible: false,
        activeMenu: '/Home',
        vcode: null,
        loginInfo: {},
        rules: {
          username: [{required: true, trigger: 'blur'}],
          password: [{required: true, trigger: 'blur'}],
          vcode: [{validator: checkVCode, trigger: 'blur'}],
        },
      }
    },
    created: function () {
      // this.$router.push("/Home");
    },
    mounted() {
      this.createVCode();
    },
    methods: {
      ...mapMutations(['saveLoginInfo']),
      showMenu: function () {
        this.menuVisible = true;
      },
      selectMenu: function (obj) {
        this.menuVisible = false;
      },
      toLogin: function () {
        this.loginVisible = true;
      },
      logout: function () {
        store.commit('clearLoginInfo');
        this.isLogin = this.$store.state.accessToken ? true : false;
        this.$router.push("/Home");

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _util.requestPost(this, '/panda/front/login',
              {...this.loginInfo},
              (data) => {
                this.saveLoginInfo(data);
                this.isLogin = this.$store.state.accessToken ? true : false;
                this.loginVisible = false;
              }, () => this.createVCode());
          } else {
            this.createVCode();
            return false;
          }
        });
      },
      closeForm() {
        this.loginVisible = false;
      },
      createVCode() {
        let code = "";
        let codeLength = 4;//验证码的长度
        let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
          'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//随机数
        for (let i = 0; i < codeLength; i++) {
          //循环操作
          let index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35）
          code += random[index];//根据索引取得随机数加到code上
        }
        this.vcode = code;//把code值赋给验证码
      },
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

  .pf-meun-dialog {
    position: fixed !important;
    top: 50px;
    left: 0px;
    height: calc(100vh - 50px);
    background-color: #272b2e !important;
  }

  .pf-meun-dialog .el-dialog__body {
    padding: 0px 0px 30px 0px;
  }

  .pf-meun-dialog .pf-menu {
    border-right: 0px;
  }

  .pf-meun-dialog .pf-menu .el-menu-item:hover {
    background-color: rgba(0, 0, 0, 0.3) !important;
  }

  .pf-header .pf-topbar-info {
    float: right;
    height: 50px;
    line-height: 50px;
    padding-right: 20px;
  }

  .pf-header .pf-topbar-info div {
    margin-right: 10px;
    float: left;
  }

  .pf-header .pf-topbar-info a {
    color: #ffffff;
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
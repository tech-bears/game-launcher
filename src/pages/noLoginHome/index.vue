<template>
  <div>
    <div id="captcha-element"></div>
    <el-input v-model="username" placeholder="账号"></el-input>
    <el-input v-model="nickname" placeholder="昵称"></el-input>
    <el-input placeholder="密码" v-model="password" show-password></el-input>
    <div class="btn-wrapper">
      <el-button @click="handlerRegisterBtn()">去注册</el-button>
      <el-button id="login-button">登录</el-button>
      <el-button @click="handlerPhoneVertifyBtn()">验证码登录</el-button>
      <el-button @click="handlerResetPasswordBtn()">重置密码</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      captcha: null,
      captchaButton: null,
      username: "",
      password: "",
      nickname: ''
    };
  },
  mounted() {
    this.captchaButton = document.getElementById('login-button');

    window.initAliyunCaptcha({
      SceneId: 'jszkqj5m', // 场景ID。根据步骤二新建验证场景后，您可以在验证码场景列表，获取该场景的场景ID
      prefix: '1n4vul', // 身份标。开通阿里云验证码2.0后，您可以在控制台概览页面的实例基本信息卡片区域，获取身份标
      mode: 'popup', // 验证码模式。popup表示要集成的验证码模式为弹出式。无需修改
      element: '#captcha-element', // 页面上预留的渲染验证码的元素，与原代码中预留的页面元素保持一致。
      button: '#login-button', // 触发验证码弹窗的元素。button表示单击登录按钮后，触发captchaVerifyCallback函数。您可以根据实际使用的元素修改element的值
      captchaVerifyCallback: this.captchaVerifyCallback, // 业务请求(带验证码校验)回调函数，无需修改
      onBizResultCallback: this.onBizResultCallback, // 业务请求结果回调函数，无需修改
      getInstance: this.getInstance, // 绑定验证码实例函数，无需修改
      slideStyle: {
        width: 360,
        height: 40,
      }, // 滑块验证码样式，支持自定义宽度和高度，单位为px。其中，width最小值为320 px
      language: 'cn', // 验证码语言类型，支持简体中文（cn）、繁体中文（tw）、英文（en）
    });
  },
  beforeUnmount() {
    this.captchaButton = null;

    document.getElementById('aliyunCaptcha-mask')?.remove();
    document.getElementById('aliyunCaptcha-window-popup')?.remove();
    // clearAliyunCaptcha();
  },
  methods: {
    ...mapActions("user", ['handlerUserLoginAction']),
    getInstance(instance) {
      this.captcha = instance;
    },
    handlerRegisterBtn() {
      this.$router.push("/register");
    },
    handlerPhoneVertifyBtn() {
      this.$router.push("/phone");
    },
    handlerResetPasswordBtn() {
      this.$router.push('/reset-pwd')
    },
    async captchaVerifyCallback(captchaVerifyParam) {
      const encode = encodeURI(captchaVerifyParam)
      const ticket = btoa(encode)
      const params = {
        ticket,
        account: + this.username,
        password: this.password,
        nickname: this.nickname
      };
      console.log(params, 'params----');
      const res = await this.handlerUserLoginAction(params);
      if(res.status === 200) {
        localStorage.setItem('sesstion', res.data?.session)
      } else {
        this.$message.error(res.text)
      }
      // params = await getCptcha()
      return {
        captchaResult: true,
        bizResult: true,
      };
    },
    // 验证通过后调用
    onBizResultCallback() {
      console.log("onBizResultCallback");
    },
    // 弹出验证框，popupId为组件id，用于支持验证通过后继续触发业务逻辑
    popup(popupId) {
      this.popupId = popupId;
      this.captchaButton.click();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
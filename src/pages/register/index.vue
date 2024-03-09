<template>
  <div>
    <el-form label-width="80px" :model="registerForm">
      <el-form-item label="真实姓名">
        <el-input v-model="registerForm.realname"></el-input>
      </el-form-item>
      <el-form-item label="真实身份证">
        <el-input v-model="registerForm.id_card"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="registerForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-phone-number-input
          v-model="registerForm.mobile"
        ></el-phone-number-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="registerForm.code"></el-input>
      </el-form-item>
      <el-button id="vertify-btn" @click="handleGetCaptcha"
        >获取验证码</el-button
      >
      <Captcha
        v-if="needVertify"
        btnText="注册"
        @callback="handlerRegisterCallbackBtn"
      ></Captcha>
      <el-button v-else @click="hanlerRegister">注册</el-button>
    </el-form>
    <div id="captcha-element"></div>
  </div>
</template>

<script>
import { ElPhoneNumberInput } from "el-phone-number-input";
import { mapActions, mapState } from "vuex";
import Captcha from "@/components/captcha/index.vue";
import { encodeCaptchaVerifyParam } from "@/utils/api.js";
export default {
  name: "register",
  components: { ElPhoneNumberInput, Captcha },
  data() {
    return {
      captchaButton: null,
      captcha: null,
      needVertify: false,
      registerForm: {
        realname: "",
        id_card: "",
        code: "",
        mobile: {
          callingCode: "86",
          phoneNumber: "",
        },
      },
    };
  },
  computed: {
    ...mapState("user", ["needVerificate"]),
  },
  mounted() {},
  beforeUnmount() {
    // 必须删除相关元素，否则再次mount多次调用 initAliyunCaptcha 会导致多次回调 captchaVerifyCallback
    document.getElementById("aliyunCaptcha-mask")?.remove();
    document.getElementById("aliyunCaptcha-window-popup")?.remove();
  },
  methods: {
    ...mapActions("user", [
      "getPhoneVertifyAction",
      "RegisterAction",
      "handlderResponseStatusError",
    ]),
    async hanlerRegister(params = {}) {
      const payload = {
        phone_number: this.registerForm.mobile.phoneNumber,
        phone_prefix: "+" + this.registerForm.mobile.callingCode,
        code: this.registerForm.code,
        name: this.registerForm.realname,
        id_card: this.registerForm.id_card,
        password: this.registerForm.password
      };
      if (this.needVertify) {
        const ticket = encodeCaptchaVerifyParam(params?.captchaVerifyParam);
        payload.ticket = ticket;
      }
      const res = await this.RegisterAction(payload);
      this.needVertify = res.needVertify;
      if (res.status === 200) {
        this.$message.success("注册成功");
      } else {
        this.$message.error(res.text);
      }
    },
    async handleGetCaptcha() {
      const res = await this.getPhoneVertifyAction({
        phone: this.registerForm.mobile.phoneNumber,
        phone_prefix: "+" + this.registerForm.mobile.callingCode,
      });
      if (res.status === 200) {
        this.$message.success("发送成功");
      } else {
        this.$message.error(res.text);
      }
    },
    handlerRegisterCallbackBtn(params) {
      this.hanlerRegister(params);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
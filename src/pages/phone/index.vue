<template>
  <div>
    <el-form label-width="80px" :model="registerForm">
      <el-form-item label="手机号码" prop="mobile">
        <el-phone-number-input
          v-model="registerForm.mobile"
        ></el-phone-number-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="registerForm.code"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="registerForm.nickname"></el-input>
      </el-form-item>
      <el-button @click="handlerGetVertifyBtn">获取验证码</el-button>
      <Captcha v-if="needVertify" btnText="登录" @callback="phoneLoginCallback"></Captcha>
      <el-button v-else @click="handleVertifyLoginBtn">登录</el-button>
    </el-form>
  </div>
</template>
  
  <script>
import { ElPhoneNumberInput } from "el-phone-number-input";
import { mapActions, mapState } from "vuex";
import Captcha from '@/components/captcha/index.vue'
import {encodeCaptchaVerifyParam} from '@/utils/api.js'
export default {
  name: "register",
  components: { ElPhoneNumberInput, Captcha },
  data() {
    return {
      needVertify: false,
      registerForm: {
        realname: "",
        code: "",
        code: "123456",
        nickname: '',
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
  methods: {
    ...mapActions("user", ["getPhoneVertifyAction", 'UserVertifyLoginActions']),
    async handlerGetVertifyBtn() {
      const params = {
        phone: this.registerForm.mobile.phoneNumber,
        phone_prefix: '+' + this.registerForm.mobile.callingCode,
      };
      const res = await this.getPhoneVertifyAction(params);
      console.log(res, 'res----');
      if (res.status === 200) {
        this.$message.success('发送成功')
      }else {
        this.$message.error(res.text)
      }
    },
    async handleVertifyLoginBtn(params = {}) {
      const payload = {
        phone_number: this.registerForm.mobile.phoneNumber,
        phone_prefix: '+' + this.registerForm.mobile.callingCode,
        code: this.registerForm.code,
        nickname: this.registerForm.nickname
      };
      if (this.needVertify) {
        const ticket = encodeCaptchaVerifyParam(params?.captchaVerifyParam)
        payload.ticket = ticket
      }
      const res = await this.UserVertifyLoginActions(payload)
      if (res.status === 200) {
        localStorage.setItem('SUMMON_WAR_SESSION', res.data.session)
        this.$router.push('/')
      } else {
        this.$message.error(res.text)
      }
      this.needVertify = res.needVertify
    },
    phoneLoginCallback(callbackParams) {
      this.handleVertifyLoginBtn(callbackParams)
    }
  },
};
</script>
  
  <style lang="scss" scoped>
</style>
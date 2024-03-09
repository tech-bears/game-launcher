<template>
  <div>
    <el-form label-width="80px" :model="registerForm">
      <el-form-item label="新密码">
        <el-input
          placeholder="密码"
          v-model="registerForm.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-phone-number-input
          v-model="registerForm.mobile"
        ></el-phone-number-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="registerForm.code"></el-input>
      </el-form-item>
      <el-button @click="handlerGetVertifyBtn">获取验证码</el-button>
      <Captcha v-if="needVertify" btnText="重置密码" @callbcak="handlerCallBackPassword"></Captcha>
      <el-button v-else @click="hanlerResetPwdBtn">重置密码</el-button>
    </el-form>
  </div>
</template>
  
  <script>
import { ElPhoneNumberInput } from "el-phone-number-input";
import { mapActions, mapState } from "vuex";
import Captcha from '@/components/captcha/index.vue'
import {encodeCaptchaVerifyParam} from '@/utils/api.js'
export default {
  components: { ElPhoneNumberInput, Captcha },
  data() {
    return {
      needVertify: false,
      registerForm: {
        password: "",
        code: "",
        mobile: {
          callingCode: "86",
          phoneNumber: "",
        },
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions("user", ["getPhoneVertifyAction", "resetPasswordAction"]),
    async handlerGetVertifyBtn() {
      const params = {
        phone: this.registerForm.mobile.phoneNumber,
        phone_prefix: '+' + this.registerForm.mobile.callingCode,
      };
      const res = await this.getPhoneVertifyAction(params);
      if (res.status === 200) {
        this.$message.success('发送成功')
      }else {
        this.$message.error(res.text)
      }
    },
    hanlerResetPwdBtn(params = {}) {
      const payload = {
        phone_number: this.registerForm.mobile.phoneNumber,
        phone_prefix: '+' + this.registerForm.mobile.callingCode,
        code: this.registerForm.code,
        password: this.registerForm.password
      };
      if (this.needVertify) {
        const ticket = encodeCaptchaVerifyParam(params?.captchaVerifyParam)
        payload.ticket = ticket
      }
      const res = this.resetPasswordAction(payload)
      if (res.status === 200) {
        this.$message.success('修改成功')
      }else {
        this.$message.error(res.text)
      }
      this.needVertify = res.needVertify
    },
    handlerCallBackPassword(vertifyCallbackParams) {
      this.hanlerResetPwdBtn(vertifyCallbackParams)
    }
  },
};
</script>
  
  <style lang="scss" scoped>
</style>
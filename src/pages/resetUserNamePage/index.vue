<template>
  <div>
    <el-input v-model="nickname">修改名</el-input>
    <Captcha
      v-if="needVertify"
      btnText="修改名称"
      @callback="handlerCallBackResetName"
    ></Captcha>
    <el-button v-else @click="handlerResetNameBtn">修改名称</el-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Captcha from "@/components/captcha/index.vue";
import { encodeCaptchaVerifyParam } from "@/utils/api.js";
export default {
  components: {
    Captcha,
  },
  data() {
    return {
      nickname: "",
      needVertify: false,
    };
  },
  method: {
    ...mapActions("user", ["resetUserNameAction"]),
    async handlerResetNameBtn(params = {}) {
      const payload = {
        nickname: this.nickname,
      };
      if (this.needVertify) {
        const ticket = encodeCaptchaVerifyParam(payload?.captchaVerifyParam);
        payload.ticket = ticket;
      }
      const res = await this.resetUserNameAction(payload);
      if (res.status === 200) {
        this.$message.success("修改成功");
      } else {
        this.$message.error(res.text);
      }
      this.needVertify = res.needVertify;
    },
    handlerCallBackResetName(vertifyCallbackParams) {
      this.handlerResetNameBtn(vertifyCallbackParams);
    },
  },
};
</script>

<style>
</style>
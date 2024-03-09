<template>
  <div>
    
    <el-input v-model="avatar">头像</el-input>
    <el-input v-model="avatarFrame">头像框</el-input>
    <Captcha
      v-if="needVertify"
      btnText="修改名称"
      @callbcak="handlerCallBackResetAvatar"
    ></Captcha>
    <el-button v-else @click="handlerCallBackResetAvatar()">修改头像</el-button>
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
      avatar: "",
      avatarFrame: "",
      needVertify: false,
    };
  },
  method: {
    ...mapActions("user", ["resetUserAvatarAction"]),
    async handlerResetAvatarBtn(params = {}) {
      const payload = {
        avatar: this.avatar,
        avatar_frame: this.avatarFrame
      };
      if (this.needVertify) {
        const ticket = encodeCaptchaVerifyParam(params?.captchaVerifyParam);
        payload.ticket = ticket;
      }
      const res = await this.resetUserAvatarAction(payload);
      if (res.status === 200) {
        this.$message.success("修改成功");
      } else {
        this.$message.error(res.text);
      }
      this.needVertify = res.needVertify;
    },
    handlerCallBackResetAvatar(vertifyCallbackParams) {
      this.handlerResetAvatarBtn(vertifyCallbackParams);
    },
  },
};
</script>

<style>
</style>
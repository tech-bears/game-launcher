<template>
  <div class="home-wrapper">
    <div>
      <div>{{ userData.nickName }}</div>
      <img :src="userData.avatar">
    </div>
    <el-button @click="handlerResetNameBtn()">修改用户名</el-button>
    <el-button @click="handlerResetPwdBtn()">修改头像</el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      userData: {}
    }
  },
  mounted() {
    
  },
  methods: {
    ...mapActions('user', ['getUserData']),
    handlerResetNameBtn() {
      this.$router.push('/reset-name')
    },
    handlerResetAvatarBtn() {
      this.$router.push('./reset-avatar')
    },
    async getUserData() {
      const res = await this.getUserData()
      this.userData = res.data
    }
  }
}
</script>

<style>

</style>
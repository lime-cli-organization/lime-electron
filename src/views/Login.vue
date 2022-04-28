<template>
  <div class="wrapper">
    <el-button type="primary" @click="doLogin">登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    doLogin() {
      this.$router.push('/home');
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <el-form :model="form" status-icon ref="ruleForm" label-width="100px">
      <el-form-item label="账号" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="passWord">
        <el-input type="password" v-model="form.passWord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doLogin">登录</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="doLogin">登录</el-button>
  </div>
</template>

<script>
import axios from 'axios';
import { obj2params } from '@/utils/tools';
import { setCookie } from '@/utils/storage';
export default {
  name: 'Login',
  data() {
    return {
      form: {
        userName: '',
        passWord: '',
      },
    };
  },
  methods: {
    doLogin() {
      axios
        .post(`/authorize/Login?${obj2params(this.form)}`)
        .then((response) => {
          let {
            data: { data },
          } = response;
          setCookie('token', data);
          this.$router.push('/template');
        });
      return;
    },
  },
};
</script>

<template>
  <div class="login-base">
    <div class="form">
      <div class="form-left">
        <div class="form-input">
          <el-form :model="formData" :rules="rules" ref="ruleForm">
            <el-form-item prop="username">
              <el-input
                placeholder="用户名"
                v-model="formData.username"
                prefix-icon="el-icon-user-solid"
                :autofocus="true"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                show-password
                placeholder="密码"
                v-model="formData.password"
                prefix-icon="el-icon-key"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <div class="login-func">
            <el-checkbox v-model="rememberMe">记住我</el-checkbox>
            <el-button type="primary" @click="login">登录</el-button>
          </div>
        </div>
      </div>
      <div class="form-right"></div>
    </div>
  </div>
</template>
<script>
// func
import {Encrypt} from "@/dependences/crypto.js"
// apis
import { loginApi } from "@/apis/userInfo.js";
import config from "@/config";
export default {
  name: "Login",
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      rememberMe: false,
    };
  },
  methods: {
    login() {
      let messageProperty = { ...config.messageProperty };
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 对用户名以及密码进行加密
          let username_ciphertext = Encrypt(this.formData.username)
          let password_ciphertext = Encrypt(this.formData.password)
          let data = {
            username: username_ciphertext,
            password: password_ciphertext
          };
          // 传递给后端
          loginApi(data).then((res) => {
            messageProperty.message = res.data.message;
            if (res.data.code == 200) {
              this.$store.commit("setToken", res.data.token)
              this.$message.success(messageProperty);
              this.$router.push({ name: "Home" });
            } else {
              this.$message.error(messageProperty);
            }
          });
        } else {
          return;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import url("./login.less");
</style>
<template>
  <div class="login-base">
    <div class="form">
      <div class="form-left">
        <div class="form-input">
          <el-input
            placeholder="用户名"
            v-model="username"
            prefix-icon="el-icon-user-solid"
          >
          </el-input>
          <el-input
            show-password
            placeholder="密码"
            v-model="passwd"
            prefix-icon="el-icon-key"
          >
          </el-input>
          <div class="login-func">
            <el-checkbox v-model="rememberMe">记住我</el-checkbox>
            <el-button type="primary">登录</el-button>
          </div>
        </div>
      </div>
      <div class="form-right"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      passwd: "",
      rememberMe: false,
    };
  },
};
</script>
<style lang="less" scoped>
.login-base {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.form {
  position: relative;
  border-radius: 25px;
  height: 25rem;
  width: 40rem;
  background-color: #cccccc;
  box-shadow: 0 0 20px #222222;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  .form-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 60%;
    height: 100%;
    background-color: #fff;
    transform: skewX(-5deg);
    left: -1rem;
    .form-input {
      transform: skewX(5deg);
      width: 60%;
      height: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .login-func {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  .form-right {
    position: absolute;
    width: 45%;
    height: 100%;
    transform: skewX(-5deg);
    right: -1rem;
    background-image: url("../../../public/image/login-right.jpg");
    background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>
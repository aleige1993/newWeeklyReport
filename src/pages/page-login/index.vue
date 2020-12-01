<template>
  <!-- <form>
              <div class="login-row">
                <label for="username">用户名</label>
                <div class="login-input">
                  <input class="el-input__inner" @keydown.enter="submitLogin" id="username" placeholder="用户名" v-model="loginForm.userName" />
                </div>
              </div>
              <div class="login-row">
                <label for="pwd">密码</label>
                <div class="login-input">
                  <input class="el-input__inner" type="password" @keydown.enter="submitLogin" id="pwd" placeholder="密码" v-model="loginForm.userPwd" />
                </div>
              </div>
              
              <div class="login-row" style="padding-top: 10px;">
                <span style="color: #f00" class="text-danger" v-if="errorInfo">{{errorInfo}}</span>
              </div>
              <div class="login-row">
                <el-button style="display: inline-block; width: 100%;" type="primary" @click="submitLogin" size="large" long>
                  <span v-if="!loading">提交</span>
                  <span v-else>Loading...</span>
                </el-button>
              </div>
            
            </form> -->
  <div id="page-login">
      <div class="cavas_box">
         <div class="haser_login">
              <img class="logoda" src="./img/logoda.png" alt="">
         </div>
         <div class="pakn">
           <div class="beijingtu">
              <img class="beijingtua" src="./img/beijing.png" alt="">
           </div>
           <div class="form_box">
              <form>
                <p class="delog">登录 USERLOGIN</p>
              <div class="login-row">
                <!-- <label for="username">用户名</label> -->
                <div class="login-input">
                  <input class="el-input__inner" @keydown.enter="submitLogin" id="username" placeholder="账号" v-model="loginForm.userName" />
                </div>
              </div>
              <div class="login-row">
                <!-- <label for="pwd">密码</label> -->
                <div class="login-input">
                  <input class="el-input__inner" type="password" @keydown.enter="submitLogin" id="pwd" placeholder="密码" v-model="loginForm.userPwd" />
                </div>
              </div>
              
              <div class="login-row" style="padding-top: 10px;">
                <span style="color: #f00" class="text-danger" v-if="errorInfo">{{errorInfo}}</span>
              </div>
              <div class="login-row">
                <el-button round style="display: inline-block; width: 100%;" type="primary" @click="submitLogin" size="large"  long>
                  <span v-if="!loading">登录</span>
                  <span v-else>Loading...</span>
                </el-button>
              </div>
            
            </form>

           </div>
         </div>
      </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    name: 'pageLogin',
    data() {
      return {
        loading: false,
        errorInfo: '',
        loginForm: {
          userName: '',
          userPwd: '',
        }
      };
    },
    methods: {
      async submitLogin() {
        this.$data.loading = true;
        let res = await this.$http.post('/api/user/login', {
          ... this.$data.loginForm
        });
        this.$data.loading = false;
        // 登录成功
        if (res.code =='0') {
          this.$router.push('/index/userInfo');
        }
      }
    },
    mounted() {

    }
  };
</script>
<style lang="scss" scoped>
  @import 'style';
  .cavas_box{
    width: 100%;
    height: 100vh;
    background: linear-gradient(-27deg, #D5DE9B, #005C8D);
  }
  .haser_login{
    text-align: right;
    padding:70px;
    img{
      width: 202px;
      height: 44px;
    }
  }
  .pakn{
    display: flex;
    justify-content: center;
  }
  .beijingtu{
     width:30%;
    .beijingtua{
      width:100%;
      // height: 670px;
    }
  }
.form_box{
  width: 400px;
  height: 372px;
background: #4D8383;
padding: 40px;
margin-left:200px;
}
.delog{
  text-align: center; 
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 21px;
  margin-bottom: 40px;
}
.login-row{
  margin-bottom: 20px;
}
.el-input__inner{
  border-radius:20px;
}
</style>

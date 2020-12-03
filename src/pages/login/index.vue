<template>
  <div class="dagonin" >
      <img src="../../assets/img/dadilogo.png" class="logos" alt="">
      <img src="../../assets/img/buglogo.png" class="bgtu" alt="">
      <p class="titles">登录 USERLOGIN</p>
      <div class="divgrap">
        <!-- <van-field v-model="tel" type="tel" placeholder="手机号码" />
        <van-field v-model="password" type="password" placeholder="密码" /> -->
        <input class="inputtext"  v-model="tel" type="text" placeholder="手机号码" />
        <input class="inputtext" v-model="password"  type="password" placeholder="密码"/>
         <van-button class="buttvat" @click="subLogin" round type="primary" :loading="islogin" >登录</van-button>
      </div>
     
  </div>
</template>

<script> 
  export default {
    name:'',
    props:[''],
     data () {
      return {
        tel:'',
        password:'',
        islogin:false
      };
    }, 
    computed: {},

    beforeMount() {},

    mounted() {
      console.log(11111)
    },

    methods: {
      subLogin(){
      let _this = this
      this.islogin = true
      this.$HttpApi.post('/api/Employee/login',{
        userName:this.tel,
        userPwd:this.password
      }).then((res)=>{
        if(res.data.code == 0){
          _this.$UserLogin.setLoginInfo(res.headers.token)
          _this.$router.push({name:'user'})
        }else{ 
          this.$notify({
              message: '账号或密码不正确',
              type: 'danger',
          }) 
        }
         this.islogin = false
       
      }).catch((err)=>{
        this.islogin = false
      })
    }
    },

    watch: {}
    // created(){
    //    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //   window.onresize = function() {
    //       var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //       if (clientHeight - nowClientHeight > 60 ) {
    //           document.getElementById("apply").classList.add("focusState");
    //       }
    //       else {
    //         document.getElementById("apply").classList.remove("focusState");
    //       } 
    //   };
    // },
  
  }

</script>
<style lang='css' scoped>
.focusState {position: absolute;}
.dagonin{
  width: 100%;
  height: 100vh;
background: linear-gradient(-27deg, #D5DE9B, #005C8D);
}
.logos{
  width: 210px;
  height: 46px;
  margin-left: 72px;
  margin-top: 72px;
}
.bgtu{
width: 657px;
height: 550px;
margin-left: 44px;
margin-top: 100px;
}
.titles{
font-size: 24px; 
color: #FFFFFF;
text-align: right;
padding-right: 90px;
margin-top: 55px;
margin-bottom: 20px;
}
.divgrap{
  padding: 0 70px;
}
.inputtext{
  line-height: 70px;
  border-radius:35px;
  background-color: #fff;
  margin-bottom:20px;
  width: 100%;
  border:none;
  padding-left:20px;
}
.buttvat{
  background-color: #176A87;
  width: 100%;
  height:80px;
  margin-top: 30px;
  border:none;
}
</style>
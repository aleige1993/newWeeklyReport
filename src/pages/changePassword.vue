<template>
<div class="biejin">
  <div class="pas_box">
      <div class="pasww">
   
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item label="" prop="oldpass">
            <el-input
              type="password"
              v-model="ruleForm.oldpass"
              autocomplete="off"
              placeholder="请输入旧密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
               placeholder="请输入新密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
             placeholder="请再次确认密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('ruleForm')">清除</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
          </el-form-item>
        </el-form> 
  </div>
</div>
</div>


</template>

<script>
export default {
  name: "",
  props: [""],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldpass: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        oldpass: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [{  required: true, validator: validatePass2, trigger: "blur" }],
      },
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) { 
          let res = await this.$http.post('/api/User/changepwd', {
            oldPassword: this.ruleForm.oldpass,
            newPassword: this.ruleForm.pass,
            againPassword: this.ruleForm.checkPass
          });
          // 登录成功
          if (res.code == 0) {
           this.$message.success('密码修改成功！');
            setTimeout(()=>{
            this.$router.push('/login'); 
            },1500)
          } 
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },

  watch: {},
};
</script>
<style lang='css' scoped>
.pasww {
  width:100%;
  display: inline-block;
}
.pas_box{
    text-align: center;
     width: 500px;
    height: 340px;
    background: #4D8383; 
    padding: 30px;
    margin-top: 160px; 
}
.biejin{
  width: 100%;
    height: 100vh;
    background: linear-gradient(-27deg, #D5DE9B, #005C8D);
    display: flex;
    justify-content: center;
}
.el-form-item__label{
  color: #fff !important;
}
.el-form-item{
  margin-top: 30px;
}
</style>
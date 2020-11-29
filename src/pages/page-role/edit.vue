<template>
<el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        size="small"
        class="demo-ruleForm"
      > 
        <el-row>
            <el-form-item label="角色" prop="positionName">
              <el-input v-model="ruleForm.positionName" placeholder="请输入角色职称"></el-input>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="权限" prop="authorization">
              <el-checkbox-group v-model="ruleForm.authorization">
                <el-checkbox v-for="item in authList"
              :key="item.value"
              :label="item.value" name="type">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
        </el-row> 
       <div class="modebitsubt">
          <!--<el-button   @click="resetForm('ruleForm')">取消</el-button>-->
          <el-button   type="primary" @click="submitForm('ruleForm')"
            >确定</el-button
          >
       </div>
      </el-form>
</template>
<script>
export default {
    name:"role-edit",
    props: ["id"],
    data(){
        return {
            authList:[],
            ruleForm: {
        positionName: "",
        authorization: []
         
      },
      rules: {
        positionName: [
          { required: true, message: "请输入角色职称", trigger: "blur" }, 
        ],
         authorization: [
          { required: true, message: "请选择权限", trigger: 'change' }, 
        ]
      },
        }
    },
    async created(){
        let that=this;
        console.info('id',that.id);
        var authRes =await that.$http.get("/api/Position/authorizationlist");
        that.authList=authRes.data;
        if(that.id=='0'){
            return;
        }
        var res = await that.$http.get(`/api/Position/${that.id}`);
        if(res.code =='0'){
          that.ruleForm=res.data;

        }
    },
    methods:{
    async submitForm(formName) {
        let that=this;
        that.$refs[formName].validate(async (valid) => {
            if (!valid) {
            return false;
            }
            var res = await that.$http.post("/api/Position/save",{...that.ruleForm})
            if(res.code =='0'){
                that.$emit('close',true);
            }
        });
    }
    }
}
</script>
<style scoped>
.modebitsubt{
  margin-top: 20px;
  text-align: right;
  padding-right: 70px;
}
</style>

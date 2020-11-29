<template>
    <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    size="small"
    class="demo-ruleForm"
    > 
    <el-row>
        <el-col :span="11">
        <el-form-item label="姓名" prop="employeeName">
            <el-input v-model="ruleForm.employeeName"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="11">
        <el-form-item label="手机号码" prop="mobilePhone">
            <el-input v-model="ruleForm.mobilePhone"></el-input>
        </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="22">
        <el-form-item label="部门" prop="depIDs">
            <el-select filterable multiple v-model="ruleForm.depIDs" placeholder="请选择部门">
                <el-option
      v-for="item in depList"
      :key="item.value"
      :label="item.name"
      :value="item.value">
    </el-option>
            </el-select>
        </el-form-item>
        </el-col>
        
    </el-row> 
    <el-row>
<el-col :span="22">
        <el-form-item label="结构部门" prop="logicDepIDs">
            <el-select filterable multiple  v-model="ruleForm.logicDepIDs" placeholder="请选择结构部门">
                <el-option
      v-for="item in depList"
      :key="item.value"
      :label="item.name"
      :value="item.value">
    </el-option>
            </el-select>
        </el-form-item>
        </el-col>
    </el-row>
        <el-row>
        <el-col :span="22">
        <el-form-item label="角色职称" prop="posIDs">
            <el-select filterable multiple  v-model="ruleForm.posIDs" placeholder="请选择角色职称">
                <el-option
      v-for="item in posList"
      :key="item.id"
      :label="item.positionName"
      :value="item.id">
    </el-option>
            </el-select>
        </el-form-item>
        </el-col>
    </el-row>
    <el-row> 
        <el-col :span="11">
        <el-form-item label="是否领导" prop="departmentLeader">
        <el-radio-group v-model="ruleForm.departmentLeader">
        <el-radio :label="0">否</el-radio>
        <el-radio :label="1">是</el-radio>
        </el-radio-group>
    </el-form-item>
        </el-col>
    </el-row> 
    <div class="modebitsubt">
        <el-button   @click="$emit('close')">取消</el-button>
        <el-button   type="primary" @click="submitForm('ruleForm')"
        >提交</el-button
        >
    </div>
    </el-form>
</template>
<script>
export default {
    name:"user-edit",
    props: ["id"],
    data(){
        return {
            depList:[],
            posList:[],
            ruleForm: {
                empID:'',
                employeeName: "",
                mobilePhone: "",
                depIDs: "",
                logicDepIDs: "",
                posIDs: '',
                departmentLeader: 0
            },
            rules: {
                employeeName: [
                    { required: true, message: "请输入姓名", trigger: "blur" }, 
                ],
                mobilePhone: [
                    { required: true, message: "请输入手机号码", trigger: "blur" }, 
                ],
                depIDs: [
                    { required: true, message: "请选择部门", trigger: 'change' }, 
                ],
                logicDepIDs: [
                    { required: true, message: "请选择部门结构", trigger: 'change' }, 
                ],
                posIDs: [
                    { required: true, message: "请输入职位", trigger: "blur" }, 
                ],
                departmentLeader: [
                    { required: true, message: "请选择是否领导", trigger: 'change' }, 
                ],
            }
        }
    },
    async created(){
        let that=this;
        var depRes =await that.$http.get("/api/Department/list");
        that.depList=depRes.data;
        var posRes =await that.$http.get("/api/Position/list");
        that.posList=posRes.data;
        if(that.id=='0'){
            return;
        }
        var res = await that.$http.get(`/api/employee/${that.id}`);
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
            var res = await that.$http.post("/api/Employee/edit",{...that.ruleForm})
            if(res.code =='0'){
                that.$emit('close',true);
            }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
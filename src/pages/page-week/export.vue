<template>
    <el-form
    
    label-width="100px"
    size="small"
    class="demo-ruleForm"
    > 
    <el-row>
        <el-col :span="18">
            <el-date-picker
      v-model="dateVal"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
        </el-col>
        <el-col :span="4">
<el-button  type="primary" @click="submitForm()" :loading="exporting"
        >提交</el-button>
        </el-col>
    </el-row> 
    </el-form>
</template>
<script>
export default {
    name:"week-export",
    props: [],
    data(){
      var now=new Date();
      var end=new Date(now.getFullYear(),now.getMonth()+1,now.getDate());
        return {
          exporting:false,
            pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const start = new Date();
              start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const start = new Date();
              start.setTime(end.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const start = new Date();
              start.setTime(end.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近半年',
            onClick(picker) {
              const start = new Date();
              start.setTime(end.getTime() - 3600 * 1000 * 24 * 183);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一年',
            onClick(picker) {
              const start = new Date();
              start.setTime(end.getTime() - 3600 * 1000 * 24 * 366);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dateVal: ''
        }
    },
    async created(){
        
    },
    methods:{
    async submitForm() {
        let that=this;
        if(!that.dateVal){
          that.$notify.error({
          title: '提示',
          message: '请选择时间范围'
        });
        return;
        }
        var obj={startDate:that.dateVal[0],endDate:that.dateVal[1]};
        that.exporting=true;
        var res = await that.$http.postDownload("/api/WeekReview/manager/export",obj)
        that.exporting=false;
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
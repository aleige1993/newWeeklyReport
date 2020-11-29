<template>
  <div class="waige" v-if="week">
      <el-breadcrumb separator="/"> 
    <el-breadcrumb-item :to="{ path: '/index/weekreport' }">周报列表</el-breadcrumb-item>
    <el-breadcrumb-item>{{week.employeeName}}-周报详情</el-breadcrumb-item>
    </el-breadcrumb>
      <el-tabs v-model="activeName"  type="border-card" style="margin-top:30px">
        <el-tab-pane label="工作总结" name="first">
            <el-table :header-cell-style="{ background: '#fafafa' }" :data="week.weekPlans" size="small" border style="width: 100%">
            <el-table-column
              v-for="(item, index) in columnData"
              :key="index"
              v-bind="item"
            >
            </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="问题与改进措施" name="second" >
            <el-collapse v-model="collapseVal">
              <el-collapse-item v-for="(item, index) in week.weekMend" :key="index" :title="item.content" :name="index">
                <div>{{item.mend}}</div>
              </el-collapse-item>
            </el-collapse>

        </el-tab-pane>
        <el-tab-pane label="下周工作计划" name="third">
           <div v-for="(wnp,index) in week.weekNextPlans" :key="index" class="fors">
              {{(index+1)+'、'+wnp  }}
            </div> 
        </el-tab-pane>
        <el-tab-pane label="批复内容" name="fourth">
          {{week.replyContent}}
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
export default {
  name: "reportdateil",
  data() {
    return {
      activeName:'first',
      week:null,
      columnData:[
        {
          label: "内容",
          prop: "content",
          minWidth: "40%",
        }, {
          label: "轨迹",
          prop: "action",
          minWidth: "40%",
        }, {
          label: "结果",
          prop: "result",
          minWidth: "40%",
        },
      ]
    };
  },

  async mounted() {
    let that=this;
    let id= that.$route.params.id;
    var res = await that.$http.get(`/api/WeekReview/manager/${id}`);
    if(res.code =='0'){
      that.week=res.data;
    }
  },
  computed:{
    collapseVal:function(){
      let that=this;
      let arr=[];
      that.week.weekMend.map((m,i)=>{
        arr.push(i);
      });
      console.info(arr);
      return arr;
    }
  },
  methods: {
    goback(){
        this.$router.go(-1);
    }
  },
};
</script>
<style lang='css' scoped>
.fors{
  margin-top:20px;
}
.tongyi{
/* padding: 30px; */
width: 100%;
}
.conte{
  flex: 1;
}
.tonger span{
  display: inline-block;
  width:25px;
  height: 25px;
  border-radius:100%;
  background-color: #f2f2f2;
  text-align: center;
  line-height: 25px;
  margin-right: 6px;
}
.tonger{
  display: flex;
}
.waige {
  padding: 40px;
}
.marigtop{
  margin-top: 20px;
}
.marigbot{
  margin-bottom: 20px;
}
.rightflex{
  display: flex;
  justify-content: space-between;
}
.pagination{
  text-align: right;
  margin-top: 20px;
}
.modebitsubt{
  margin-top: 20px;
  text-align: right;
  padding-right: 70px;
}
</style>
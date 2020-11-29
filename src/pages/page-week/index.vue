<template>
  <div class="waige">
    <el-row>
      <el-col>
        <div class="rightflex marigbot">
          <div>
            <el-button type="primary" @click="exportFn()" size="small"
              ><i class="el-icon-download"></i> 周报下载</el-button
            >
          </div>
          <div>
            <el-input
            v-model="query.employeeName"
            style="width: 200px"
            size="small"
            placeholder="输入姓名检索"
          ></el-input>
          <el-button type="primary" size="small" @click="onSOSO"
            >搜索</el-button
          >
          </div>
          
        </div>
      </el-col>
    </el-row>
    <div class="biaoge">
      <el-row>
        <el-col>
          <el-table :header-cell-style="{ background: '#fafafa' }" :data="tableData" size="small" border style="width: 100%">
            <el-table-column
              v-for="(item, index) in columnData"
              :key="index"
              v-bind="item"
            >
            </el-table-column>
            <el-table-column v-bind='{label: "操作",minWidth: "70%",prop: "opention"}'>
            <template slot-scope="scope">
<div>
                  <el-button
                    @click="clickRow(scope.row)"
                    type="warning"
                    size="small"
                    icon="el-icon-sort"
                    >查看详情</el-button
                  >
                  <!--<el-popconfirm
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    icon="el-icon-info"
                    icon-color="red"
                    title="确定删除吗？"
                    @confirm="deltRow(scope.row)"
                  >
                    <el-button
                      slot="reference"
                      type="danger"
                      size="small"
                      icon="el-icon-delete"
                      >删除</el-button
                    >
                  </el-popconfirm>-->
                </div>
                </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
          <div class="pagination">
            <el-pagination background layout="prev, pager, next" @current-change="getList" :current-page.sync="currentPage" :page-count="totalPage">
          </el-pagination>
          </div> 
    </div>
 <el-dialog title="导出" :visible.sync="drawer">
        <week-export @close="drawer=false" />
    </el-dialog>
  </div>
</template>

<script>
import weekExport from "./export";
export default {
  name: "weekreport",
  props: [""],
  components:{weekExport},
  data() {
    let that=this;
    return {
      drawer:false,
      totalPage:0,
      currentPage:1,
      query:{
          employeeName:''
      },
      tableData: [],
      columnData: [
        {
          label: "姓名",
          prop: "employeeName",
          minWidth: "40%",
        },
        {
          label: "提交时间",
          prop: "weekDate",
          minWidth: "40%",
          formatter:function(row,cell,val){
            return val.substr(0,10);
          }
        },
        {
          label: "周报状态",
          prop: "status",
          minWidth: "40%",
          formatter:function(row,cell,val){
            return that.$Tool.getEnumTextByValue('weekStatus',val);
          }
        },
         {
          label: "审批人",
          prop: "replyName",
          minWidth: "40%",
        }
      ],
    };
  },
  computed: {},

  created() {
    this.onSOSO();
  },

  methods: {
    onSOSO() {
      this.currentPage=1;
      this.getList();
    },
    async getList(){
        let that=this;
        let data={
            page:that.currentPage,
            pageSize:that.$config.PAGE_SIZE,
            query:that.query
        };
        var res = await that.$http.post('/api/WeekReview/manager/list',data);
        if (res.code =='0') {
            that.tableData=res.data.rows;
            if(res.data.totalPage){
                that.totalPage=res.data.totalPage;
                console.info('total',that.totalPage);
            }
        }
    },
  
    clickRow(scope) {
       this.$router.push({name:'reportdateil',params:{id:scope.id}});
    },
    exportFn(){
      this.drawer=true;
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
<template>
  <div class="waige">
    <el-row>
      <el-col>
        <div class="rightflex marigbot">
          <div>
            <el-button type="primary" @click="exportFn()" size="small"
              ><i class="el-icon-download"></i>导出意见</el-button
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
                 <el-switch
                    :value="getStatus(scope)"
                    @change="switchChanged(scope)"
                    active-text="显示"
                    inactive-text="隐藏">
                    </el-switch>
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
  </div>
</template>

<script>
export default {
  name: "opinion",
  props: [""],
  data() {
    return {
      totalPage:0,
      currentPage:1,
      query:{
          employeeName:''
      },
      tableData: [],
      columnData: [
        {
          label: "标题",
          prop: "title",
          minWidth: "50%",
        },
        {
          label: "发表人",
          prop: "employeeName",
          minWidth: "30%",
        },
        {
          label: "分类",
          prop: "categoryName",
          minWidth: "40%",
        },
        {
          label: "电话",
          prop: "mobilePhone",
          minWidth: "30%",
        },
         {
          label: "发表时间",
          prop: "createTime",
          minWidth: "30%",
          formatter:function(row,cell,val){
            return val.substr(0,10);
          }
        },
         {
          label: "意见内容",
          prop: "content",
        }
      ],
    };
  },
  computed: {},

  created() {this.onSOSO();},

  methods: {
    onSOSO() {this.currentPage=1;
        this.getList();},
async getList(){
        let that=this;
        let data={
            page:that.currentPage,
            pageSize:that.$config.PAGE_SIZE,
            query:that.query
        };
        var res = await that.$http.post('/api/Suggestion/manager/list',data);
        if (res.code =='0') {
            that.tableData=res.data.rows;
            if(res.data.totalPage){
                that.totalPage=res.data.totalPage;
                console.info('total',that.totalPage);
            }
        }
        },
        async switchChanged(scope){
          var status=scope.row.status=='Y'?'N':'Y';
          var that=this;
          var res = await that.$http.get(`/api/Suggestion/manager/${scope.row.id}`,{status:status});
          if(res.code =='0'){
scope.row.status = status;
          }
          
        },
        getStatus(scope){
          return scope.row.status == 'Y';
        },
       async exportFn(){
          var that=this;
          var res = await that.$http.postDownload("/api/Suggestion/manager/export",that.query)
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
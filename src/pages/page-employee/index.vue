<template>
  <div class="waige">
    <el-row>
      <el-col>
        <div class="rightflex marigbot">
          <div>
            <el-button type="primary" @click="adduser()" size="small"
              ><i class="el-icon-plus"></i> 新增员工</el-button
            >
          </div>
          <div>
            <el-input
            style="width: 200px"
            size="small"
            placeholder="输入手机号查询"
            v-model="query.mobilePhone"
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
                    type="primary"
                    size="small"
                    icon="el-icon-edit"
                    >修改</el-button
                  >
                  <el-popconfirm
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
                  </el-popconfirm>

                  <el-popconfirm
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    icon="el-icon-info"
                    icon-color="red"
                    title="确定重置密码吗？"
                    @confirm="reset(scope.row)"
                  >
                    <el-button
                      slot="reference"
                      type="warning"
                      size="small"
                      >重置密码</el-button
                    >
                  </el-popconfirm>
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
    <el-dialog :title="empID=='0'?'新增员工信息':'修改员工信息'" :visible.sync="drawer" @closed="drawerClose">
        <user-edit v-if="empID!=''" :id="empID" @close="drawerClose" />
    </el-dialog>
  </div>
</template>

<script>
import userEdit from "./edit";
export default {
  name: "userInfo",
  props: [""],
  components:{userEdit},
  data() {
    return {
      empID:'',
      totalPage:0,
      currentPage:1,
      drawer: false,
      query:{
          mobilePhone:''
      },
      tableData: [],
      columnData: [
        {
          label: "姓名",
          prop: "employeeName",
          minWidth: "30%",
        },
        {
          label: "手机号码",
          prop: "mobilePhone",
          minWidth: "30%",
        },
        {
          label: "部门",
          prop: "depNames",
          minWidth: "60%",
          formatter:function(row,column,val){
              return val.join(',')
          }
        },
        {
          label: "结构部门",
          prop: "logicDepNames",
          minWidth: "60%",
          formatter:function(row,column,val){
              return val.join(',')
          }
        },
        {
          label: "角色职位",
          prop: "posNames",
          minWidth: "60%",
          formatter:function(row,column,val){
              return val.join(',')
          }
        },
        {
          label: "是否领导",
          prop: "departmentLeader",
          minWidth: "20%",
          formatter:function(row,column,val){
              return val==1?"是":"否";
          }
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
        var res = await that.$http.post('/api/Employee/list',data);
        if (res.code =='0') {
            that.tableData=res.data.rows;
            if(res.data.totalPage){
                that.totalPage=res.data.totalPage;
                console.info('total',that.totalPage);
            }
        }
    },
    adduser() {
      this.empID = '0'
      this.drawer = true;
    },
    drawerClose(flag) {
      let that=this;
      that.drawer = false;
      that.empID='';
      if(flag){
        that.currentPage=1;
        that.getList();
      }
    },
    clickRow(scope) {
      this.drawer = true;
      this.empID = scope.empID;
    },
    async deltRow(scope) {
        let that=this;
        var res = await that.$http.post(`/api/Employee/delete/${scope.empID}`);
        if (res.code =='0') {
            that.onSOSO();
        }
    },
    async reset(scope){
        let that=this;
        var res = await that.$http.post(`/api/Employee/resetpwd/${scope.empID}`);
        if (res.code =='0') {
            that.$notify.info({
                title: '消息',
                message: '重置成功'
            });
        }
    },
  },
};
</script>
<style lang='css' scoped>
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

</style>
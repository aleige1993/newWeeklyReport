<template>
  <div class="waige">
    <el-row>
      <el-col>
        <div class="rightflex marigbot">
          <div>
            <el-button type="primary" @click="addRole()" size="small"
              ><i class="el-icon-plus"></i> 新增角色</el-button
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
    <el-dialog width="30%" :title="id=='0'?'新增角色':'修改角色'" :visible.sync="drawer" @closed="drawerClose">
        <role-edit v-if="id!=''" :id="id" @close="drawerClose" />
    </el-dialog>
  </div>
</template>

<script>
import roleEdit from "./edit";
export default {
  name: "rolepart",
  props: [""],
  components:{roleEdit},
  data() {
    return {
      id:'',
      drawer: false,
      totalPage:0,
      currentPage:1,
      tableData: [],
      columnData: [
        {
          label: "角色职称",
          prop: "positionName",
          minWidth: "80%",
        },
        {
          label: "权限",
          prop: "auths",
          minWidth: "80%",
          formatter:function(row,column,val){
            var arr=val.map(m=>m.name);
              return arr.join(',');
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
        var res = await that.$http.post('/api/Position/list',data);
        if (res.code =='0') {
            that.tableData=res.data.rows;
            if(res.data.totalPage){
                that.totalPage=res.data.totalPage;
            }
        }
    },
    addRole() {
      this.id='0'
      this.drawer = true;
    },
    drawerClose(flag) {
      this.id=''
      this.drawer = false;
      if(flag){
        this.onSOSO();
      }
    },
    clickRow(scope) {
      this.drawer = true;
      this.id=scope.id;
    },
    async deltRow(scope) {
          var that=this;
          var res = await that.$http.get(`/api/Position/delete/${scope.id}`);
          if(res.code =='0'){
            that.onSOSO();
          }
    }
  },
};
</script>
<style lang='css' scoped>
.waige {
  padding: 40px;
  width: 80%;
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
<template>
  <div id="left-nav">
    <el-menu
      :default-active="actinav"
      class="el-menu-vertical-demo" 
       background-color="#545c64"
       router
      text-color="#fff"
      active-text-color="#409EFF"> 
      <el-menu-item index="/index/userInfo">
        <i class="el-icon-menu"></i>
        <span slot="title">员工信息管理</span>
      </el-menu-item>
      <el-menu-item index="/index/weekreport">
        <i class="el-icon-document"></i>
        <span slot="title">周报信息管理</span>
      </el-menu-item>
      <el-menu-item index="/index/opinion">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">匿名意见管理</span>
      </el-menu-item>
      <el-menu-item index="/index/rolepart">
        <i class="el-icon-setting"></i>
        <span slot="title">角色权限管理</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'leftNav',
    data() {
      return {
        activeIndex:1,
        actinav:''
      };
    },
    watch:{
      $route(to,from){
        console.log(to.path);
        if(to.path == '/index/reportdateil'){
          this.actinav == '/index/weekreport'
        }
      }
    },
    mounted(){
      console.log(this.$route.path)
      this.actinav = this.$route.path
      if(this.$route.path == '/index/reportdateil'){
          this.actinav == '/index/weekreport'
        }
    },
    methods: { 
      // clickMenu(index, childIndex) {
      //   this.$store.dispatch('setMenuList', this.$store.getters.menuList.map((item, _index) => {
      //     if (typeof childIndex === 'undefined') {
      //       item.active = (_index === index);
      //     }
      //     if (item.childMenus && item.childMenus.length) {
      //       item.childMenus.map((childItem, _childIndex) => {
      //         childItem.active = (_index === index) && (_childIndex === childIndex);
      //         return item.childMenus;
      //       });
      //     }
      //     return item;
      //   }));
      // }
    },
    computed: {
      // menuList() {
      //   return this.$store.getters.menuList;
      // }
    }
  };
</script>

<style lang="scss" scoped>
  .el-menu {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: #383e4b;
    li {
      h1, a {
        display: inline-block;
        width: 100%;
        cursor: pointer;
      }
      .title, .firstMenu {
        height: 50px;
        padding-left: 15px;
        line-height: 50px;
        color: #fff;
      }
      .secondMenu {
        height: 40px;
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #e1e1e1;
        background: #f3f3f3;
        span{
          padding-left: 5px;
          border-left: 3px solid #f3f3f3;
          &.active {
            color: #ea7519;
            border-left: 3px solid #ea7519;
          }
        }
      }
      &.active{
        background: #2d323d;
      }
      &.menu {
        h1 {
          background: url("img/left.png") 155px 20px no-repeat;
        }
        &.active {
          h1 {
            background: #2d323d url("img/down.png") 150px 20px no-repeat;
          }
        }
      }
      a:hover {
        text-decoration: none;
      }
    }
  }
</style>



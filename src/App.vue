<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    this.$UserLogin.isLogin();
  }
}
</script>

<style>
.el-popconfirm__action{
  text-align: right;
  margin-top: 10px;
}
 .nodata{
    width:100%;
    margin-top:20%;
    text-align: center;
    font-size: 24px;
    color:#999;
    background-color: #EDEDF0;
  }
</style>

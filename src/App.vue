<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    this.$userLogin.isLogin();
    var enumList=[];
    enumList.push({
      EnumName:'weekStatus',
      items:[{text:'草稿',value:'Drafted'},
      {text:'已提交',value:'Submited'},
      {text:'已批复',value:'Replyed'}]
    });
    this.$store.commit('setEnumList', enumList);
  }
}
</script>

<style>
.el-popconfirm__action{
  text-align: right;
  margin-top: 10px;
}
</style>

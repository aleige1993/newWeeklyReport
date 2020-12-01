<template>
  <div id="page-home">
  </div>
</template>
<script> 
  export default {
    name: 'pageHome',
    data() {
      return { 
      };
    },
    components: { 
    },
    computed: {
      qrCodeUrl() { 
      }
    }
  };
</script>
<style lang="scss" scoped>
  .qrcode {
    margin-top: 60px;
    text-align: center;
    p {
      font-size: 16px;
    }
  }
  .ivu-row{
    margin-bottom: 20px;
  }
  .card-title{
    padding-left: 22px;
    &.msg{
      background: url('img/icon-msg.png') left center no-repeat;
    }
    &.alert{
      background: url('img/icon-alert.png') left center no-repeat;
    }
    &.list{
      background: url('img/icon-list.png') left center no-repeat;
    }
    &.clock{
      background: url('img/icon-clock.png') left center no-repeat;
    }
  }
  .msg-list{
    padding: 10px 10px;
    ul{
      li{
        height: 34px;
        a{
          display: block;
          height: 34px;
          line-height: 34px;
//          @include single-ellipsis;
        }
      }
    }
  }
  .chart-number{
    margin-top: 32px;
    p{
      margin-bottom: 14px;
//      @include single-ellipsis;
      &:last-child{
        margin-bottom: 0
      }
    }
  }
</style>

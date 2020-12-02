<template>
    
    <div> 
        <router-view/>
    </div>
    <!-- <footer>
      footer
    </footer> -->
</template>

<script>
 
  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='css' >
  .magin_main{
    width: 100%;
    padding:120px 20px 30px 20px;
  }
  .nodata{
    width:100%;
    margin-top:30%;
    text-align: center;
    font-size: 24px;
    color:#ddd;
  }
</style>
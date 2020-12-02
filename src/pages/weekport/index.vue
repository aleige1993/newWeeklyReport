<template>
    <div>
      <Headers/>
      <main class="magin_main"> 
          <router-view/>
      </main>
    </div>
    
    <!-- <footer>
      footer
    </footer> -->
</template>

<script>

import Headers from '../../components/headers'
  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {Headers},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='css'>
  .magin_main{
    width: 100%;
    padding:120px 20px 30px 20px;
  }
</style>
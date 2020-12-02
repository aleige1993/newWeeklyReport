<template>
  <div class="headers">
    <div class="leftcss" @click="onGoBack">
      <img src="../assets/img/left_jt.png" alt="" />
    </div>
    <div class="content" v-if="gethdData.rose == 0">{{ meat }}</div>
    <div class="content" v-else>
      {{ gethdData.txt }}
      <span v-if="gethdData.rose == 2" class="end1">{{ gethdData.end }}</span>
      <span v-if="gethdData.rose == 3" class="end2">{{ gethdData.end }}</span>
      <span v-if="gethdData.rose == 4" class="end3">{{ gethdData.end }}</span>
    </div>
    <div class="rightcss" v-if="soso == 'soso'" @click="gotososo">
      <img src="@/assets/img/icon_soso.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "headers",
  props: [""],
  data() {
    return {
      meat: "",
      soso: "",
    };
  },
  mounted() {
    this.$store.state.HeadData = {
      rose: 0, //0：不变 1:直接赋值 2：查看name 3:延迟上报 4：已逾期
      txt: "", // rose == 1 && txt!= null
      end: "", // rose > 1 展示的不同类型的内容
    };
    this.meat = this.$route.meta.title;
    this.soso = this.$route.meta.hd;
  },
  watch: {
    // watch 是对象，用于监听属性使用
    $route: {
      handler: function (val, oldVal) {
        this.meat = this.$route.meta.title;
        this.soso = this.$route.meta.hd;
      },
      deep: true, // 深度观察监听
    },
  },
  computed: {
    gethdData: function () {
      return this.$store.state.HeadData;
    },
  },
  methods: {
    onGoBack() {
      this.$store.state.HeadData = {
        rose: 0, //0：不变 1:直接赋值 2：查看name 3:延迟上报 4：已逾期
        txt: "", // rose == 1 && txt!= null
        end: "", // rose > 1 展示的不同类型的内容
      };
      this.$router.go(-1);
    },
    gotososo() {
      this.$router.push({ name: "weeksoso" });
    },
  },
};
</script>
<style lang='css' scoped>
.end1 {
  color: #005c8d;
}
.end2 {
  color: #ff8a56;
}
.end3 {
  color: #f13939;
}
.headers {
  width: 100%;
  height: 90px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  border-bottom: 1px solid #d4d4d4;
}
.leftcss,
.rightcss {
  display: inline-block;
  height: 90px;
  text-align: center;
  line-height: 90px;
  position: absolute;
  z-index: 2;
}
.leftcss {
  width: 80px;
  top: 0;
  left: 0;
}
.rightcss {
  right: 0;
  top: 0;
  width: 120px;
}

.leftcss img {
  display: inline-block;
  width: 12px;
  height: 22px;
}
.content {
  width: 100%;
  height: 90px;
  text-align: center;
  line-height: 90px;
}
.rightcss img {
  display: inline-block;
  width: 36px;
  height: 36px;
}
</style>
<template>
  <div class="scroll_views">
    <div class="one boxfill">
      <div class="zongjie newzongjie">
        <span class="colora tiltes">意见类别</span>
        <div class="right_type">
          <span>{{ valueCol }}</span>
        </div>
      </div>
      <!-- <div class="text_aere" :class='message ? "":"text_aere_img"'>
             <van-field
                class="input_file"
                v-model="message"
                rows="1"
                autosize 
                type="textarea"
                placeholder="请填写工作总结"
                />
          </div> -->
    </div>
    <div class="one boxfill">
      <div class="zongjie">
        <span class="colorb tiltes">意见标题</span>
      </div>
      <div class="text_aere" :class="tiltes ? '' : 'text_aere_img'">
        <van-field
          class="input_file"
          readonly
          v-model="tiltes"
          rows="1"
          autosize
          type="textarea"
          placeholder="请填写意见标题"
        />
      </div>
    </div>
    <div class="one boxfill">
      <div class="zongjie">
        <span class="color2 tiltes">意见内容</span>
      </div>
      <div class="text_aere" :class="message ? '' : 'text_aere_img'">
        <van-field
          readonly
          class="input_file"
          v-model="message"
          rows="1"
          autosize
          type="textarea"
          placeholder="请填写意见内容"
        />
      </div>
    </div>
  </div>
</template>

<script> 
export default {
  name: "feedbackfillin",
  props: [""],
  data() {
    return {
      showIcon: false,
      tiltes: "",
      message: "",
      showPicker: false,
      params: "",
      isReview: false,
      date: "",
      columns: [],
      valueCol: "",
    };
  },
  computed: {},

  beforeMount() {},

  mounted() {
    if (this.$route.query) {
      let query = this.$route.query;
      this.tiltes = query.title;
      this.valueCol = query.categoryName;
      this.message = query.content;
      this.date = query.createTime;
    }
    this.getTypes();
  },

  methods: {
    getTypes() {
      this.$HttpApi
        .get("/api/SuggestionCategory/list")
        .then((res) => {
          if (res.code == 0) {
            this.columns = res.data;
          } else {
            this.$notify({
              message: res.message,
              type: "danger",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handlPicker(bel) {
      this.showPicker = bel;
    },
    onConfirm(value) {
      this.valueCol = value;
      this.showPicker = false;
    },
  },

  watch: {},
};
</script>
<style lang='css' scoped>
.scroll_views {
  padding-bottom: 90px;
}
.but_box {
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 30px;
  left: 3%;
  width: 94%;
  z-index: 2;
}
.but_action {
  width: 100%;
  height: 70px;
}
.boxfill {
  background-color: #fff;
  padding: 30px;
  border-radius: 20px;
  margin-bottom: 30px;
}
.colora {
  background-color: #7dc0b6;
}
.colorb {
  background-color: #c0ab7d;
}
.color2 {
  background-color: #96c0d6;
}
.tiltes {
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  font-size: 24px;
  border-radius: 20px;
}
.text_aere {
  margin-top: 30px;
  background-size: 28px;
  background-position: right;
  background-repeat: no-repeat;
}
.text_aere_img {
  background-image: url(../../assets/img/icon_bj.png);
}
.input_file {
  font-size: 28px;
  padding: 0;
  line-height: 36px;
  background-color: transparent;
}
.right_type {
  display: flex;
  justify-content: flex-end;
}
.right_jt {
  width: 18px;
  height: 28px;
  margin-left: 20px;
}
.newzongjie {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.right_type span {
  font-size: 28px;
}
</style>
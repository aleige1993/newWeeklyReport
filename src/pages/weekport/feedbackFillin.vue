<template>
  <div>
    <div class="scroll_views">
      <div class="one boxfill">
        <div class="zongjie newzongjie" v-if="!isReview">
          <span class="colora tiltes">意见类别</span>
          <div class="right_type" @click="handlPicker(true)">
            <span v-if="istype == ''" class="clasrt">请选择类型</span>
            <span v-else>{{ istype }}</span>
            <img class="right_jt" src="@/assets/img/right_jt.png" alt="" />
          </div>
        </div>
         <div class="zongjie newzongjie margin" v-if="!isReview">
          <span class="colorc tiltes">所属部门</span>
          <div class="right_type" @click="handlPicker2(true)">
            <span v-if="istype2 == ''" class="clasrt">请选择部门</span>
            <span v-else>{{ istype2 }}</span>
            <img class="right_jt" src="@/assets/img/right_jt.png" alt="" />
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
            :readonly="isReview"
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
            :readonly="isReview"
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
    <div class="but_box" v-if="!isReview">
      <van-button
        class="but_action"
        round
        type="primary"
        color="#005C8D"
        @click="submitfeedback"
        >提交意见</van-button
      >
    </div>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        value-key="name"
        @cancel="handlPicker(false)"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-popup v-model="showPicker2" round position="bottom">
      <van-picker
        show-toolbar
        :columns="departmentList"
        value-key="name"
        @cancel="handlPicker2(false)"
        @confirm="onConfirm2"
      />
    </van-popup>
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
      showPicker2:false,
      params: "",
      isReview: false,
      istype: "",
      istype2: "",
      columns: [],
      departmentList:[],
      valueCol: "",
      valueCol2: "",
    };
  },
  computed: {},

  beforeMount() {},

  mounted() {
    this.getTypes();
    this.getDepartment()
  },

  methods: {
     getDepartment() {
      this.$HttpApi
        .get("/api/Department/list")
        .then((res) => {
          if (res.code == 0) {
            this.departmentList = res.data;
          } else {
            this.$notify({
              message: res.data.message,
              type: "danger",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTypes() {
      this.$HttpApi
        .get("/api/SuggestionCategory/list")
        .then((res) => {
          if (res.code == 0) {
            this.columns = res.data;
          } else {
            this.$notify({
              message: res.data.message,
              type: "danger",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    submitfeedback() {
      if (this.tiltes == "") {
        this.$notify({
          message: "请填写标题",
          type: "danger",
        });
        return false;
      } else if (this.message == "") {
        this.$notify({
          message: "请填写意见内容",
          type: "danger",
        });
        return false;
      } else if (this.istype == "") {
        this.$notify({
          message: "请选择意见类型",
          type: "danger",
        });
        return false;
      }else if (this.istype2 == "") {
        this.$notify({
          message: "请选择所属部门",
          type: "danger",
        });
        return false;
      }
      this.$HttpApi
        .post("/api/Suggestion/submit", {
          title: this.tiltes,
          categoryID: this.valueCol.value,
          content: this.message,
          departmentID: this.valueCol2.value,
        })
        .then((res) => {
          let rescodes = res.data;
          if (rescodes.code == 0) {
            this.$toast.success("提交成功!");
            setTimeout(() => {
              this.$router.push("/layout/myfeedback");
            }, 2500);
          } else {
            this.$notify({
              message: rescodes.message,
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
    handlPicker2(bel) {
      this.showPicker2 = bel;
    },
    onConfirm(value) {
      this.valueCol = value;
      this.istype = value.name;
      this.showPicker = false;
    },
    onConfirm2(value) {
      this.valueCol2 = value;
      this.istype2 = value.name;
      this.showPicker2 = false;
    },
  },

  watch: {},
};
</script>
<style lang='css' scoped>
.margin{
  margin-top: 30px;
}
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
.colorc {
  background-color: #9BC07D;
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
.clasrt {
  color: #999;
}
</style>
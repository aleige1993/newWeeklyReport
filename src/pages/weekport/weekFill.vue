<template>
  <div>
    <div class="headers">
      <div class="leftcss" @click="onGoBack">
        <img src="@/assets/img/left_jt.png" alt="" />
      </div>
      <div class="content">填写周报</div>
    </div>

    <div class="scroll_view">
      <p class="time_p">周报时间： {{ weekstart }}至{{ weekend }}</p>
      <div class="zhoubaofill">
        <div class="hede">
          <div class="hd_l">
            <img class="tu1" src="@/assets/img/icon_rq.png" alt="" />
            <span>本周工作总结</span><sup>*</sup>
          </div>
          <div class="hd_r" v-if="isWeekFill != true" @click="addpanl(1)">
            <img
              v-if="isStuts == 1"
              class="tu2"
              src="@/assets/img/icon_add.png"
              alt=""
            />
            <img
              v-else
              class="tu2"
              src="@/assets/img/icon_add_dis.png"
              alt=""
            />
          </div>
        </div>
        <div class="conter_text">
          <!-- <p class="addtext">已逾期</p> -->
          <!-- <p class="addtext">请在右侧添加内容</p> -->
          <li
            class="listQA"
            v-for="(item, index) in weekPlans1"
            :key="index"
            @click="addpanl(1, item, index)"
          >
            <span class="num">{{ index + 1 }}</span>
            <span class="tilts van-ellipsis">{{ item.content }}</span>
            <img src="@/assets/img/right_jt.png" alt="" />
          </li>
        </div>
      </div>
      <div class="zhoubaofill">
        <div class="hede">
          <div class="hd_l">
            <img class="tu3" src="@/assets/img/icon_bd.png" alt="" />
            <span>存在问题及改进措施</span><sup>*</sup>
          </div>
          <div class="hd_r" v-if="isWeekFill != true" @click="addpanl(2)">
            <img
              v-if="isStuts == 1"
              class="tu2"
              src="@/assets/img/icon_add.png"
              alt=""
            />
            <img
              v-else
              class="tu2"
              src="@/assets/img/icon_add_dis.png"
              alt=""
            />
          </div>
        </div>
        <div class="conter_text">
          <!-- <p class="addtext">请在右侧添加内容</p> -->
          <li
            class="listQA"
            v-for="(item, index) in weekMend1"
            :key="index"
            @click="addpanl(2, item, index)"
          >
            <span class="wt_num">问题{{ index + 1 }}</span>
            <span class="tilts van-ellipsis">{{ item.content }}</span>
            <img src="@/assets/img/right_jt.png" alt="" />
          </li>
        </div>
      </div>
      <div class="zhoubaofill">
        <div class="hede">
          <div class="hd_l">
            <img class="tu1" src="@/assets/img/icon_sj.png" alt="" />
            <span>下周工作计划</span><sup>*</sup>
          </div>
          <div class="hd_r" v-if="isWeekFill != true" @click="addpanl(3)">
            <img
              v-if="isStuts == 1"
              class="tu2"
              src="@/assets/img/icon_add.png"
              alt=""
            />
            <img
              v-else
              class="tu2"
              src="@/assets/img/icon_add_dis.png"
              alt=""
            />
          </div>
        </div>
        <div class="conter_text">
          <!-- <p class="addtext">请在右侧添加内容</p> -->
          <li
            class="listQA"
            v-for="(item, index) in weekNextPlans1"
            :key="index"
            @click="addpanl(3, item, index)"
          >
            <span class="num">{{ index + 1 }}</span>
            <span class="tilts van-ellipsis">{{ item }}</span>
            <img src="@/assets/img/right_jt.png" alt="" />
          </li>
        </div>
      </div>
    </div>
    <!-- <div class="gubottom">
        <van-button class="zdbutton" round type="primary" color='#005C8D'>提交周报</van-button> 
    </div> -->
    <div class="but_box" v-if="!isWeekFill">
      <!-- isUpdate -->
      <van-badge class="updatacase" :dot="isUpdate">
        <van-button
          class="but_action"
          round
          type="primary"
          color="#C0AB7D"
          @click="savePanl(0)"
          >保存周报</van-button
        >
      </van-badge>
      <van-badge class="updatacase">
        <van-button
          class="but_action"
          round
          type="primary"
          color="#005C8D"
          @click="savePanl(1)"
          >提交周报</van-button
        >
      </van-badge>
    </div>
  </div>
</template>

<script>
import { getWeekDay, getWeek, getNewData } from "../../assets/js/util";
export default {
  name: "weekfill",
  props: [""],
  data() {
    return {
      isStuts: 1,
      weekPlans: [],
      weekNextPlans: [],
      weekMend: [],
      weekstart: "",
      weekend: "",
      isCheck: false,
    };
  },
  computed: {
    weekPlans1: function () {
      return this.$store.state.addWeekReport.weekPlans;
    },

    weekNextPlans1: function () {
      return this.$store.state.addWeekReport.weekNextPlans;
    },
    weekMend1: function () {
      return this.$store.state.addWeekReport.weekMend;
    },
    isUpdate: function () {
      return this.$store.state.isUpdate;
    },
    isWeekFill: function () {
      if (this.$store.state.isWeekFill == "Submited") {
        this.isCheck = true;
        return true;
      } else {
        this.isCheck = false;
        return false;
      }
    },
  },

  beforeMount() {},

  mounted() {
    let week = getWeekDay();
    let weekend = getNewData(week, 6);
    this.weekstart = week;
    this.weekend = weekend;
  },

  methods: {
    addpanl(num, item, index = "") {
      if (num == 1) {
        this.$router.push({
          name: "portDetail",
          params: {
            content: item ? item.content : "",
            action: item ? item.action : "",
            result: item ? item.result : "",
            index: index,
            isCheck: this.isCheck,
          },
        });
      } else if (num == 2) {
        this.$router.push({
          name: "portDetail2",
          params: {
            content: item ? item.content : "",
            mend: item ? item.mend : "",
            index: index,
            isCheck: this.isCheck,
          },
        });
      } else if (num == 3) {
        this.$router.push({
          name: "portDetail3",
          params: {
            content: item ? item : "",
            index: index,
            isCheck: this.isCheck,
          },
        });
      }
    },
    savePanl(val) {
      let addWeekReport = this.$store.state.addWeekReport;
      if (val == 1) {
        if (addWeekReport.weekPlans.length == 0) {
          this.$notify({
            message: "本周工作总结不能为空",
            type: "danger",
          });
          return false;
        } else if (addWeekReport.weekNextPlans.length == 0) {
          this.$notify({
            message: "下周工作计划不能为空",
            type: "danger",
          });
          return false;
        } else if (addWeekReport.weekMend.length == 0) {
          this.$notify({
            message: "存在问题及改进措施不能为空",
            type: "danger",
          });
          return false;
        }
      }

      let parms = {
        weekDate: this.weekstart,
        status: val,
        weekPlans: addWeekReport.weekPlans,
        weekNextPlans: addWeekReport.weekNextPlans,
        weekMend: addWeekReport.weekMend,
      };
      if (this.$store.state.isID) {
        parms.id = this.$store.state.isID;
      }
      this.$HttpApi
        .post("/api/WeekReview/save", parms)
        .then((res) => {
          let rescodes = res.data;
          if (rescodes.code == 0) {
            let str = val == 1 ? "提交成功" : "保存成功";
            this.$toast.success(str);
            this.$store.state.isID = "";
            this.$store.state.isUpdate = false;
            if (val != 0) {
              setTimeout(() => {
                this.$router.push("/user");
              }, 1500);
            }else{
              setTimeout(() => {
                this.$router.push("/layout/historyPort");
              }, 1500);
            }
            if (val == 1) {
              (addWeekReport.weekPlans = []),
                (addWeekReport.weekNextPlans = []),
                (addWeekReport.weekMend = []);
            }
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
    onGoBack() {
      this.$store.state.isUpdate = false;
      this.$router.replace({ path: "/user" });
    },
  },

  watch: {},
};
</script>
<style lang='css' scoped>
.time_p {
  width: 100%;
  height: 40px;
  background-color: #005c8d;
  color: #fff;
  text-align: center;
  font-size: 24px;
  border-radius: 20px;
  line-height: 40px;
}
.zhoubaofill {
  width: 100%;
  border-radius: 20px;
  background-color: #fff;
  padding: 46px 26px 0px 40px;
  margin-top: 30px;
  display: inline-block;
}
.hede {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}
.tu1 {
  display: inline-block;
  width: 28px;
  height: 28px;
  margin-right: 20px;
}
.tu2 {
  display: inline-block;
  width: 48px;
  height: 48px;
  margin-right: 20px;
}
.tu3 {
  display: inline-block;
  width: 26px;
  height: 30px;
  margin-right: 20px;
}
.hd_l span {
  color: #333;
  font-size: 32px;
  font-weight: bold;
}
.hd_l sup {
  color: red;
}
.conter_text {
  min-height: 60px;
}
.conter_text .addtext {
  color: #999;
  font-size: 28px;
  padding: 30px 0 50px 0;
}
.listQA {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin-top: 48px;
}
.zhoubaofill .listQA:last-child {
  margin-bottom: 48px;
}
.listQA .num {
  color: #fff;
  background-color: #cccccc;
  font-size: 24px;
  border-radius: 100%;
  text-align: center;
  display: inline-block;
  padding: 5px 10px;
}
.listQA img {
  display: inline-block;
  width: 14px;
  height: 28px;
  margin-right: 34px;
}
.listQA .tilts {
  flex: 1;
  margin-left: 20px;
  margin-right: 64px;
  line-height: 60px;
}
.wt_num {
  color: #fff;
  background-color: #cccccc;
  font-size: 24px;
  border-radius: 20px;
  text-align: center;
  display: inline-block;
  padding: 6px 16px;
}
.zdbutton {
  width: 100%;
  height: 70px;
}
.gubottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  padding: 20px;
}
.scroll_view {
  padding-bottom: 120px;
}
.but_box {
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 60px;
  left: 3%;
  width: 94%;
  z-index: 2;
}
.but_action {
  width: 96%;
  height: 70px;
}
.updatacase {
  width: 50%;
  text-align: center;
}
.headers {
  z-index: 10;
}
</style>
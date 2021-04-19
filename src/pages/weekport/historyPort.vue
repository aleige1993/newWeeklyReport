<template>
  <div>
    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="min-height:88vh;"> -->

    <!-- <van-list
            v-model:loading="loading"
            :finished="finished" 
            finished-text="没有更多了"
            offset="30"
            @load="onLoad"
        > -->
    <div class="nodata" v-if="list.length < 1">暂无数据~</div>
    <div class="history">
      <li v-for="(item, index) in list" :key="index" @click="gotoDateils(item)">
        <div class="titles">{{ dateChanges(item.weekDate) }}</div>
        <div class="rihtdiv">
          <div class="mv_colors1 gdcss" v-if="item.status == '待上报'">
            {{ item.status }}
          </div>
          <div class="mv_colors2 gdcss" v-if="item.status == '已上报'">
            {{ item.status }}
          </div>
          <div class="mv_colors5 gdcss" v-if="item.status == '延迟上报'">
            {{ item.status }}
          </div>
          <div class="mv_colors4 gdcss" v-if="item.status == '已逾期'">
            {{ item.status }}
          </div>
          <div class="mv_colors3 gdcss" v-if="item.status == '已批复'">
            {{ item.status }}
          </div>
          <img src="@/assets/img/right_jt.png" />
        </div>
      </li>

      <!-- <li>
            <div class="titles">2020 ( 04.25-04.30 )</div>
            <div class="rihtdiv">
                <div class="mv_colors2 gdcss">已上报</div>
                <img src="@/assets/img/right_jt.png">
            </div>
        </li>
        <li>
            <div class="titles">2020 ( 04.25-04.30 )</div>
            <div class="rihtdiv">
                <div class="mv_colors3 gdcss">已批复</div>
                <img src="@/assets/img/right_jt.png">
            </div>
        </li>
        <li>
            <div class="titles">2020 ( 04.25-04.30 )</div>
            <div class="rihtdiv">
                <div class="mv_colors4 gdcss">已逾期</div>
                <img src="@/assets/img/right_jt.png">
            </div>
        </li> -->
    </div>
    <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
    <!-- </van-list> -->
    <!-- </van-pull-refresh> -->
  </div>
</template>

<script>
import {
  getWeekDay,
  fromTime,
  getWeek,
  getNewData,
} from "../../assets/js/util";
export default {
  name: "history",
  props: [""],
  data() {
    return {
      list: [],
      refreshing: false,
      loading: false,
      finished: false,
    };
  },
  computed: {},

  beforeMount() {},

  mounted() {
    this.getUserportlist();
  },

  methods: {
    gotoUpdate(id, name) {
      this.$router.push({
        path: "/layout/weekfill",
        query: {
          isID: id,
        },
      });
    },
    gotoDateils(item) {
      console.log(item);
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      if (item.status == "待上报") {
           let week = fromTime(item.weekDate);
        if (item.weekID == 0) {
          this.$HttpApi
            .get(`/api/WeekReview/${week}`)
            .then((res) => {
              if (res.code == 0) {
                let addWeekReport = this.$store.state.addWeekReport;
                if (res.data && res.data.id) {
                  this.$store.state.weekstart = week
                  this.$store.state.isID = res.data.id;
                  this.$store.state.isWeekFill = res.data.status;
                }
                if (res.data == null) {
                     this.$store.state.weekstart = week
                    this.$store.state.isID = ''
                  addWeekReport.weekPlans = []
                    addWeekReport.weekNextPlans = []
                    addWeekReport.weekMend = []
                  this.$store.state.isWeekFill = "";
                } else {
                    this.$store.state.weekstart = week
                  addWeekReport.weekPlans = res.data.weekPlans
                    ? res.data.weekPlans
                    : []
                    addWeekReport.weekNextPlans = res.data.weekNextPlans
                      ? res.data.weekNextPlans
                      : []
                    addWeekReport.weekMend = res.data.weekMend
                      ? res.data.weekMend
                      : []
                }

                // this.$router.push({
                //     path: "/layout/weekfill"
                //   });
                 setTimeout(() => {
                  this.$toast.clear();
                  this.$router.push({
                    path: "/layout/weekfill"
                  });
                }, 2000);
              } else {
                this.$notify({
                  message: res.message,
                  type: "danger",
                });
              }
            })
            .catch((err) => {});
        } else {
          this.$HttpApi
            .get(`/api/WeekReview/leader/${item.weekID}`)
            .then((res) => {
              if (res.code == 0) {
                let addWeekReport = this.$store.state.addWeekReport;
                if (res.data.detail) {
                  if (res.data.detail.id) {
                       this.$store.state.weekstart = week
                    this.$store.state.isID = res.data.detail.id;
                    this.$store.state.isWeekFill = res.data.detail.status;
                  }
                }
                if (res.data.detail == null) {
                     this.$store.state.weekstart = week
                  addWeekReport.weekPlans = []
                    addWeekReport.weekNextPlans = []
                    addWeekReport.weekMend = []
                     this.$store.state.weekstart = ''
                } else {
                     this.$store.state.weekstart = week
                  addWeekReport.weekPlans = res.data.detail.weekPlans
                    ? res.data.detail.weekPlans
                    : []
                    addWeekReport.weekNextPlans = res.data.detail.weekNextPlans
                      ? res.data.detail.weekNextPlans
                      : []
                    addWeekReport.weekMend = res.data.detail.weekMend
                      ? res.data.detail.weekMend
                      : []
                }

                setTimeout(() => {
                  this.$toast.clear();
                  this.$router.push({
                    path: "/layout/weekfill",
                    query: {
                      isID: item.weekID,
                    },
                  });
                }, 2000);
              } else {
                this.$notify({
                  message: res.message,
                  type: "danger",
                });
                this.$toast.clear();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        this.$router.push({
          path: "/layout/weekCheck",
          query: {
            id: item.weekID,
            name: item.name,
            isLeader: 0,
            empStatus: item.status,
            empWeekDate: item.weekDate,
          },
        });
      }
    },
    getUserportlist() {
      this.$HttpApi
        .post("/api/WeekReview/list", {})
        .then((res) => {
          let rescodes = res.data;
          if (rescodes.code == 0) {
            this.list = rescodes.data;
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
    dateChanges(val) {
      if (val) {
        let week = val.slice(0, 10);
        let weekend = getNewData(week, 6);
        return `${week} 至 ${weekend}`;
      } else {
        return val;
      }
    },
  },

  watch: {},
};
</script>
<style lang='css' scoped>
.history {
  background-color: #fff;
  border-radius: 20px;
  padding-left: 37px;
}
.history li {
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  justify-content: space-between;
  min-height: 98px;
  align-items: center;
  padding-right: 40px;
}
.history li:last-child {
  border-bottom: none;
}
.rihtdiv {
  display: flex;
}
.rihtdiv img {
  width: 14px;
  height: 28px;
}
.gdcss {
  display: inline-block;
  padding: 6px 18px;
  border-radius: 16px;
  color: #fff;
  font-size: 20px;
  margin-right: 20px;
}
.mv_colors1 {
  background-color: #f99e9e;
}
.mv_colors2 {
  background-color: #79d47b;
}
.mv_colors3 {
  background-color: #6497b2;
}
.mv_colors4 {
  background-color: #cdcdcd;
}
.mv_colors5 {
  background-color: #ff8a56;
}
.titles {
  line-height: 60px;
}
</style>
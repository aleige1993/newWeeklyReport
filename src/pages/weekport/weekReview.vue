<template>

  <div class="magin_top1">
    <div class="tabls">
        <li @click="changesType(1)">
          <span :class="weekType == 1?'active':''">
            直属管理
          </span>
        </li>
        <li @click="changesType(2)">
          <span :class="weekType == 2?'active':''">
            间接管理
          </span>
        </li>
      </div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      style="min-height: 88vh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        offset="30"
        @load="onLoad"
      >
        <div class="nodata" v-if="list.length < 1">暂无数据~</div>
        <div class="history">
          <!-- <li>
            <div class="titles">111112020 ( 04.25-04.30 )</div>
            <div class="rihtdiv">
                <div class="mv_colors1 gdcss">待上报</div>
                <img src="@/assets/img/right_jt.png">
            </div>
        </li> -->
          <li
            v-for="(item, index) in list"
            :key="index"
            @click="gotoDateils(item)"
          >
            <div class="titles">
              {{ item.employeeName }} {{ dateChanges(item.weekDate) }}
            </div>
            <div class="rihtdiv">
              <div class="mv_colors1 gdcss" v-if="item.status == '待批复'">
                {{ item.status }}
              </div>
              <div class="mv_colors5 gdcss" v-if="item.status == '已延迟'">
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
        </li>
         <li>
            <div class="titles">2020 ( 04.25-04.30 )</div>
            <div class="rihtdiv">
                <div class="mv_colors5 gdcss">已延迟</div>
                <img src="@/assets/img/right_jt.png">
            </div>
        </li> -->
        </div>
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getWeekDay, getWeek, getNewData } from "../../assets/js/util";
export default {
  name: "history",
  props: [""],
  data() {
    return {
      list: [],
      refreshing: false,
      loading: false,
      finished: false,
      page: 1,
      pageSize: 20,
      weekType:1
    };
  },
  computed: {},

  beforeMount() {},

  mounted() {
    this.weekType = this.$store.state.weekType;
  },

  methods: {
    changesType(val){
      this.weekType =  val
       this.$store.state.weekType = val;
      this.list = []
      this.onRefresh()

  },
    gotoDateils(item) {
      this.$router.push({
        name: "weekCheck",
        query: {
          id: item.weekID,
          name: item.employeeName,
          isLeader: 1,
          empStatus: item.status,
          empWeekDate: item.weekDate,
        },
      });
    },
    fromTime(val) {
      if (val) {
        return val.slice(0, 10);
      } else {
        return val;
      }
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
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.page = 1;
      this.onLoad();
    },
    onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }

      this.$HttpApi
        .post("/api/WeekReview/leader/list", {
          page: this.page,
          pageSize: this.pageSize,
          query:{
            "weekType":this.weekType
          }
        })
        .then((res) => {
          let rescodes = res.data;
          if (rescodes.code == 0) {
            if (rescodes.data.length == 0) {
              this.finished = true;
            } else {
              this.page = parseInt(this.page) + 1;
              this.loading = false;
              this.list = this.list.concat(rescodes.data);
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
  },
  watch: {},
};
</script>
<style lang='css' scoped>
.magin_top1{
  padding-top: 80px !important;
}
.tabls{
  display: flex;
  justify-content: space-between;
  background-color:#fff;
  position: fixed;
  width: 100%;
  top: 90px;
  left: 0;
  z-index: 10;
  line-height:90px;
}
.tabls li{
  width: 50%;
  text-align: center;
}
/* .tabls li:first-child{
  border-right:1px solid #d4d4d4;
} */
.tabls li span{
  /* border-bottom:4px solid #005C8D; */
  border-bottom:6px solid #fff;
  line-height: 80px;
  display: inline-block;
  padding:0 20px;
}
.tabls li span.active{
  border-bottom:6px solid #005C8D !important;
}
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
.titles{
  line-height: 60px;
}
</style>
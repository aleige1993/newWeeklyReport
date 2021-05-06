<template>
  <!-- <div class="nodata" v-if="list.length<1">
    暂无数据~
</div> -->
  <div>
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
        <div class="box_div">
          <li
            class="box_li"
            v-for="(item, index) in list"
            :key="index"
            @click="gotofeedDateils(item)"
          >
            <span class="van-ellipsis left_span"><a class="newxinxi" v-if="item.noReadCommentCount>0">N</a>{{ item.title }}</span>
            <div class="right_span">
              <span>{{ fromTime(item.createTime) }}</span>
              <img class="right_jt" src="@/assets/img/right_jt.png" alt="" />
            </div>
          </li>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: "myfeedback",
  props: [""],
  data() {
    return {
      list: [],
      refreshing: false,
      loading: false,
      finished: false,
      page: 1,
      pageSize: 20,
    };
  },
  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    fromTime(val) {
      if (val) {
        return val.slice(0, 10);
      } else {
        return val;
      }
    },
    gotofeedDateils(item) {
      this.$router.push({
        path: "/layout/feedbackCheck",
        query: {
          createTime: item.createTime,
          title: item.title,
          categoryName: item.categoryName,
          content: item.content,
          depID:item.depID,
          userType:2,
          depName:item.depName,
          caseID: item.id
        },
      });
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
        .post("/api/Suggestion/auth/list", {
          page: this.page,
          pageSize: this.pageSize,
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
              message: rescodes.Message,
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
.box_img {
  width: 100%;
  height: 240px;
  border-radius: 20px;
  overflow: hidden;
}
.box_img img {
  width: 100%;
  height: 100%;
}
.box_div {
  width: 100%;
  background-color: #fff;
  padding-left: 36px;
  border-radius: 20px;
}
.right_jt {
  width: 14px;
  height: 28px;
}
.box_li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 92px;
  padding: 0 36px 0 0;
  border-bottom: 1px solid #e2e2e2;
}
.left_span {
  flex: 1;
  line-height:60px;
}
.right_span {
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
}
.newxinxi{
  display: inline-block;
  color: #ff0000;
  margin-right: 6px;
  font-size:26px;
}
</style>
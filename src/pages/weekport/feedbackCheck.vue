<template>
  <div class="scroll_views">
    <div class="one boxfill">
      <div class="zongjie newzongjie">
        <span class="colora tiltes">意见类别</span>
        <div class="right_type">
          <span>{{ valueCol }}</span>
        </div>
      </div>
      <div class="zongjie margin newzongjie">
        <span class="colorc tiltes">所属部门</span>
        <div class="right_type">
          <span>{{ depName?depName:'' }}</span>
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
    <!-- 回复的html -->
    <div class="one boxfill" v-if="commitList.length>0">
      <div class="zongjie">
        <span class="colord tiltes">意见回复沟通</span>
      </div>
      <!-- 意见员工视角 -->
       <div class="panl_review" v-if="userType == 1">
         <div class="reviewsty" :class="item.sendType == 1?'right':'left'" v-for="(item, index) in commitList" :key="index">
            <div class="userdata" v-if="item.sendType == 1">
               <span>{{$moment(item.createTime).format('YYYY-MM-DD hh:mm:ss')}}</span>
               <span>{{item.empName}}</span>
              <img src="@/assets/img/u_yj.png"  /> 
            </div>
            <div class="userdata" v-else>
                <img src="@/assets/img/u_yj.png"  />
                <span>{{item.empName}}</span>
                <span> {{$moment(item.createTime).format('YYYY-MM-DD hh:mm:ss')}}</span>
            </div>
            <div class="testconent">
                {{item.content}}
            </div>
         </div>
       </div>
        <!-- 意见管理员视角 -->
       <div class="panl_review" v-if="userType == 2">
         <div class="reviewsty" :class="item.sendType == 1?'left':'right'" v-for="(item, index) in commitList" :key="index">
            <div class="userdata" v-if="item.sendType != 1">
               <span>{{$moment(item.createTime).format('YYYY-MM-DD hh:mm:ss')}}</span>
               <span>{{item.empName}}</span>
              <img src="@/assets/img/u_yj.png"  /> 
            </div>
            <div class="userdata" v-else>
                <img src="@/assets/img/u_yj.png"  />
                <span>匿名</span>
                <span> {{$moment(item.createTime).format('YYYY-MM-DD hh:mm:ss')}}</span>
            </div>
            <div class="testconent">
                {{item.content}}
            </div>
         </div>
       </div>
        <!-- 意见大厅视角 -->
       <div class="panl_review" v-if="userType == 3">
         <div class="reviewsty" :class="item.sendType == 1?'left':'right'" v-for="(item, index) in commitList" :key="index">
            <div class="userdata" v-if="item.sendType != 1">
               <span>{{$moment(item.createTime).format('YYYY-MM-DD hh:mm:ss')}}</span>
               <span>{{item.empName}}</span>
              <img src="@/assets/img/u_yj.png"  /> 
            </div>
            <div class="userdata" v-else>
                <img src="@/assets/img/u_yj.png"  />
                <span>匿名</span>
                <span> {{$moment(item.createTime).format('YYYY-MM-DD hh:mm:ss')}}</span>
            </div>
            <div class="testconent">
                {{item.content}}
            </div>
         </div>
       </div>
    </div>
   <!-- v-if="!isReview" -->
     <div class="but_box">
      <van-button
      v-if="userType == 1" 
        class="but_action"
        round
        type="primary"
        color="#008D71"
         @click="handlPicker(true)"
        >沟通回复意见</van-button>
         <van-button
         v-if="userType == 2" 
        class="but_action"
        round
        type="primary"
        color="#007E8D"
        @click="handlPicker(true)"
        >回复员工意见</van-button>
    </div>
<!-- 回复输入 -->
    <van-popup v-model="showPicker" :close-on-click-overlay="false" @close="closePop" round position="bottom" closeable close-icon="close">
     <p class="shuoming">回复内容编辑：</p>
     <van-field
          v-model="commitText"
          rows="5"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="请输入回复文字, 最多100个字"
          show-word-limit
        />
        <div class="but_val">
          <van-button
        class="but_action"
        round
        type="primary"
        color="#005C8D"
        @click="submitVal"
        >提交</van-button
      > 
        </div> 
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "feedbackfillin",
  props: [""],
  data() {
    return {
      commitText:'',
      depID:'',
      userType:'',
      showIcon: false,
      tiltes: "",
      message: "",
      showPicker: false,
      params: "",
      isReview: false,
      date: "",
      columns: [],
      depName:'',
      valueCol: "",
      commitList:[]
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
      this.userType = query.userType;
      this.depID =  query.depID
      this.depName = query.depName
    }
    this.getTypes();
    this.getCommitList()
  },

  methods: {
    getCommitList() {
      this.$HttpApi
        .get("/api/SuggestionComment/list",{
          userType: this.userType,
          suggID: this.depID
        })
        .then((res) => {
          if (res.code == 0) {
            this.commitList = res.data;
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
    closePop(){
      console.log('关闭了！')
    },
    submitVal(){
       if(this.commitText == ''){
          this.$notify({
          message: "提交内容不能为空！",
          type: "danger",
        });
        return false; 
       }
       this.$dialog.confirm({
        title: '提交确认',
        confirmButtonText:'确认提交',
        cancelButtonText:'返回编辑',
        cancelButtonColor:'#999999',
        confirmButtonColor:'#008D71',
        message: '请检查你编辑的内容正确无误后，再确认提交！',
      })
        .then(() => {
          // on confirm
          this.$HttpApi
            .post("/api/SuggestionComment/comment", {
             "sendType": this.userType,
              "suggID": this.depID,
              "content": this.commitText
            })
            .then((res) => {
              let rescodes = res.data;
              if (rescodes.code == 0) {
                this.$toast.success("提交成功!");
                setTimeout(() => {
                  this.$router.go(-1)
                }, 1500);
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
        })
        .catch(() => {
          // on cancel
          this.showPicker = true
        });
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
/* 回复样式 start */
.panl_review{
 width: 100%;
 display: inline-table;
 background-color: #fff;
}
.panl_review .left{
  width: 90%;
  padding: 20px;
  background: #F9F8F8;
  border-radius: 8px;
  float: left;
  margin-top: 16px;
}
.panl_review .right{
  width: 90%;
  padding: 20px;
  background:#EDEEF4;
  border-radius: 8px;
  margin-top: 16px;
  float: right;
}

.left{
display: flex;
flex-direction: column;
}
.left div{
  display: flex;
  justify-content: start;
  align-items: center;
}
.right .userdata{
  display: flex;
  justify-content:flex-end;
  align-items: center;
}
.userdata img{
  width: 20px;
  height: 24px;
}
.userdata span{
  font-size: 24px;
  color: #C1C1C1;
  margin:0 4px;
}
.testconent{
  line-height: 40px;
  color: #333;
  font-size: 28px;
  margin-top: 16px;
}
/* end */

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
.colorc {
  background-color: #9bc07d;
}
.margin {
  margin-top: 30px;
}
.colord{
  background-color: #B2B7DF;
}
.shuoming{
  margin-top: 40px;
  padding-left: 30px;
  font-weight: bold;
}
.but_val{
  width: 100%;
  padding:20px 30px;
  border-top:1px solid #e2e2e2;
}
</style>
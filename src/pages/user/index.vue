<template>
  <div>
    <van-overlay :show="showlayer && writeWeek == 'Y'" @click="onHideLayer" z-index="5" />
    <div class="comfirm" v-if="showlayer && writeWeek == 'Y'">
      <div class="icon_text">
        <img src="@/assets/img/icon_gt.png" alt="" />
        <p class="showtest">
          今天{{ weekd }}，下周一将<span>逾期</span><br />
          请您及时填报本周周报！
        </p>
      </div>
      <div class="but_but">
        <div class="hhecol" @click="onHideLayer">我已知晓</div>
      </div>
    </div>

    <div class="haer_bg">
      <div class="logimgs">
        <img class="log" src="@/assets/img/icon_logo.png" alt="" />
        <img
          @click="logout()"
          class="logout"
          src="@/assets/img/icon_tc.png"
          alt=""
        />
      </div>
      <div class="toux">
        <img class="usertoux" src="@/assets/img/icon_tx.png" alt="" />
        <p class="xidong">
          欢迎您，{{ employeeName }}<span class="role">{{ posNames }}</span
          ><router-link :to="{ path: '/layout/password' }" class="change"
            >修改密码</router-link
          >
        </p>
      </div>
      <div class="pand">
        <div class="flexbox" @click="delayWriteWeekf(delayWriteWeekCount)">
          <span class="sp1">{{ delayWriteWeekCount }}</span>
          <span class="sp2">待填周报</span>
        </div>
        <div class="flexbox" @click="replyingWeekf(replyingWeekCount)">
          <span class="sp1">{{ replyingWeekCount }}</span>
          <span class="sp2">待批复周报</span>
        </div>
        <div class="flexbox" @click="gotoPage(5)">
          <span class="sp1">{{ suggestionCount }}</span>
          <span class="sp2">匿名意见</span>
        </div>
      </div>
    </div>
    <div class="flexurlbox">
      <li @click="gotoPage(1)" v-if="writeWeek == 'Y'">
        <div>
          <img class="imga" src="@/assets/img/u_txzb.png" alt="" />
        </div>
        <span>填写活动周报</span>
      </li>
      <li @click="gotoPage(2)" v-if="writeWeek == 'Y'">
        <div>
          <img class="imga" src="@/assets/img/u_wdlis.png" alt="" />
        </div>
        <span>我的历史周报</span>
      </li>
      <li @click="gotoPage(3)" v-if="seeWeek == 'Y'" >
        <div>
          <img class="imga" src="@/assets/img/u_pf.png" alt="" />
        </div>
        <span>批复下属周报</span>
      </li>
      <li @click="gotoPage(4)">
        <div>
          <img class="imga" src="@/assets/img/u_nm.png" alt="" />
        </div>
        <span>填写匿名意见</span>
      </li>
      <li @click="gotoPage(5)">
        <div>
          <div class="reacts" v-if="noReadEmpSuggCommentCount>0"></div>
          <img class="imga" src="@/assets/img/u_wdls.png" alt="" />
        </div>
        <span>我的历史意见</span>
      </li>

      <li @click="gotoPage(6)">
        <div>
          <img class="imgyj" src="@/assets/img/u_yj.png" alt="" />
        </div>
        <span>大地意见广场</span>
      </li>

      <li @click="gotoPage(7)" v-if="writeWeek == 'Y'">
        <div>
          <img class="imga" src="@/assets/img/yqbt.png" alt="" />
        </div>
        <span>逾期周报补填</span>
      </li>
      <!-- v-if="writeSuggComment == 'Y'" -->
      <li @click="gotoPage(8)"   v-if="writeSuggComment == 'Y'">
        <div>
          <div class="reacts" v-if="noReadManagerSuggCommentCount>0"></div>
          <img class="imga" src="@/assets/img/yjpf.png" alt="" />
        </div>
        <span>本部门意见批复</span>
      </li>
    </div>
  </div>
</template>

<script> 
import {getWeekDay, getWeek} from '../../utils/util'
import UserLogin from '../../utils/UserLogin';
  export default {
    name:'user',
    props:[''],
    data () {
      return {
            isCheck:false,
           showlayer:true,
           delayWriteWeekCount:0,
           replyingWeekCount:0,
           suggestionCount:0,
           weekd:'星期五',
           isSubmit:"",
           isID:'',
           employeeName:'',
           posNames:'',
           seeWeek:'N',
           writeWeek:'N',
           writeSuggComment:'N',
           noReadEmpSuggCommentCount:0,
           noReadManagerSuggCommentCount:0
      };
    }, 
    computed: {},

    beforeMount() {
      // if(this.$store.state.newloding== true){
      //   window.location.reload()
      // }
    },

    mounted() {
        this.getSummary()
        this.getExists()
        this.getUserInfo()
        this.getPower()
        this.weekd = getWeek()
        this.$store.state.weekstart = ''
    },

    methods: {
      delayWriteWeekf(num){
        if(this.writeWeek == 'N'){
          this.$toast.fail('没有填写周报权限');
          return false
        }else if(num == 0 ){
          this.$toast.fail('没有可填写的周报');
          this.gotoPage(1)
        }else{
          this.gotoPage(1)
        }
      },
      replyingWeekf(num){
        if(this.seeWeek == 'N'){
          this.$toast.fail('没有查看周报权限');
          return false
        }else if(num == 0){
          this.$toast.fail('没有可待批复的周报');
          this.gotoPage(3)
        }else{
          this.gotoPage(3)
        }
      },
         onShowLayer(){
           this.showlayer = true  
       },
        onHideLayer(){
           this.showlayer = false 
       },
       getPower(){
          this.$HttpApi.get(`/api/Employee/power`).then((res)=>{
                if(res.code==0){
                    this.seeWeek = res.data.seeWeek
                    this.writeWeek = res.data.writeWeek
                    this.writeSuggComment = res.data.writeSuggComment
                }else{
                     this.$notify({
                        message: res.message,
                        type: 'danger',
                    })
                }
            }).catch((err)=>{
                
            })
       },
         getExists(){
            let weekDate = getWeekDay()
            this.$HttpApi.get(`/api/WeekReview/exists/${weekDate}`).then((res)=>{
                this.weekd = getWeek()
                if(res.code==0){
                    this.isSubmit = res.data
                    if(res.data == 'Y'){
                        this.showlayer = false
                    }else{
                         this.showlayer = true
                    }
                }else{
                     this.$notify({
                        message: res.message,
                        type: 'danger',
                    })
                }
            }).catch((err)=>{
                
            })
        },
        getSummary(){
            this.$HttpApi.get('/api/Employee/summary').then((res)=>{
                const respoen = res.data
                this.delayWriteWeekCount = respoen.delayWriteWeekCount,
                this.replyingWeekCount= respoen.replyingWeekCount,
                this.suggestionCount= respoen.suggestionCount,
                this.noReadEmpSuggCommentCount= respoen.noReadEmpSuggCommentCount,
                this.noReadManagerSuggCommentCount= respoen.noReadManagerSuggCommentCount
            }).catch((err)=>{
               
            })
       },
        //跳转修改密码
         changePswd () {
            this.$router.push('/layout/password')
        },
         gotoPage(name){
            if(name == 1){
            //     let isStuts = ''
            //     if(this.isSubmit == 'N'){
            //         isStuts = 1
            //     }else{
            //          isStuts = 2
            //     }
            //     this.$router.currentRoute.value.query
            //   this.$router.push({path:'/layout/weekfill',query:{'isStuts':isStuts}}) 
             this.getWeekReport()
            }else if(name == 2){
                this.$router.push('/layout/historyPort')
            }else if(name == 3){
                this.$router.push({name:'weekReview'})
            }else if(name == 4){
                this.$router.push('/layout/feedbackfill')
            }else if(name == 5){
                this.$router.push('/layout/myfeedback')
            }else if(name == 6){
                this.$router.push('/layout/feedback')
            }else if(name == 7){
                 let week = this.$moment().day(-6).format('YYYY-MM-DD') 
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
            }else if(name == 8){
              this.$router.push('/layout/tribeFeedback')
            }
         },
       getWeekReport(){
         let _this = this
          this.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            loadingType: "spinner",
          });
            let week = getWeekDay()
            this.$HttpApi.get(`/api/WeekReview/${week}`).then((res)=>{
            if(res.code == 0){
               let addWeekReport = this.$store.state.addWeekReport
               if(res.data && res.data.id){ 
                    this.$store.state.isID = res.data.id
                     this.$store.state.isWeekFill = res.data.status
                } 
               if(res.data == null){
                addWeekReport.weekPlans = [],
                addWeekReport.weekNextPlans = [],
                addWeekReport.weekMend =[]
                this.$store.state.isWeekFill = ""
               }else{
                addWeekReport.weekPlans = res.data.weekPlans?res.data.weekPlans:[],
                addWeekReport.weekNextPlans = res.data.weekNextPlans?res.data.weekNextPlans:[],
                addWeekReport.weekMend = res.data.weekMend?res.data.weekMend:[]
               } 
                 setTimeout(() => { 
                  _this.$toast.clear();
                 _this.$router.push({path:'/layout/weekfill', query:{
                      isID:res.data? res.data.id:'', 
                  }}) 
                }, 1500);
            }else{
              this.$toast.clear();
                 this.$notify({
                        message: res.message,
                        type: 'danger',
                    })
            }
        }).catch((err)=>{
            console.log(err)
        }) 

        },
         getUserInfo(){ 
            this.$HttpApi.get(`/api/Employee/info`).then((res)=>{
            if(res.code == 0){
              this.employeeName = res.data.employeeName
              if(res.data.posNames){
                this.posNames = res.data.posNames.toString()
              }else{
                  this.posNames = ''
              }
            }else{
                 this.$notify({
                        message: res.message,
                        type: 'danger',
                    })
            }
        }).catch((err)=>{
            
        }) 

        },
         logout(){
            UserLogin.removeLoginInfo()
            this.$router.replace('/login')
        }
    },

    watch: {
      $route(to,from){
        console.log(to.path);
        
      }
    }
  }
</script>
<style lang='css' scoped>
.reacts{
  position: absolute !important;
  width:14px !important;
  height:14px !important;
  display: inline-block;
  border-radius:100%;
  top:10px;
  right:10px;
  z-index: 3;
  background-color: #e10000 !important;
}
.flexurlbox {
  width: 90%;
  margin-left: 5%;
  margin-top: 10%;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 100px;
}
.flexurlbox li {
  width: 33%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}
.flexurlbox li div {
  display: inline-block;
  width: 118px;
  height: 118px;
  border-radius: 100%;
  background-color: #005c8d;
  text-align: center;
  line-height: 150px;
  position: relative;
}
.flexurlbox li span {
  color: #333;
  font-size: 26px;
  margin-top: 16px;
}
.pand {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  width: 90%;
  position: absolute;
  border-radius: 20px;
  left: 5%;
  bottom: -60px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 40px;
  box-shadow: 0px 9px 13px 0px rgba(0, 0, 0, 0.1);
}
.flexbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.flexbox span {
  text-align: center;
}
span.sp1 {
  color: #c0ab7d;
  font-size: 46px;
  margin-bottom: 20px;
}
span.sp2 {
  color: #666666;
  font-size: 26px;
}
.imga {
  width: 48px;
  height: 47px;
}
.haer_bg {
  background-image: url("../../assets/img/img_bj.png");
  background-size: 100% 400px;
  background-repeat: no-repeat;
  position: relative;
  height: 400px;
}
.logimgs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
}
.logimgs .log {
  width: 177px;
  height: 40px;
}
.logimgs .logout {
  width: 44px;
  height: 44px;
}
.toux {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.usertoux {
  width: 112px;
  height: 112px;
}
.xidong {
  color: #fff;
  font-size: 24px;
  margin-top: 20px;
  text-align: center;
}
.role {
  color: #fff47e;
    font-size: 0.32rem;
    margin-left: 0.13333rem;
    display: inline-block;
    max-width: 52%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: -4px;
}
.change {
  color: #8dffe6;
  margin-left: 20px;
  text-decoration: underline;
  font-size: 24px;
}
.imgyj {
  width: 63px;
  height: 46px;
}
.confirmbut {
  color: #005c8d;
  border-left: 1px solid #ccc;
}
.but_but {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #ccc;
  height: 86px;
  line-height: 86px;
}
.but_but div {
  width: 50%;
  text-align: center;
}
.showtest {
  font-size: 30px;
  color: #333333;
  line-height: 50px;
}
.showtest span {
  color: #e10000;
  font: 30px;
}
.icon_text {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 75px 100px;
}
.icon_text img {
  width: 92px;
  height: 92px;
  display: inline-block;
  margin-right: 20px;
}
.box_foot {
  text-align: center;
  line-height: 86px;
  color: #005c8d;
  font-size: 30px;
  border-top: 1px solid #cccccc;
  margin-top: 50px;
}
.box_foot {
  text-align: center;
  line-height: 86px;
  color: #005c8d;
  font-size: 30px;
  border-top: 1px solid #cccccc;
  margin-top: 50px;
}
.review_box {
  background-color: #fff;
  border-radius: 20px;
  width: 94%;
  position: fixed;
  z-index: 6;
  top: 30%;
  left: 3%;
}
.comfirm {
  background-color: #fff;
  border-radius: 20px;
  width: 94%;
  position: fixed;
  z-index: 8;
  top: 30%;
  left: 3%;
}
.hhecol {
  font-size: 30px;
  color: #005c8d;
}
.gray { 
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
}
</style>
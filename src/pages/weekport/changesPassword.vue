<template>
<div class="passbox">
    <div class="boxss">
        <li>
            <input type="password" v-model="paswd1" placeholder="原始密码">
        </li>
        <li>
            <input type="password" v-model="paswd2" placeholder="更新密码">
        </li>
        <li>
            <input type="password" v-model="paswd3" placeholder="确认更新密码">
        </li>
    </div>

    <van-button type="primary" round class="changebut" @click="submit">确定修改密码</van-button>
</div>
</template>

<script>
export default {
    name: 'password',
    props: [''],
    data () {
      return {
            paswd1: '',
            paswd2: '',
            paswd3: ''
      };
    }, 
    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        submit(){
            let _this = this
            if(this.paswd1 == ''){
                this.$notify({
                    message: '请输入原始密码',
                    type: 'danger',
                })
            }else if(this.paswd2 == ''){
                 this.$notify({
                    message: '请输入更新密码',
                    type: 'danger',
                })
            }else if(this.paswd3 !== this.paswd2){
                 this.$notify({
                    message: '与更新密码不一致',
                    type: 'danger',
                })
            }
            this.$HttpApi.post('/api/Employee/changepwd',{
                oldPassword: this.paswd1,
                newPassword: this.paswd2,
                againPassword:this.paswd3
            }).then((res)=>{
                let rescodes =  res.data
                 this.$toast.success('修改成功!'); 
                if(rescodes.code){
                    this.$toast.success('修改成功!'); 
                    setTimeout(()=>{
                        localStorage.removeItem('userTel');
                        localStorage.removeItem('userPasw');
                        _this.$UserLogin.removeLoginInfo()
                        window.location.href="/";
                        // this.$router.push('/login')
                    },1500)
                }else{
                    this.$notify({
                        message: rescodes.message,
                        type: 'danger',
                    })
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    },

    watch: {} 
}
</script>

<style lang="css" scoped>
.boxss li {
    margin: 10px 0 10px 60px;
    border-bottom: 1px solid #E2E2E2;
}

.boxss li input {
    border: none;
    font-size: 28px;
    line-height: 90px;
}

.boxss {
    background-color: #fff;
    border-radius: 20px;
    padding-bottom: 68px;
    padding-top: 20px;
}

.passbox {
    padding: 40px 20px;
}

.changebut {
    background-color: #005C8D;
    height: 70px;
    width: 100%;
    font-size: 30px;
    margin-top: 25px;
    border: #005C8D;
}

.changetip {
    height: 200px !imporant;
    font-size: 34px!imporant;
}
</style>

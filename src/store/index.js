import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        HeadData: {
            rose: 0, //0：不变 1:直接赋值 2：查看name 3:延迟上报 4：已逾期
            txt: '', // rose == 1 && txt!= null 
            end: '' // rose > 1 展示的不同类型的内容
        },
        isID:'',
        isUpdate:false,
        isWeekFill:'',
        isSeeWeek:'N',
        weekType:1,
        // newloding:false,
        addWeekReport:{
            "weekPlans": [],
            "weekNextPlans": [],
            "weekMend": []
        }
    },
    mutations: {
        setHead(state, vaule = []) {
            state.HeadData.rose = vaule[0] ? vaule[0] : 0
            state.HeadData.txt = vaule[1] ? vaule[1] : ''
            state.HeadData.end = vaule[2] ? vaule[2] : ''
        },
        delPanl1(state, vaule) {
            state.addWeekReport.weekPlans.splice(vaule,1)
        },
        delPanl3(state, vaule) {
            state.addWeekReport.weekNextPlans.splice(vaule,1)
        },
        delPanl2(state, vaule) {
            state.addWeekReport.weekMend.splice(vaule,1)
        },
        changeUpdate(state, vaule){
            console.log('vaule', vaule)
            state.isUpdate = vaule
        }
    },
    actions: {},
    modules: {}
})
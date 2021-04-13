export  function getWeekDay(){
    
var nowTemp = new Date();//当前时间
 
var oneDayLong = 24*60*60*1000 ;//一天的毫秒数
 
var c_time = nowTemp.getTime() ;//当前时间的毫秒时间
 
var c_day = nowTemp.getDay()||7;//当前时间的星期几
 
var m_time = c_time - (c_day-1)*oneDayLong;//当前周一的毫秒时间
 
var monday = new Date(m_time);//设置周一时间对象
 
var m_year = monday.getFullYear();
 
var m_month = monday.getMonth()+1;
 
var m_date = monday.getDate();
return m_year+'-'+m_month+'-'+m_date
} 

export  function getWeek() {
    var now = new Date();
    var day = now.getDay();
    var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var week = weeks[day];
    return week;
 }
 
export function fromTime(val){
    if(val){
      return val.slice(0,10)
    }else{
      return val
    }
  } 

 export function getNewData(dateTemp, days){  
    var dateTemp = dateTemp.split("-"); 
    var nnDate = dateTemp[1]+'/'+dateTemp[2]+'/'+dateTemp[0]; //转换为MM-DD-YYYY格式
    var nDate = new Date(nnDate.replace(/\s+/g,""));//这一步如果没有空格的话可以省略
    var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);  
    var rDate = new Date(millSeconds);
    var year = rDate.getFullYear();  
    var month = rDate.getMonth() + 1;  
    if (month < 10) month = "0" + month;  
    var date = rDate.getDate();  
    if (date < 10) date = "0" + date;  
    return (year + "-" + month + "-" + date); 
}






export function toDate(str) {
      if (str && typeof str == "string") {
          str = str.replace(/T/g, ' ');
          isUTC = str.substr(str.length - 1) === 'Z';
          if (isUTC) {
              str = str.substr(0,str.length-1);
          }
          var index = str.lastIndexOf('.');
          if (index > -1 && str.substring(0, index).indexOf(':') > -1) {//去掉毫秒
              str = str.substring(0, index);
          }
          var reg1 = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/,
              reg2 = /^\/Date\([0-9]{1,}\)\/$/g,
              result;
          if (reg1.test(str)) {
              str = str.replace(/-/g, "/");
              result=new Date(str);
          } else if (reg2.test(str)) {
              var dateNum = str.substr(6);
              dateNum = dateNum.substring(0, dateNum.length - 2);
              result = new Date(parseInt(dateNum));
          } else {
              result = new Date(str.replace(/\-/g, "/"));
          }
          if (isUTC) {
              result = result.addHours(8);
          }
          return result;
      }
      return str;
  } 
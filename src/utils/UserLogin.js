
// import MyRouter from '@/router';
class UserLogin {
  LOGININFOKEY = 'loginInfo';
  /**
   * 判断是否登录
   * @returns {boolean}
   */
  isLogin() {
          let localLoginInfo = window.sessionStorage.getItem(this.LOGININFOKEY);
          if (typeof(localLoginInfo) !== 'undefined' && localLoginInfo !== '' && localLoginInfo !== null) {
              return true;
          } else {
              return false;
          }
      }
      /**
       * 获取登录信息
       * @returns {{}}
       */
  getLoginInfo() {
          if (this.isLogin()) {
              if(sessionStorage.getItem(this.LOGININFOKEY) !== 'undefined'){
                  return JSON.parse(sessionStorage.getItem(this.LOGININFOKEY));
              }else{
                  return ''
              }
              
          } else {
              return {};
          }
      }
      /**
       * 获取token
       * @returns {token}
       */
  getLoginToken() {
          return this.getLoginInfo();
      }
      /**
       * 存储登录信息
       * @param loginInfo
       * @returns {{}}
       */
  setLoginInfo(loginInfo) {
        //   localStorage.setItem(this.LOGININFOKEY, JSON.stringify(loginInfo));
          sessionStorage.setItem(this.LOGININFOKEY, JSON.stringify(loginInfo));
          return this.getLoginInfo();
      }
      /**
       * 清空登录信息
       */
  removeLoginInfo() {
      sessionStorage.removeItem(this.LOGININFOKEY);
  }
}
export default new UserLogin();
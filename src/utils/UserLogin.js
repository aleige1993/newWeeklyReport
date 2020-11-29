
import MyRouter from '@/router';

let storage = window.sessionStorage;
class UserLogin {
  LOGININFOKEY='loginInfo';
  /**
   * 判断是否登录
   * @returns {boolean}
   */
  isLogin() {
    let localLoginInfo = storage.getItem(this.LOGININFOKEY);
    if (typeof (localLoginInfo) !== 'undefined' && localLoginInfo !== '' && localLoginInfo !== null) {
      return true;
    } else {
      MyRouter.push({name: 'login'});
      return false;
    }
  }
  /**
   * 获取登录信息
   * @returns {{}}
   */
  getLoginInfo() {
    var info =storage.getItem(this.LOGININFOKEY);
    return info?JSON.parse(info):null;
  }
  /**
   * 存储登录信息
   * @param loginInfo
   * @returns {{}}
   */
  setLoginInfo(loginInfo) {
    storage.setItem(this.LOGININFOKEY, JSON.stringify(loginInfo));
    return this.getLoginInfo();
  }
  /**
   * 清空登录信息
   */
  removeLoginInfo() {
    storage.removeItem(this.LOGININFOKEY);
  }
}
export default new UserLogin();

import { IResultOr } from '@/api/interface';
import { userSignApi, userLoginApi } from '@/api/login';
import { getCurrentInstance } from 'vue';
import { Router } from 'vue-router';
interface IRuleForm {
  mobile: string;
  password: string;
}
interface Result {
  userSign: (params: IRuleForm) => void;
  userLogin: (params: IRuleForm) => void;
}

const app = getCurrentInstance();

export default function useFormOperates(
  router: Router,
  params: IRuleForm
): Result {
  /**
   * 注册
   */
  function userSign(): void {
    userSignApi(params).then((res: IResultOr) => {
      const { success, message } = res;
      if (success) {
        app?.appContext.config.globalProperties.$message.success(message);
      } else {
        app?.appContext.config.globalProperties.$message.error(message);
      }
    });
  }

  /**
   * 登陆
   */
  function userLogin(): void {
    userLoginApi(params).then((res: IResultOr) => {
      const { success, message, result } = res;
      if (success) {
        const { status } = result;
        localStorage.setItem('userStatus', status);
        router.push({ name: 'home' });
        app?.appContext.config.globalProperties.$message.success(message);
      } else {
        app?.appContext.config.globalProperties.$message.error(message);
      }
    });
  }
  return {
    userSign,
    userLogin,
  };
}

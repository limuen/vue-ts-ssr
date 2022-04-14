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

export default function useFormOperates(
  router: Router,
  params: IRuleForm
): Result {
  // 注册接口
  function userSign(): void {
    userSignApi(params).then((res: IResultOr) => {
      const { success, message } = res;
      if (success) {
        getCurrentInstance()?.appContext.config.globalProperties.$message.success(
          message
        );
      } else {
        getCurrentInstance()?.appContext.config.globalProperties.$message.error(
          message
        );
      }
    });
  }

  // 登录接口
  function userLogin(): void {
    userLoginApi(params).then((res: IResultOr) => {
      const { success, message, result } = res;
      if (success) {
        const { status } = result;
        localStorage.setItem('userStatus', status);
        router.push({ name: 'home' });
        getCurrentInstance()?.appContext.config.globalProperties.$message.success(
          message
        );
      } else {
        getCurrentInstance()?.appContext.config.globalProperties.$message.error(
          message
        );
      }
    });
  }
  return {
    userSign,
    userLogin,
  };
}

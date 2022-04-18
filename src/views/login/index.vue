<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { userSignApi, userLogoutApi } from '@/api/login';
import { IResultOr } from '@/api/interface';
interface IRuleForm {
  mobile: string;
  password: string;
}

const { t } = useI18n();
const router = useRouter();
const app = getCurrentInstance();

const activeName = ref('login');
const loginText = ref(t('login.loginBtn'));
const ruleFormRef = ref();
const ruleForm: IRuleForm = reactive({
  mobile: '',
  password: '',
});
const rules = reactive({
  mobile: [
    {
      required: true,
      min: 11,
      max: 11,
      message: t('login.placeMobile'),
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: t('login.placePass'),
      trigger: 'blur',
    },
  ],
});
function handleClick(e: any) {
  console.log(e);
  const { name, label } = e.props;
  if (name === 'login') {
    loginText.value = t('login.loginBtn');
  } else if (name === 'sign') {
    loginText.value = t('login.signBtn');
  }
  console.log(name, label);
}

function submitForm() {
  ruleFormRef.value.validate((valid: any) => {
    if (valid) {
      if (activeName.value == 'sign') {
        userSign(ruleForm);
      } else {
        userLogin(ruleForm);
      }
    } else {
      return false;
    }
  });
}

/**
 * 注册
 */
function userSign(params: IRuleForm) {
  userLogoutApi(params).then((res: IResultOr) => {
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
function userLogin(params: IRuleForm) {
  userSignApi(params).then((res: IResultOr) => {
    const { success, message } = res;
    if (success) {
      router.push({ name: 'home' });
      app?.appContext.config.globalProperties.$message.success(message);
    } else {
      app?.appContext.config.globalProperties.$message.error(message);
    }
  });
}
</script>

<template>
  <div class="login-page">
    <div class="left-part"></div>
    <div class="right-part">
      <div class="login-panel">
        <!-- tabs -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="t('login.loginTab')" name="login"></el-tab-pane>
          <el-tab-pane :label="t('login.signTab')" name="sign"></el-tab-pane>
        </el-tabs>
        <!-- 表单组件 -->
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
          <el-form-item prop="mobile">
            <el-input
              :placeholder="t('login.placeMobile')"
              v-model="ruleForm.mobile"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :placeholder="t('login.placePass')"
              v-model="ruleForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="submitForm">{{
              loginText
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/login/index.scss';
</style>

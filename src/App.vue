<script setup lang="ts">
import { ref } from 'vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';
import { useI18n } from 'vue-i18n';

const { locale: localeLanguage } = useI18n();

const locale = ref(zhCn);
const changeLang = (language: any) => {
  console.log(language, 'language');
  locale.value = language;
  localeLanguage.value = language.name;
};
</script>

<template>
  <el-config-provider :locale="locale">
    <button @click="changeLang(zhCn)">中文</button>
    <button @click="changeLang(en)">英文</button>
    <router-link to="/home">home</router-link>
    <router-link to="/mine">mine</router-link>
    <router-view />
  </el-config-provider>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/home/index.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  button {
    font-size: 40px;
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import commonHeader from '@/components/layout/commonHeader.vue';
import commonFooter from '@/components/layout/commonFooter.vue';
const { locale: localeLanguage } = useI18n();

const route = useRoute();

const locale = ref(zhCn);
const changeLang = (language: any) => {
  console.log(language, 'language');
  locale.value = language;
  localeLanguage.value = language.name;
};
</script>

<template>
  <el-config-provider :locale="locale">
    <!-- header -->
    <commonHeader
      v-show="route.fullPath.indexOf('login') === -1"
      @changeLang="changeLang"
    />
    <!-- 主题 -->
    <div class="container">
      <router-view />
    </div>
    <!-- footer -->
    <commonFooter v-show="route.fullPath.indexOf('login') === -1" />
  </el-config-provider>
</template>

<style lang="scss">
@import '@/assets/scss/home/index.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

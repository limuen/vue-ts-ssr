<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import IndexedDB from '@/utils/indexedDB';
const { t } = useI18n();
const app = getCurrentInstance();
const open2 = () => {
  app?.appContext.config.globalProperties.$message({
    message: 'Congrats, this is a success message.',
    type: 'success',
  });
};

/**
 * 数据库相关操作
 */
const airbnbDB = new IndexedDB('airbnb');
airbnbDB.openStore('elephant', 'id', ['nose', 'ear']);
/**
 * 赠和修改
 */
const handleCreate = () => {
  airbnbDB.updateItem('elephant', {
    // id: 1,
    nose: '44米',
    ear: '比较小',
  });
};
/**
 * 删除
 */
const handleDelete = (keyPath: number | string) => {
  airbnbDB.deleteItem('elephant', keyPath);
};
/**
 * 查询所有数据
 */
const getObjectStore = () => {
  airbnbDB.getList('elephant');
};

/**
 * 查询某一条数据
 */
const item = (keyPath: number | string) => {
  airbnbDB.getItem('elephant', keyPath);
};
const value1 = '';
</script>

<template>
  {{ t('message.home') }}

  <el-date-picker
    v-model="value1"
    type="date"
    :placeholder="t('message.date')"
  />
  <el-button @click="handleCreate">新增</el-button>
  <el-button @click="handleDelete(2)">删除</el-button>
  <el-button @click="getObjectStore">查询</el-button>
  <el-button @click="item(3)">查询某一条数据</el-button>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/home/index.scss';
</style>

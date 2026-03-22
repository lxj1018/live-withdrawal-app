//带分页的表格组件
//包含三个子组件(Paging,List,Loading)
<template>
<div class="paging-list">
//加载中状态
  <Loading v-if="!data"></Loading>
  //空数据状态
  <div class="empty" v-if="data&&data.length==0"> This record is empty!</div>
  //数据展示区域
  <div class="list-paging" v-if="data&&data.length!=0">
    <List v-if="data" 
      :listHeight="listHeight" 
      :currentData="currentData" 
      :rowsWidth="rowsWidth" 
      :listType="listType" 
      :listHeader="listHeader">
    </List>
    //分页器组件
    <Paging 
      v-if="isShowPaging" 
      :totalPage="totalPage" 
      :goToCallback="goToCallback"
    ></Paging>

  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import List from './List.vue'
import Paging from './Paging.vue' 
import Loading from './Loading.vue' 
//响应式数据默认第一页
const currentPage = ref(1)

const props = defineProps({
  onePageNum: Number,
  data: Array,
  rowsWidth: Array,
  listHeader: Array,
  listHeight: String,
  isShowPaging: Boolean,
  listType: String,
})

const totalPage = computed(() => {
  return Math.ceil(props.data.length / props.onePageNum)
})

const currentData = computed(() => {
  return props.data.slice(
    props.onePageNum * (currentPage.value - 1),
    props.onePageNum * currentPage.value
  )
})

const goToCallback = (index) => {
  currentPage.value = index
}
</script>

<style scoped>
.paging-list{width: 100%;}
.empty{margin-top: 25px; color:#979797;}
</style>
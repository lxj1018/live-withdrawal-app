//用户直播记录组件
<template>
<transition name="slide">
//外层容器 类名:"content-main"
<div class="content-main">
//页面标题 类名:"Live Record"
<div class="ml10 bold">Live Record</div>
//列表容器 类名:"list-wrap"
<div class="list-wrap">
//分页组件
<PagingList
:onePageNum="onePageNum"
:isShowPaging="true"
:listType="listType"
:listHeight="listHeight"
:data="liveRecordList"
:listHeader="listHeader"
:rowsWidth="rowsWidth"
></PagingList>
</div>
</div>
</transition>
</template>
<script setup>
//核心API导入
import{ref,onMounted} from 'vue'
//接口地址
const liveRecordFetchUrl = ref('http://example.com/liv.php')
//直播记录列表:初始值为null
const liveRecordList=ref(null)
//表格配置项
const onePageNum = ref(19)
const rowsWidth = ref(['80%','20%'])
const listHeader = ref(['Calculate Time','ACU'])
const listType = ref('liveRecord')
const listHeight = ref('765px')
//页面加载完成 
onMounted(()=>{
//给直播记录列表赋值
liveRecordList.value=[
{
"uid":"10000",
"users":"6",
"create_time":"1470451202",
"data":"2026-03-01",
"time":"02:40:02"
},
{
"uid": "10000",
        "users": "20",
        "create_time": "1470451801",
        "data": "2026-03-02",
        "time": "02:50:01"
      },
      {
        "uid": "10000",
        "users": "48",
        "create_time": "1470452101",
        "data": "2026-03-03",
        "time": "02:55:01"
      },
      {
        "uid": "10000",
        "users": "44",
        "create_time": "1470452401",
        "data": "2026-03-04",
        "time": "03:00:01"
      },
      {
        "uid": "10000",
        "users": "44",
        "create_time": "1470452701",
        "data": "2026-03-05",
        "time": "03:05:01"
      },
      {
        "uid": "10000",
        "users": "46",
        "create_time": "1470453001",
        "data": "2026-03-06",
        "time": "03:10:01"
      },
      {
        "uid": "10000",
        "users": "44",
        "create_time": "1470453301",
        "data": "2026-03-07",
        "time": "03:15:01"
      },
      {
        "uid": "10000",
        "users": "46",
        "create_time": "1470453601",
        "data": "2026-03-08",
        "time": "03:20:01"
      },
      {
        "uid": "10000",
        "users": "46",
        "create_time": "1470453901",
        "data": "2026-03-09",
        "time": "03:25:01"
      },
      {
        "uid": "10000",
        "users": "46",
        "create_time": "1470454201",
        "data": "2026-03-10",
        "time": "03:30:01"
      },
      {
        "uid": "10000",
        "users": "43",
        "create_time": "1470454502",
        "data": "2026-03-11",
        "time": "03:35:02"
      },
      {
        "uid": "10000",
        "users": "47",
        "create_time": "1470454801",
        "data": "2026-03-12",
        "time": "03:40:01"
      },
      {
        "uid": "10000",
        "users": "48",
        "create_time": "1470455101",
        "data": "2026-03-13",
        "time": "03:45:01"
      },
      {
        "uid": "10000",
        "users": "49",
        "create_time": "1470455401",
        "data": "2026-03-14",
        "time": "03:50:01"
      },
      {
        "uid": "10000",
        "users": "46",
        "create_time": "1470455701",
        "data": "2026-03-06",
        "time": "03:55:01"
      },
      {
        "uid": "10000",
        "users": "45",
        "create_time": "1470456001",
        "data": "2026-03-06",
        "time": "04:00:01"
      },
      {
        "uid": "10000",
        "users": "46",
        "create_time": "1470456301",
        "data": "2026-03-06",
        "time": "04:05:01"
      },
      {
        "uid": "10000",
        "users": "44",
        "create_time": "1470456601",
        "data": "2026-03-06",
        "time": "04:10:01"
      },
      {
        "uid": "10000",
        "users": "45",
        "create_time": "1470456901",
        "data": "2026-08-06",
        "time": "04:15:01"
      },
      {
        "uid": "10000",
        "users": "42",
        "create_time": "1470457201",
        "data": "2026-03-06",
        "time": "04:20:01"
      },
      {
        "uid": "10000",
        "users": "45",
        "create_time": "1470457501",
        "data": "2026-03-06",
        "time": "04:25:01"
      },
      {
        "uid": "10000",
        "users": "43",
        "create_time": "1470457801",
        "data": "2026-03-06",
        "time": "04:30:01"
      },
      {
        "uid": "10000",
        "users": "10",
        "create_time": "1470458101",
        "data": "2026-03-06",
        "time": "04:35:01"
      },
      {
        "uid": "10000",
        "users": "33",
        "create_time": "1470458401",
        "data": "2026-03-06",
        "time": "04:40:01"
      }
    ]
  }, 1500) //延迟1.5秒
  })
  </script>
  <style scoped>
 .ml10{
 margin-left:10px;
 }
 .bold{
 font-weight:bold;
 margin-top:10px;
 margin-bottom:10px;
 font-size:16px;
 }
 .list-wrap{
 margin:0 10px;
 }
 </style>




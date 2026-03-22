//列表组件
<template>
//列表外层容器:动态样式绑定ListHeight
<div class="list-main" :style="{height: listHeight}">
//列表表头区域
<div class="li-head">
//循环渲染表头文字
<span class="li-head-text bold" v-for="(item,index) in listHeader"
:ket="index" :style="{width:rowsWidth[index]}">
//表头文字
<i class="ml20 li-i" v-text="item"></i>
</span>
</div>
//列表内容区域
<div class="li-body">
//列表容器
<ul class="list">
//直播记录列表项 循环渲染
<li class="list-item" v-for="(item, index) in currentData"
:key="index" v-if="listType == 'liveRecord'">
<span class="dib fs12" :style="{width:rowswidth[0]}">
<i class="li-i ml20 fs12" v-text="item.users"></i>
</span>
</li>
//提现记录列表项
<li class="list-item" v-for="(item, index" v-if="listType == 'cashRecord'">
//金币数
<span class="dib fs12" :style="{width: rowsWidth[0]}">
<i class="li-i ml20 fs12" v-text="item.gold"></i>
</span>
//时间
<span class="dib fs12" :style="{width: rowsWidth[1]}">
<i class="li-i ml20 fs12" v-text="item.ctime"></i>
</span>
//状态
<span class="dib fs12" :stle="{width:rowsWidth[2]}">
<i :class="'li-i ml20 fs12 '+ (item.status==1? 'green' : (item.status==3?'red':''))">
//状态文字:1-成功 3-失败
{{item.status == 1?'Processing' : (item.status==3? 'Fail' : 'Success')}}
</i>
</span>
</li>
</ul>
</div>
</div>
</template>
<script>
import {defineProps}from 'vue'
const props=defineProps([
'listHeader',
'currentData',
'rowsWidth',
'listType',
'listHeight'
])
defineOptions([
name:'List'
})
</script>
<style scoped>
.list-main{
width:100%;
text-align:left;
margin-top:25px;
}
.li-head{
background:#F8F8F8;
height:43px;
width:100%;
line-height:43px;
font-size:12px;
white-space:nowrap;
color:#585858;
border-right:2px solid #f8f8f8;
}
.li-i{
font-style:normal;
}
.red{
color:#FF5F85;
}
.green{
color:#66E7D4;
}
.li-head-text{
display:inline-block;
}
.list-item{
width:100px;
height:37px;
line-height:37px;
border:1px solid #f4f4f4;
border-top:0;
white-space:nowrap;
overflow:hidden;
fone-size:0;
}
.li-body{
width:100%;
color:#979797;
font-size:11px;
}
</style>

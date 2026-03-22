//分页组件
<template>
//分页容器
<div class="pager">
<a href="javascript:;" :class="'btn btn-pager' +(currentPage <= 1 ? 'disabled' : '')"
@click="prePage">
<i class="icons icon-prev"></i>
</a>
//第一页页码 当前页是1时加active类 点击跳转到第一页
<span v-if="totalPage !== 1" :class="'page-index' +(1 == currentPage ? 'active' : '')"
@click="goPage(1)">1</span>
//前省略号:preClipped为true时显示
<span v-if="preClipped" class='page-index not-pointed">...</span>
//中间页码列表:循环渲染pages计算属性返回页码
<span v-for="index in  pages" :key="index" //循环需要加上key
:class="page-index' + (index==currentPage ? 'active' : '')"
@click="goPage(index)" v-text="index">
</span>
//后省略号:backClipped为true时显示
<span v-if="backClipped" class="page-index not-pointed">...</span>
//最后一页页码:当前页是最后一页加上active类,点击跳转到最后一页
<span :class="'page-index' + (totalPage == currentPage ? 'active' : '')"
@click="goPage(totalPage)" v-text="totalPage">
</span>
//下一页按钮
<a href="javascript:;" :class=" 'btn btn-pager ' +(currentPage >= totalPage ? 'disabled' : '')"
@click="nextPage">
<i class="icons icon-next"></i>//下一页图标
</a>
</div>
</template>
<script setup>
//computed:创建计算属性 defineProps:定义组件接收的参数
import{ref,computed,defineProps} from 'vue'
const props = defineProps({
totalPage:{
type:Number,
default:1
},
//页码切换的回调函数
goToCallback:{
type:Function,
default:()=>{}
}
})
const backClipped = ref(true)
const preClipped = ref(false)
const currentPage = ref(1)
const prePage = () =>{
if(currentPage.value <= 1) return false;
currentPage.value--
props.goToCallback(currentPage.value)
}
const nextPage=()=>{
if(currentPage.value >= props.totalPage) return false;
currentPage.value++
props.goToCallback(currentPage.value)
}
const goPage=(index)=>{
if(index !== currentPage.value){
currentPage.value=index
}
props.goToCallback(currentPage.value)
}
const pages computed(() => {
//定义空数组,存放要显示的页码
let ret = []
//处理当前页码大于3的情况
if(currentPage.value > 3){
//添加当前页-2的页码
ret.push(currentPage.value - 2)
//添加当前页-1的页码
ret.push(currentPage.value -1)
//当前页大于4,显示前省略号
if(currentPage.value > 4){
preClipped.value = true
}
}else{
preClipped.value = false
for(let i=2;i<currentPage.value;i++){
ret.push(i)
}
}
if(currentPage.value !== props.totalPage && currentPage.value !== 1){
ret.push(currentPage.value)
}
if(currentPage.value < (props.totalPage - 2)){
ret.push(currentPage.value + 1)
ret.push(currentPage.value + 2)
if(currentPage.value <= (props.totalPage - 3)){
backClipped.value = true
}
}else{
backClipped.value = false
for(let i=(currentPage.value + 1);i < props.totalPage; i++){
ret.push(i)
}
}
return ret
})
defineOptions({
name:'paging'
})
</script>
<style scoped>
.pager{
-webkit-user-select:none;
user-select:none;
transition:all .3s;
margin-top:30px;
text-align:right;
color:#D2D2D2;
font-size:13px;
}
.btn-pager{
padding:0px;
text-align:center;
vertical-align:middle;
color:#D2D2D2;
border:0;
background:none;
border-radius:0px;
display:inline-block;
cursor:pointer;
}
.btn-pager:first-child{
margin-right:12px;
}
.btn-pager:last-child{
margin-left:12px;
}
.btn-pager:hover{
color:#50E3CE;
}
.btn-pager .icons{
vertical-align: middle;
}
.page-index{
text-align:center;
vertical-align:middle;
display:inline-block;
margin-left:4px;
padding:0 7px;
height:22px;
line-height:22px;
-webkit-border-radius:100%;
-moz-border-radius:100%;
-ms-border-radius:100%;
-o-border-radius:100%;
border-radius:100%;
cursor:pointer;
}
.not-pointed{
cursor:default;
}
.active{
color:#ffffff;
background-color:#50E3CE;
}
.disabled{
cursor:not-allowed;
color:#999 !important;
}
</style>





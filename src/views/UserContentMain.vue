//用户中心内容主区域
<template>
//外层容器
<div class="content-main">
//页面标题:显示路由参数menuId
<h2>{{'This is Menu' + $route.paramsmenuId + '!'}}</h2>
//加载组件
<Loading />
</div>
</template>
<script setup>
//导入Loading组件
impor Loading from '/Loading.vue'
//$route.params.menuId就是路由里的参数
.content-main{
padding:20px;
}
h2{
font-size:18px;
color:#333;
margin-bottom:20px;
}
</style>
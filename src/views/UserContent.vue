//右侧内容区
<template>
//外层容器
<div class=="content">
//kepp-alive: 缓存组件 router-view:路由占位符
<keep-alive>
<router-view></router-view>
</keep-alive>
</div>
</template>
<script setup>
defineOption({
name:'UserContent'
})
</script>
<style scoped>
.content{
background:#fff;
vertical-align:top;
display:inline-block;
width:850px;
height:935px;
margin-left:20px;
overflow-y:auto;
overflow:hidden;
}
.content-main{
margin:20px;
text-align:left;
}
</style>
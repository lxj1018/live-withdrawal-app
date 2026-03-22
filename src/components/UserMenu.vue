<template>
//左侧菜单栏 类名menu
<div class="menu">
//菜单栏列表
<div class="menu-ul">
//第一行菜单提现页面"Personal Center"
<route link to="withdrawal" class="menu link" v-slot="{navigate,isActive}">
<li @click="navigate" :class="{'router-link-active':isActive}">Personal Center</li>
</route link>
//第二行菜单记录页面"Live Record"
<route link to="{ path: '/live-record'}" class="menu link" v-slot="{navigate,isActive}">
<li @click="navigate" :class="{'router-link-active':isActive}">Live Record</li>
</router link>
//第三行菜单充值页面"Recharge"
<route link to="/recharge" class="menu link" v-slot="{navigate,isActive}">
<li @click="navigate" :class="{'router-link-active':isActive}">Recharge</li>
</router link>
</div>
</div>
</template>
<script setup>
</script>
<style scoped>
.menu{
background-color:#fff;
width:300px;
height:740px;
margin-top:15px;
text-align:left;
color:#737373;
}
.menu-ul{
padding:0;
margin:0;
.router-link-active{
font-weight:bold;
color:#353535;
background:#DCF9D5;
}
.menu-link{
list-style-type:none;
height:60px;
cursor:pointer;
line-height:60px;
padding: 0 0 0 25px;
transition: all .4s;
}
</style>

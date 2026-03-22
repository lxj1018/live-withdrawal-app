//用户提现组件
<template>
<transition name="slide">
//提现信息 最外层的容器
<div class="conent-main bank-info">
//页面的标题
<h2 class="bold">Bind the bank card</h2>
//个人信息表单
<div class="form">
<div class="form-head">
<h4>Personal information</h4>
</div>
<div class="form-content">
//名字输入框
<div class="form-one">
<label><span class="c-red">带*为必填项目</span>Full name</label>
//v-model双向绑定
<input type="text" class="line" v-model="info.name" maxlength="50" require autofocus>
</div>
//手机号输入框
<div class="form-one inline">
<span class="c-red">*</span>
<label data-wordkey="withdrawal-phone">Phone number</label>
<input type="text" class="line" v-model="info.phone" maxlength="30 required>
</div>
//地址输入框
<div class="form-one inline ml19">
<span class="c-red">*</span>
<label data-wordkey="withdrawals-addr">Home address</label>
<input type="text" class="line" v-model="info.address" maxlength="70" required>
</div>
</div>
</div>
//账户信息表单
<div class="form">
<div class="form-head">
<h4>Account details</h4>
</div>
<div class="form-content">
//银行名称
<div class="form-one">
<span class="c-red">*</span>
<label>Bank name</label>
<input type="text" class="line" v-model="info.bank_name" maxlength="60" required>
</div>
//账户人
<div class="form-one">
<span class="c-red">*</span>
<label data-wordkey="withdrawal-bank-holder">Account holder</label>
<input type="text" class="line" v-model="info.account_owner" maxlength="50" required>
</div>
//银行支行名称
<div class="form-one form-one-long inline ml19">
<label data-wordkey="withdrawals-bank-branch">Bank branch name</label>
<input type="text" v-model="info.bank_branch" class="line" maxlength="60">
</div>
</div>
</div>
//协议信息表单
<div class="form">
<div class="form-head">
<h4>Agreement information</h4>
</div>
<div class="form-content">
<div class="form-one">
<span class="c-red">*</span>
<label data-wordkey="withdrawals-info-text1">Your agency:</label>
<input type="text" class="line" v-model="info.agency" maxlength="100" required>
</div>
//签署纸质合同
<div class="form-one w2">
<label data-wordkey="withdrawals-info-text3">Have you signed a paper contract with It'sMe?</label>
//点击yes
<input class="ml20" id="radio1" type="radio"name="input-contract" value="1" @click="info.contract=1">Yes
<input class="ml10" id="radios2" type="radio" name="input-contract" value="0" @click="info.contract=0">No
</div>
</div>
</div>
//按钮区域
<div class="c-btn">
<a href="javascript:;" class="btn"@click="saveUserBankInfo">Save</a>
<router-link class="btn gray ml20" to="/withdrawal/">Cancel</router-link>
</div>
</div>
</transition>
</template>
<script setup>
import{ref,watch}from 'vue'
impor{useRouter}from 'vue-router'
//创建路由跳转页面
const router=useRouter()
const info=ref({
name:'',
phone:'',
address:'',
user_id:'',
bank_name:'',
account_owner:'',
bank_account:'',
banl_address:'',
swift_code:'',
bank_branch:'',
agency:'',
contract:0,
})
//监听单选框状态
watch(
()=>info.value.contract,
(val)=>{
const radio1 = document.getElementById('radio1')
const radio2 = document.getElementById('radio2')
val === 1 ? (radio1.checked = true) : (radio2.checked = true)
}
)
//保存用户银行卡的信息
const savaUserBankInfo = () => {
const{ name,phone, user_id,address,bank_name,account_owner,bank_account,bank_address,swift_code,agency}=info.value
//检查必填项是否为空
if(
name === '' || 
phone === '' ||
user_id === '' || 
address === '' || 
bank_name === '' ||
account_owner === '' ||
bank_account === '' ||
bank_address === '' ||
swift_code === '' ||
agency === ''
){
alert('Please fill in the required!')
return //终止方法不执行下面的代码
}
//所有的填项填完调用提交
sendUserBankinfo()
}
//提交保存请求
const sendUserBankinfo = () =>{
router.push('/withdrawal')
}
</script>
<style scoped>
.bank-info{
width:600px;
margin:35px auto;
overflow-y:auto;
}
.c-red{
color:#FF6B8B;
position:relative;
top:2px;
margin-right:2px;
}
.line{
widtg:578px;
padding:0 10px;
margin-top:10px;
background:#fff;
color:#333;
height:39px;
line-height:39px;
border-radius:5px;
border:1px solid #E3E3E3;
overflow:hidden;
}
.line.warn{
border:1px solid #f88787;
}
.form-one{
margin-top:20px;
font-size:13px;
width:100%;
}
.form-one.inline{
display:inline-block;
width:288px;
}
.inline .line{
width:266px;
}
.form-head{
margin-30px 0 10px;
}
.c-btn{
margin-top:50px;
}
.btn{
width:200px;
display:inline-block;
background-color:#50E3CE;
text-align:center;
line-height:40px;
margin:0 auto 15px;
height:40px;
color:#fff;
font-size:14px;
border-radius:5px;
position:relative;
text-decoration:none;
}
.btn.gray{
color:#727272;
border:1px solid #F0F0F0;
background-color:transparent;
}
.ml19{
margin-left:19px;
}
.ml20{
margin-left:20px;
}
.ml10{
margin-left:10px;
}
</style>

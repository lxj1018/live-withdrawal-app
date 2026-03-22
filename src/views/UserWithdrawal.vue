//用户提现组件
<template>
  <transition name="slide">
    <div class="content-main cash" style="display: flex; gap: 20px;">
      //左侧用户信息栏
      <div style="width: 320px; background: #fff; padding: 20px; border-radius: 4px; box-sizing: border-box; align-self: flex-start;">
        //用户头像和信息
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <img src="@/assets/images/user-avatar.jpg" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 1px solid #eee;">
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span style="font-size: 18px; color: #333; font-weight: 500;">Doterlin</span>
              <span style="background: #ff7800; color: #fff; padding: 1px 8px; border-radius: 10px; font-size: 12px; display: flex; align-items: center; gap: 3px;">
                <img src="@/assets/images/star-icon.png" style="width: 10px; height: 10px; margin-right: 2px;">20
              </span>
            </div>
            //用户ID
            <div style="font-size: 14px; color: #666; margin-bottom: 8px;">ID:10000</div>
            <div style="font-size: 14px; color: #666; display: flex; align-items: center; gap: 15px;">
              <span style="display: flex; align-items: center; gap: 4px;">
                8864 <img src="@/assets/images/star-small.png" style="width: 16px; height: 16px;">
              </span>
              <span style="color: #eee;">|</span>
              <span style="display: flex; align-items: center; gap: 4px;">
                2186 <img src="@/assets/images/diamond-small.png" style="width: 16px; height: 16px;">
              </span>
            </div>
          </div>
        </div>
        //侧边栏菜单
        <div style="margin-top: 10px; border-radius: 4px; overflow: hidden;">
          <div style="padding: 15px 20px; background: #dcfaf5; color: #222; font-size: 16px; font-weight: 500;">Personnal Center</div>
          <div style="padding: 15px 20px; color: #666; font-size: 16px;">Live Record</div>
          <div style="padding: 15px 20px; color: #666; font-size: 16px;">Recharge</div>
        </div>
      </div>

    // 提现功能区
      <div style="flex: 1;">
        <Loading v-if="loadingData"></Loading>
        <div class="con" v-if="!loadingData">
          <div class="header">
            <div class="cols">
              <div class="col">
                <p class="col-top">
                  <img src="@/assets/images/star-big.png" style="width: 24px; height: 24px; vertical-align: middle; margin-right: 8px;">
                  <span class="col-h" v-text="preWithdraw.gold || 0"></span>
                </p>
                <p class="col-down">Can be mentioned stars</p>
              </div>
              <div class="break"></div>
              <div class="col">
                <p class="col-top">
                  <span class="col-h" v-text="'$ ' + preWithdraw.withdraw || 0"></span>
                </p>
                <p class="col-down">Total revenue</p>
              </div>
            </div>
            //提现操作区
            <div class="form" v-if="preWithdraw">
              <div class="is-accept" v-if="preWithdraw.withdraw_accept || true">
                <input type="number" class="input" placeholder="Please enter number." v-model="withdrawalNumber">
                <a href="javascript:;" :class="'btn-lg' + (isWdLoading?' btn-loading':'')" @click="applyWithdrawals()">Withdrawal</a>
                //提现规则
                <a class="tip" @mouseover="showTip" @mouseout="closeTip">
                  <span class="dib">Withdrawal Rule</span><i :class="'icons ' + (isShowTip? 'info-focus' : 'info')"></i>
                </a>
                <transition name="fade">
                  <div class="tip-tag" v-if="isShowTip">
                    <div class="arrow">
                      <em></em><span></span>
                    </div>More than 0 stars can apply for cash withdrawal 
                    can be submitted at any time to withdraw the 
                    application, but need to complete a transaction before 
                    they can submit the next pen, each mention is to 1 stars
                  </div>
                </transition>
              </div>
              <div class="no-accept" v-if="!preWithdraw.withdraw_accept || false">
                <div class="ml10 bold mt">The last mention</div>
                <div class="noaccept-bg"></div>
                <div class="noaccept-text"><span class="text text1">Submit</span><span class="text text2">Processing</span><span class="text text3">Success</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        //提现记录
        <div class="record">
          <div class="ml10 bold mt">Withdrawals record</div>
          //分页列表组件
          <PagingList 
            :onePageNum="onePageNum" 
            :isShowPaging="true" 
            :listHeight="listHeight" 
            :data="cashRecordList" 
            :listHeader="listHeader" 
            :rowsWidth="rowsWidth" 
            :listType="listType"
          ></PagingList>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
//引入自定义组件
import PagingList from './PagingList.vue'
import Loading from './Loading.vue'

export default {
  name: 'UserWithdrawal',
  data(){
    return{
      cashRecordFetchUrl: this.$store.state.domain + '/wdrecord.php',
      withdrawalUrl: this.$store.state.domain + '/apply.php',
      cashRecordList: [],
      withdrawalNumber: "",
      //提现数据(星星总收入是否可以提现)
      preWithdraw: {
        gold: 0,
        withdraw: 0,
        withdraw_accept: true
      },
      onePageNum: 9,
      rowsWidth: ['40%', '40%', '20%'],
      listHeader:['Amount', 'Submission', 'Status'],
      listType:'cashRecord',
      listHeight:'auto', // 自适应高度，显示所有数据
      isShowTip: false,
      isAccept: true,
      loadingData: true,
      isWdLoading: false
    }
  },
  //注册组件
  components:{
    PagingList,
    Loading
  },
  mounted(){
    this.getCashRecord();
    this.getPre();
  },
  methods:{
  //显示提现规则提示框
    showTip(){
      this.isShowTip = true;
    },
    //关闭提现规则提示框
    closeTip(){
      this.isShowTip = false;
    },

    getPre(){
      this.preWithdraw = {gold: "39500", withdraw: 200, withdraw_accept: true}
    },
    applyWithdrawals: function(){
      let ts = this;
      let diamonds = ts.preWithdraw.gold;
      //提现金额为空
      if(ts.withdrawalNumber == ""){
        alert("Please fill in the numbers.");
        return false;
      }
      //防止重复提交
      if(ts.isWdLoading){
        return false;
      }
      //金额必须是数字
      if(!/^\d+$/.test(ts.withdrawalNumber)){
        alert('Please fill in the correct number!');
        return false;
      }
      //提现的星星是否小于等于0
      if(+diamonds <= 0){
        alert("The current diamond number is less than 40000!");
        return false;
      }
      if(+ts.withdrawalNumber>+diamonds){
        alert(ts.getWord('Cash is greater than the current number of stars!'));
        return false;
      }
      this.$router.push('/bank-info/');
      return false;
      ts.gotoWithdrawal() 
    },
    gotoWithdrawal(){
      let ts = this;
      ts.isWdLoading = true;
      setTimeout(()=>{
        ts.isWdLoading = false;
      },2000)
    },
    getCashRecord(){
      var ts = this;
      setTimeout(function(){
        ts.loadingData = false;
        // 24条2026年提现数据
        ts.cashRecordList = [
          { gold: 10, ctime: '2026-01-12', status: 1 },
          { gold: 20, ctime: '2026-01-11', status: 2 },
          { gold: 20, ctime: '2026-01-11', status: 3 },
          { gold: 20, ctime: '2026-01-11', status: 2 },
          { gold: 20, ctime: '2026-01-11', status: 2 },
          { gold: 20, ctime: '2026-01-11', status: 2 },
          { gold: 20, ctime: '2026-01-11', status: 1 },
          { gold: 20, ctime: '2026-01-11', status: 2 },
          { gold: 20, ctime: '2026-01-11', status: 3 },
          { gold: 20, ctime: '2026-01-11', status: 2 },
          { gold: 20, ctime: '2026-01-11', status: 2 },
          { gold: 20, ctime: '2026-01-11', status: 1 },
          { gold: 15, ctime: '2026-01-10', status: 1 },
          { gold: 30, ctime: '2026-01-09', status: 2 },
          { gold: 25, ctime: '2026-01-08', status: 3 },
          { gold: 18, ctime: '2026-01-07', status: 2 },
          { gold: 22, ctime: '2026-01-06', status: 1 },
          { gold: 40, ctime: '2026-01-05', status: 2 },
          { gold: 12, ctime: '2026-01-04', status: 3 },
          { gold: 35, ctime: '2026-01-03', status: 2 },
          { gold: 28, ctime: '2026-01-02', status: 1 },
          { gold: 19, ctime: '2026-01-01', status: 2 },
          { gold: 45, ctime: '2026-12-31', status: 2 },
          { gold: 50, ctime: '2026-12-30', status: 3 }
        ];
      },1000)
    },
    getWord(str){
      return str;
    }
  }
}
</script>

<style scoped>
.cash{margin: 20px 0;}
.cash .con{background: #f1f1f1; margin: 20px 0;}
.header,.record{padding: 0 20px;}
.header{background-color: #fff; padding-bottom: 25px;}
.cols{text-align: center;}
.col{display: inline-block; width: 49%; text-align: center; height: 90px; vertical-align: middle;}
.col-h{font-size: 29px; color: #333333; vertical-align: middle;}
.col-top{margin-top: 16px;}
.col-down{margin-top: 4px;}
.col-top .icons{vertical-align: middle; margin-right: 5px;}
.break{border-left: 1px  solid #EAEAEA; height: 40px; display: inline-block;  vertical-align: middle;}
.col-down{font-size: 15px; color: #8D8D8D;}

.no-accept{padding-top:20px;}
.noaccept-bg{ width: 560px; height: 60px; margin: 0 auto; margin-top:20px; background-image: url(../images/noaccept.png);}
.noaccept-text{width: 560px; font-size: 13px; margin: 0 auto; margin-top:20px;}
.noaccept-text .text{width: 33.3%; display: inline-block; margin: 0 auto;}
.noaccept-text .text1{text-align: left;}
.noaccept-text .text2{text-align: center;}
.noaccept-text .text3{text-align: right; color: #DADADA}

.is-accept{font-size: 13px; text-align: center;}
.form{background-color: #F8F8F8; height: 186px; margin-top: 23px;}
.input{width: 278px; padding: 0 10px; margin: 0 auto; margin-top:25px;background: #fff;color: #333; height: 39px; line-height: 39px; border-radius: 5px; border: 1px solid #E3E3E3;}
.btn-lg{ display: block;width:300px; margin: 0 auto;background: #50E3CE;color: #fff;height: 41px;line-height: 41px;border-radius: 5px;margin-top:20px;}
.btn-loading{background: #ccc !important; cursor: not-allowed !important;}
.tip{ display: block;color: #8A8A8A; width: 150px; cursor: pointer; font-size: 12px;height:18px; line-height: 18px; margin: 16px auto 0;}
.tip .icons{vertical-align: top; margin-left: 6px;}
.tip:hover{color: #50E3CE}

.tip-tag{text-align: left; color: #333; line-height: 1.6; width:380px; -webkit-box-shadow:  0px 3px 16px #cbc8c8;
box-shadow:  0px 3px 16px #cbc8c8; padding: 20px; -webkit-border-radius: 5px;
-moz-border-radius: 5px;
-ms-border-radius: 5px;
-o-border-radius: 5px;
border-radius: 5px; position:relative; background-color:#FFF; margin: 15px auto 0;}
.arrow{ position:absolute; width:10px; height:10px; top:-20px; left:200px; }
.arrow *{ display:block; border-width:10px; position:absolute; border-style:solid dashed dashed dashed; font-size:0; line-height:0; }
.arrow em{border-color:transparent transparent #aba9a9}
.arrow span{border-color:transparent transparent #FFF; top:0;}

.record{background-color: #fff; margin-top: 15px; padding-top: 30px;}
.ml10{margin-left: 10px;}
.bold{font-weight: bold;}
.mt{margin-top: 10px;}
.dib{display: inline-block;}

.icons{
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.icons.star{background-image: url(../images/star.png);}
.icons.diamond{background-image: url(../images/diamond.png);}
.icons.info{background-image: url(../images/info.png);}
.icons.info-focus{background-image: url(../images/info-focus.png);}
</style>
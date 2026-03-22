//展示用户信息
<template>
  <div class="info">
  //展示用户头像 类名"portrait"
    <div class="portrait">
      <img :src="portrait" width="80" height="80" alt="用户头像" />
    </div>
    //展示用户的核心信息
    <div class="user-info">
    //这里显示名字和段位 类名"nick-level"
      <div class="nick-level">
      //这里使用v-text动态自由的显示名字("nick")数据(这个是不太会的我就搜了)
        <div class="nick" v-text="nick"></div>
        //展示用户的段位类名"level"
        <div class="level">
        //这里的levelClass我不太会,搜了一下意思应该是根据段位来改变图标
          <i :class="['icons', 'icon_level_' + levelClass]"></i>
          <span v-text="level"></span>
        </div>
      </div>
      //展示用户的ID 类名"uid"
      <div class="uid" v-text="'ID:' + uid"></div>
      //展示用户的小金库类名"wealth"
      <div class="wealth">
      //展示星星数量 类名"w-star"
        <div class="w-star">
          <span v-text="starNumber"></span>
          <i class="icons icon_star"></i>
        </div>
        //展示钻石的数量 类名"w-diamond"
        <div class="w-diamond">
          <span v-text="diamondNumber"></span>
          <i class="icons icon_diamond"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//通过defineProps接受父组件传递的用户信息
import { defineProps, computed } from 'vue'

// 接收父组件传过来的用户信息的数据
const props = defineProps([
  'nick',        // 名字
  'level',       // 段位
  'uid',         // ID
  'starNumber',  // 星星数量
  'diamondNumber', // 钻石数量
  'portrait'     // 头像
])
// 段位样式 如果段位是0或者空显示1段位
const levelClass = computed(() => {
  return props.level || 1
})
</script>

<style scoped>
//用户信息卡片的样式
.info {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #eee;
}
//用户的头像样式
.portrait {
  margin-right: 15px;
}
.portrait img {
  border-radius: 50%; //头像的圆角
}
//用户的名字和段位的样式
.nick-level {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

//名字的样式
.nick {
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
}

//段位的样式
.level {
  display: flex;
  align-items: center;
  padding: 2px 8px;
  background-color: #ff9f43;
  color: white;
  border-radius: 12px;
  font-size: 12px;
}
//用户的ID的样式
.uid {
  font-size: 12px;
  color: #666;
}

//小金库的样式
.wealth {
  display: flex;
}
.w-star, .w-diamond {
  display: flex;
  align-items: center;
  margin-right: 15px;
  font-size: 12px;
  color: #666;
}

//星星钻石图标的样式
.icons {
  margin-left: 4px;
}
.icon_star::before {
  content: "⭐";
}
.icon_diamond::before {
  content: "💎";
}
.icon_level_1::before,
.icon_level_20::before {
  content: "🏆";
}
</style>
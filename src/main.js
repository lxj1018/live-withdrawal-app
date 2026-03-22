import { createApp } from 'vue'
// 导入根组件
import App from './App.vue'

// Cookie 操作方法
function setCookie(c_name, value, expiredays) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = `${c_name}=${escape(value)}${expiredays ? `;expires=${exdate.toGMTString()}` : ''}`
}

function getCookie(name) {
  const arr = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)(;|$)`))
  return arr ? arr[2] : null
}

// 创建 Vue 应用
const app = createApp(App)

// 挂载全局 Cookie 方法
app.config.globalProperties.$setCookie = setCookie
app.config.globalProperties.$getCookie = getCookie

// 挂载到 DOM 节点
app.mount('#app')
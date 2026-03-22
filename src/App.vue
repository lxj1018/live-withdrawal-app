<template>
  <div class="user-center">
    <!-- 左侧边栏 -->
    <div class="sidebar">
      <!-- 用户信息卡片 -->
      <div class="user-card">
        <img :src="userInfo.portrait" class="avatar">
        <div class="user-info">
          <h3>{{ userInfo.nick }} <span class="level-badge">👑 {{ userInfo.ulevel }}</span></h3>
          <p class="uid">UID: {{ userInfo.uid }}</p>
          <div class="user-icons">
            <span>⭐ {{ userInfo.point }}</span>
            <span>💎 {{ userInfo.gold }}</span>
          </div>
        </div>
      </div>

      <!-- 侧边菜单 -->
      <div class="menu">
        <div 
          class="menu-item" 
          :class="{ active: activeTab === 'personal' }"
          @click="activeTab = 'personal'"
        >
          Personal Center
        </div>
        <div 
          class="menu-item" 
          :class="{ active: activeTab === 'live' }"
          @click="activeTab = 'live'"
        >
          Live Record
        </div>
        <div 
          class="menu-item" 
          :class="{ active: activeTab === 'recharge' }"
          @click="activeTab = 'recharge'"
        >
          Recharge
        </div>
      </div>
    </div>

    <!-- 右侧内容 -->
    <div class="content">
      <!-- 顶部统计 - 只在 Personal Center 显示 -->
      <div v-if="activeTab === 'personal'" class="stats-header">
        <div class="stat-item">
          <span class="star-large">⭐</span>
          <div class="stat-text">
            <div class="stat-value">{{ withdrawData.gold.toLocaleString() }}</div>
            <div class="stat-label">Can be mentioned stars</div>
          </div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-text">
            <div class="stat-value">$ {{ withdrawData.totalMoney }}</div>
            <div class="stat-label">Total revenue</div>
          </div>
        </div>
      </div>

      <!-- Personal Center 内容 -->
      <div v-if="activeTab === 'personal'" class="personal-tab">
        <!-- 提现操作区域 -->
        <div class="withdraw-section">
          <div class="withdraw-form">
            <input 
              type="number" 
              class="withdraw-input" 
              v-model="withdrawAmount" 
              placeholder="Please enter number."
            >
            <button class="withdraw-btn" @click="handleWithdraw">Withdrawal</button>
          </div>

          <!-- 提现规则提示框 -->
          <div class="rule-wrapper" @mouseenter="showRule = true" @mouseleave="showRule = false">
            <span class="rule-text">Withdrawal Rule ℹ️</span>
            <div class="rule-popup" v-if="showRule">
              <div class="popup-arrow"></div>
              <div class="popup-content">
                More than 0 stars can apply for cash withdrawal<br>
                can be submitted at any time to withdraw the application,<br>
                but need to complete a transaction before they can submit the next pen,<br>
                each mention is to 1 stars
              </div>
            </div>
          </div>
        </div>

        <!-- 提现记录 -->
        <div class="records-section">
          <h4>Withdrawals record</h4>
          <table class="record-table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Submission</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in paginatedRecords" :key="idx">
                <td>{{ item.amount }}</td>
                <td>{{ item.date }}</td>
                <td :class="getStatusClass(item.status)">{{ getStatusText(item.status) }}</td>
              </tr>
            </tbody>
          </table>

          <div class="pagination" v-if="totalPages > 1">
            <button 
              class="page-btn" 
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              &lt;
            </button>
            <button 
              v-for="page in totalPages" 
              :key="page"
              class="page-btn"
              :class="{ active: currentPage === page }"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <button 
              class="page-btn" 
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      <!-- Live Record 内容 -->
      <div v-if="activeTab === 'live'" class="live-tab full-height">
        <div class="records-section full-height">
          <h4>Live Record</h4>
          <table class="record-table two-columns">
            <thead>
              <tr>
                <th>Calculate time</th>
                <th>ACU</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in paginatedLiveData" :key="idx">
                <td>{{ item.time }}</td>
                <td class="acu-value">{{ item.acu }}</td>
              </tr>
            </tbody>
          </table>

          <div class="pagination" v-if="liveTotalPages > 1">
            <button 
              class="page-btn" 
              :disabled="liveCurrentPage === 1"
              @click="liveCurrentPage--"
            >
              &lt;
            </button>
            <button 
              v-for="page in [1, 2]" 
              :key="page"
              class="page-btn"
              :class="{ active: liveCurrentPage === page }"
              @click="liveCurrentPage = page"
            >
              {{ page }}
            </button>
            <button 
              class="page-btn" 
              :disabled="liveCurrentPage === liveTotalPages"
              @click="liveCurrentPage++"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      <!-- Recharge 内容 -->
      <div v-if="activeTab === 'recharge'" class="recharge-tab">
        <!-- 顶部剩余钻石提示栏 -->
        <div class="diamond-info-bar">
          Number of remaining diamonds: <span class="diamond-number">{{ userInfo.gold }}</span>
        </div>

        <!-- Select the recharge type 区域 -->
        <div class="recharge-type-section">
          <h3 class="section-title">Select the recharge type</h3>
          <div class="recharge-buttons">
            <div 
              v-for="option in rechargeOptionsWithLogo" 
              :key="option.name"
              class="recharge-option-btn"
              :class="{ active: selectedRechargeType === option.name }"
              @click="selectedRechargeType = option.name"
            >
              <img :src="option.logo" class="option-logo" alt="logo">
              <span class="option-name">{{ option.name }}</span>
              <span class="check-icon" v-if="selectedRechargeType === option.name">✓</span>
            </div>
          </div>
        </div>

        <!-- Enter the card information 区域 -->
        <div class="card-info-section">
          <h3 class="section-title">Enter the card information</h3>
          <div class="input-group">
            <input 
              type="text" 
              class="card-input" 
              v-model="cardNo"
              placeholder="Please Input your Card No."
            >
            <input 
              type="text" 
              class="card-input" 
              v-model="serialNo"
              placeholder="Please Input your Serial Card No."
            >
            <button class="recharge-submit-btn" @click="handleRecharge">Recharge</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import avatarImg from '@/assets/images/user-avatar.jpg'

const activeTab = ref('personal')

const userInfo = ref({
  nick: 'XJlin',
  ulevel: 20,
  uid: 10000,
  gold: 6666,
  point: 8888,
  portrait: avatarImg
})

const withdrawData = ref({
  gold: 39500,
  totalMoney: 200
})

const withdrawAmount = ref(1)
const showRule = ref(false)

// Recharge 相关数据
const selectedRechargeType = ref('Vinaphone')
const cardNo = ref('')
const serialNo = ref('')

// 充值选项
const rechargeOptionsWithLogo = ref([
  { name: 'Vinaphone', logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="%230066CC"/%3E%3Ctext x="50" y="70" text-anchor="middle" fill="white" font-size="40" font-weight="bold"%3EV%3C/text%3E%3C/svg%3E' },
  { name: 'MobiFone', logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23FF0000"/%3E%3Crect x="10" y="10" width="80" height="80" fill="%23003399"/%3E%3Ctext x="50" y="70" text-anchor="middle" fill="white" font-size="40"%3EM%3C/text%3E%3C/svg%3E' },
  { name: 'FPT Gate', logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%2300AA55"/%3E%3Crect x="20" y="20" width="60" height="60" fill="%23FF6600"/%3E%3Ctext x="50" y="70" text-anchor="middle" fill="white" font-size="30"%3EFPT%3C/text%3E%3C/svg%3E' },
  { name: 'Viettel', logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="%23FF6600"/%3E%3Ctext x="50" y="70" text-anchor="middle" fill="white" font-size="40"%3EV%3C/text%3E%3C/svg%3E' },
  { name: 'Megacard', logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%2300AA55"/%3E%3Ccircle cx="50" cy="50" r="35" fill="%23FF8800"/%3E%3Ctext x="50" y="70" text-anchor="middle" fill="white" font-size="30"%3EM%3C/text%3E%3C/svg%3E' },
  { name: 'Zing', logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23FF3366"/%3E%3Ctext x="50" y="70" text-anchor="middle" fill="white" font-size="40"%3EZ%3C/text%3E%3C/svg%3E' },
  { name: 'Oncash', logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cellipse cx="50" cy="50" rx="40" ry="35" fill="%23FFAA00"/%3E%3Ctext x="50" y="70" text-anchor="middle" fill="white" font-size="35"%3EO%3C/text%3E%3C/svg%3E' }
])

// Personal Center 数据
const allRecords = ref([
  { amount: 10, date: '2026-01-12', status: 1 },
  { amount: 20, date: '2026-01-11', status: 2 },
  { amount: 20, date: '2026-01-11', status: 3 },
  { amount: 20, date: '2026-01-11', status: 2 },
  { amount: 20, date: '2026-01-11', status: 2 },
  { amount: 20, date: '2026-01-11', status: 1 },
  { amount: 20, date: '2026-01-11', status: 2 },
  { amount: 20, date: '2026-01-11', status: 3 },
  { amount: 30, date: '2026-01-10', status: 2 },
  { amount: 15, date: '2026-01-09', status: 1 },
  { amount: 25, date: '2026-01-08', status: 2 },
  { amount: 40, date: '2026-01-07', status: 3 },
  { amount: 12, date: '2026-01-06', status: 2 },
  { amount: 18, date: '2026-01-05', status: 2 },
  { amount: 22, date: '2026-01-04', status: 1 }
])

const pageSize = 5
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(allRecords.value.length / pageSize))
const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return allRecords.value.slice(start, end)
})

// Live Record 数据
const liveData = ref([
  { time: '2026-08-06 02:40:02', acu: '6' },
  { time: '2026-08-06 02:35:02', acu: '12' },
  { time: '2026-08-06 02:30:02', acu: '8' },
  { time: '2026-08-06 02:25:02', acu: '15' },
  { time: '2026-08-06 02:20:02', acu: '10' },
  { time: '2026-08-06 02:15:02', acu: '7' },
  { time: '2026-08-06 02:10:02', acu: '9' },
  { time: '2026-08-06 02:05:02', acu: '11' },
  { time: '2026-08-06 02:00:02', acu: '14' },
  { time: '2026-08-06 01:55:02', acu: '5' }
])

const livePageSize = 5
const liveCurrentPage = ref(1)
const liveTotalPages = computed(() => Math.ceil(liveData.value.length / livePageSize))
const paginatedLiveData = computed(() => {
  const start = (liveCurrentPage.value - 1) * livePageSize
  const end = start + livePageSize
  return liveData.value.slice(start, end)
})

const getStatusClass = (status) => {
  const map = { 1: 'processing', 2: 'success', 3: 'fail' }
  return map[status] || ''
}

const getStatusText = (status) => {
  const map = { 1: 'Processing', 2: 'Success', 3: 'Fail' }
  return map[status] || ''
}

const handleWithdraw = () => {
  if (withdrawAmount.value > 0 && withdrawAmount.value <= withdrawData.value.gold) {
    alert(`Withdrawal request for ${withdrawAmount.value} stars submitted!`)
  } else {
    alert(`Please enter a valid amount (1 to ${withdrawData.value.gold})`)
  }
}

const handleRecharge = () => {
  alert(`Recharge with ${selectedRechargeType.value}\nCard No: ${cardNo.value}\nSerial No: ${serialNo.value}`)
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  background: #f5f5f5;
}

.user-center {
  max-width: 1400px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  gap: 30px;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
  padding: 20px;
}

.sidebar {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.user-card {
  background: white;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.level-badge {
  background: #ff9800;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.uid {
  font-size: 13px;
  color: #999;
  margin-bottom: 12px;
}

.user-icons {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #666;
}

.user-icons span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.star-large {
  font-size: 32px;
}

.menu {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  flex-shrink: 0;
}

.menu-item {
  padding: 14px 20px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.menu-item:hover {
  background: #f9f9f9;
  color: #333;
}

.menu-item.active {
  background: #f0f7f5;
  color: #4cdbc4;
  border-left-color: #4cdbc4;
  font-weight: 500;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}

/* Recharge 页面样式 */
.recharge-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.diamond-info-bar {
  background: #f7f7f7;
  padding: 16px 24px;
  font-size: 14px;
  color: #888;
  text-align: left;
  margin-bottom: 32px;
}

.diamond-number {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-left: 4px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: left;
}

.recharge-type-section {
  margin-bottom: 40px;
}

.recharge-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  row-gap: 16px;
}

.recharge-option-btn {
  position: relative;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.recharge-option-btn:hover {
  border-color: #4cdbc4;
}

.recharge-option-btn.active {
  border-color: #4cdbc4;
  background: white;
}

.option-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.option-name {
  font-size: 13px;
  color: #666;
}

.check-icon {
  position: absolute;
  bottom: 6px;
  right: 8px;
  width: 18px;
  height: 18px;
  background: #4cdbc4;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.card-info-section {
  flex: 1;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
}

.card-input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
}

.card-input:focus {
  border-color: #4cdbc4;
}

.card-input::placeholder {
  color: #bbb;
  font-size: 13px;
}

.recharge-submit-btn {
  width: 100%;
  padding: 14px 16px;
  background: #4cdbc4;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;
}

.recharge-submit-btn:hover {
  background: #3bc0ab;
}

/* 其他页面样式 */
.stats-header {
  background: white;
  border-radius: 8px;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  flex-shrink: 0;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-text {
  text-align: left;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #333;
}

.stat-label {
  font-size: 13px;
  color: #999;
  margin-top: 4px;
}

.stat-divider {
  width: 1px;
  height: 50px;
  background: #e0e0e0;
}

.withdraw-section {
  background: white;
  border-radius: 8px;
  padding: 32px;
  margin-bottom: 24px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  flex-shrink: 0;
}

.withdraw-form {
  display: flex;
  justify-content: center;
  gap: 0;
  margin-bottom: 20px;
}

.withdraw-input {
  width: 280px;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 14px;
  outline: none;
}

.withdraw-input:focus {
  border-color: #4cdbc4;
}

.withdraw-btn {
  padding: 12px 24px;
  background: #4cdbc4;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.withdraw-btn:hover {
  background: #3bc0ab;
}

.rule-wrapper {
  position: relative;
  display: inline-block;
}

.rule-text {
  font-size: 13px;
  color: #999;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.rule-popup {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 12px;
  width: 360px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 100;
}

.popup-arrow {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
}

.popup-content {
  padding: 16px;
  font-size: 12px;
  line-height: 1.6;
  color: #333;
  text-align: left;
}

.records-section {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.full-height {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.records-section h4 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.record-table {
  width: 100%;
  border-collapse: collapse;
  flex: 1;
}

.record-table th,
.record-table td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.record-table th {
  font-size: 13px;
  font-weight: 600;
  color: #999;
  background: #fafafa;
}

.record-table td {
  font-size: 14px;
  color: #666;
}

.two-columns td:first-child {
  font-family: monospace;
  font-size: 13px;
}

.acu-value {
  color: #4cdbc4;
  font-weight: 500;
}

.processing {
  color: #ff9800;
}

.success {
  color: #4cdbc4;
}

.fail {
  color: #ff6b6b;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  flex-shrink: 0;
}

.page-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  border-color: #4cdbc4;
  color: #4cdbc4;
}

.page-btn.active {
  background: #4cdbc4;
  border-color: #4cdbc4;
  color: white;
}

.page-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
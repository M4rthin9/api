<script setup>
import { ref, onMounted } from 'vue'

const API_URL = 'https://api-ifmc.onrender.com/api'
const currentUser = ref(null)
const allRows = ref([])

const doLogin = async () => {
  // Admin login functionality using API_URL + '/login'
}

const loadData = async () => {
  try {
    const resp = await fetch(API_URL + '/getAll')
    const data = await resp.json()
    if (data.status === 'ok') {
      allRows.value = data.rows || []
    }
  } catch (err) {
    console.error('Load data error:', err)
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div>
    <div class="login-wrap" v-if="!currentUser">
      <div class="login-box">
        <div class="login-icon">🔐</div>
        <h1>หน้าเจ้าหน้าที่</h1>
        <p>ทัณฑสถานบำบัดพิเศษกลาง</p>
        <input type="text" class="login-input" placeholder="ชื่อผู้ใช้" />
        <input type="password" class="login-input" placeholder="รหัสผ่าน" />
        <button class="login-btn" @click="doLogin">เข้าสู่ระบบ</button>
      </div>
    </div>

    <div class="dash" v-else>
      <div class="sidebar">
        <div class="sb-brand">
          <div style="font-size:24px">🏛️</div>
          <div>
            <div style="font-weight:700;font-size:14px">ระบบเจ้าหน้าที่</div>
            <div style="font-size:10px;opacity:.6">ทัณฑสถานบำบัดพิเศษกลาง</div>
          </div>
        </div>
        <nav class="sb-nav">
          <router-link class="sb-link active" to="/">🏠 <span class="sb-text">ภาพรวม</span></router-link>
        </nav>
      </div>

      <div class="content-area">
        <div class="topbar">
          <h1>🏛️ ระบบตรวจสอบการจองเยี่ยม</h1>
        </div>
        <div class="main">
          <p>Admin dashboard - API connected to: {{ API_URL }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem; }
.login-box { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 2.5rem 2rem; width: 100%; max-width: 380px; text-align: center; }
.login-icon { font-size: 40px; margin-bottom: 1rem; }
.login-box h1 { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
.login-input { width: 100%; padding: 11px 14px; border: 1px solid var(--border); border-radius: 8px; font-size: 15px; text-align: center; letter-spacing: 4px; margin-bottom: 12px; }
.login-btn { width: 100%; padding: 12px; background: var(--blue); color: #fff; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; }
.login-btn:hover { background: var(--blue-dark); }

.sidebar { position: fixed; top: 0; left: 0; width: 210px; height: 100vh; background: var(--blue-dark); color: #fff; display: flex; flex-direction: column; padding: 14px 10px; font-size: 13px; }
.sb-brand { display: flex; align-items: center; gap: 10px; padding: 8px 10px; margin-bottom: 16px; }
.sb-nav { display: flex; flex-direction: column; gap: 2px; }
.sb-link { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px; color: rgba(255,255,255,0.85); text-decoration: none; font-size: 13.5px; }
.sb-link:hover { background: rgba(255,255,255,0.12); color: #fff; }
.sb-link.active { background: rgba(255,255,255,0.2); color: #fff; font-weight: 600; }
.content-area { margin-left: 210px; min-height: 100vh; display: flex; flex-direction: column; }
.topbar { background: var(--blue); color: #fff; padding: 14px 1.5rem; }
.main { flex: 1; padding: 1.5rem 1rem; max-width: 1100px; margin: 0 auto; }
</style>
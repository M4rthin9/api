<script setup>
import { ref } from 'vue'

const API_URL = 'https://api-ifmc.onrender.com/api'
const activeTab = ref('ref')
const searchRef = ref('')
const searchPrisoner = ref('')

const switchTab = (tab) => {
  activeTab.value = tab
}

const doSearch = async () => {
  // Status search functionality
}
</script>

<template>
  <div class="app">
    <div class="header">
      <router-link to="/" class="back-link"><i class="ti ti-arrow-left"></i> หน้าหลัก</router-link>
      <div class="badge">ตรวจสอบสถานะ</div>
      <h1>ตรวจสอบสถานะการจอง</h1>
      <p>ใช้เลขอ้างอิง (Ref No.) หรือเลขประจำตัวผู้ต้องขัง</p>
    </div>

    <div class="search-section">
      <div class="section-title"><i class="ti ti-search"></i> ค้นหาการจอง</div>

      <div class="search-tabs">
        <button class="tab-btn" :class="{ active: activeTab === 'ref' }" @click="switchTab('ref')">
          <i class="ti ti-hash"></i> Ref No.
        </button>
        <button class="tab-btn" :class="{ active: activeTab === 'prisoner' }" @click="switchTab('prisoner')">
          <i class="ti ti-lock"></i> เลขผู้ต้องขัง
        </button>
      </div>

      <div class="tab-content" :class="{ active: activeTab === 'ref' }">
        <label>เลขอ้างอิง (เช่น VIS-12345)</label>
        <input type="text" v-model="searchRef" placeholder="VIS-XXXXX" style="text-transform:uppercase" />
      </div>
      <div class="tab-content" :class="{ active: activeTab === 'prisoner' }">
        <label>หมายเลขผู้ต้องขัง</label>
        <input type="text" v-model="searchPrisoner" placeholder="เช่น 12345678" />
      </div>

      <div style="margin-top:12px">
        <button class="btn-primary" @click="doSearch">
          <i class="ti ti-search"></i> ตรวจสอบสถานะ
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app { max-width: 680px; margin: 0 auto; padding: 1.25rem 1rem 4rem; }
.header { text-align: center; margin-bottom: 1.5rem; padding: 1.5rem; background: linear-gradient(135deg, #0B2545 0%, #061A33 100%); border-radius: 12px; color: #fff; position: relative; overflow: hidden; }
.back-link { position: absolute; top: 14px; left: 14px; display: flex; align-items: center; gap: 4px; color: rgba(255,255,255,0.8); font-size: 13px; text-decoration: none; }
.badge { display: inline-block; background: rgba(212,175,55,0.22); border: 1px solid rgba(212,175,55,0.5); color: #E8D9A3; font-size: 11px; padding: 3px 12px; border-radius: 20px; margin-bottom: 10px; }

.search-section { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.section-title { font-size: 13px; font-weight: 600; color: var(--text2); margin-bottom: 14px; display: flex; align-items: center; gap: 6px; border-bottom: 1px solid var(--border); padding-bottom: 10px; }
.search-tabs { display: flex; gap: 8px; margin-bottom: 14px; }
.tab-btn { flex: 1; padding: 9px; border-radius: 8px; border: 1.5px solid var(--border); font-size: 13px; font-weight: 600; font-family: inherit; background: var(--bg); color: var(--text2); cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 6px; }
.tab-btn.active { background: var(--blue); color: #fff; border-color: var(--blue); }
.tab-content { display: none; }
.tab-content.active { display: block; }
label { font-size: 13px; color: var(--text2); font-weight: 500; display: block; margin-bottom: 5px; }
input { width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 15px; background: var(--bg); color: var(--text); font-family: inherit; transition: border-color 0.15s; }
input:focus { outline: none; border-color: var(--blue); box-shadow: 0 0 0 3px rgba(0,74,119,0.12); background: #fff; }
.btn-primary { width: 100%; padding: 13px; background: var(--blue); color: #fff; border: none; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 8px; }
</style>
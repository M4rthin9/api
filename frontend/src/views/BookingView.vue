<script setup>
import { ref, onMounted } from 'vue'

const API_URL = 'https://api-ifmc.onrender.com/api'
const QUOTA = 20
const calYear = ref(new Date().getFullYear())
const calMonth = ref(new Date().getMonth())
const selectedDate = ref(null)
const bookings = ref({})

const changingMonth = (delta) => {
  calMonth.value += delta
  if (calMonth.value > 11) { calMonth.value = 0; calYear.value++ }
  if (calMonth.value < 0) { calMonth.value = 11; calYear.value-- }
}

const toLocalDateStr = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const loadBookingCounts = async () => {
  try {
    const resp = await fetch(API_URL + '/getAll')
    const data = await resp.json()
    if (data.status === 'ok' && Array.isArray(data.rows)) {
      const activeStatuses = ['รอตรวจสอบวินัย', 'รอตรวจสอบผู้เข้าร่วม', 'รอชำระเงิน', 'ชำระแล้ว', 'เสร็จสิ้น']
      data.rows.forEach(r => {
        if (r.visitDateISO && activeStatuses.includes(r.status)) {
          bookings.value[r.visitDateISO] = (bookings.value[r.visitDateISO] || 0) + 1
        }
      })
    }
  } catch (err) {
    console.error('Failed to load bookings:', err)
  }
}

onMounted(() => {
  loadBookingCounts()
})
</script>

<template>
  <div class="app">
    <div class="header">
      <router-link to="/" class="back-link"><i class="ti ti-arrow-left"></i> หน้าหลัก</router-link>
      <div class="badge">จองคิวเพื่อเข้าร่วมกิจกรรม</div>
      <h1>โครงการการจัดการเรียนรู้การฝึกวิชาชีพด้านอาหารฯ</h1>
      <p>ทัณฑสถานบำบัดพิเศษกลาง · กรอกข้อมูลให้ครบถ้วนเพื่อจอง</p>
    </div>

    <div class="steps-bar">
      <div class="step-item">
        <div class="step-circle active">1</div>
        <div class="step-label active">ข้อมูลการจอง</div>
      </div>
      <div class="step-line"></div>
      <div class="step-item">
        <div class="step-circle">2</div>
        <div class="step-label">ยืนยันข้อมูล</div>
      </div>
      <div class="step-line"></div>
      <div class="step-item">
        <div class="step-circle">3</div>
        <div class="step-label">รับเลขอ้างอิง</div>
      </div>
    </div>

    <div class="page active">
      <div class="section">
        <div class="section-title"><i class="ti ti-user"></i> ข้อมูลผู้เข้าร่วมกิจกรรม</div>
        <p>Booking form will be implemented here...</p>
        <p>Using API: {{ API_URL }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app { max-width: 680px; margin: 0 auto; padding: 1.25rem 1rem 3rem; }
.header { text-align: center; margin-bottom: 1.5rem; padding: 1.5rem; background: linear-gradient(135deg, #0B2545 0%, #061A33 100%); border-radius: 14px; color: #fff; position: relative; }
.back-link { position: absolute; top: 14px; left: 14px; color: rgba(255,255,255,0.8); font-size: 13px; text-decoration: none; }
.badge { display: inline-block; background: rgba(212,175,55,0.22); color: #E8D9A3; font-size: 11px; padding: 3px 12px; border-radius: 20px; margin-bottom: 10px; }
.steps-bar { display: flex; align-items: center; margin-bottom: 1.5rem; }
.step-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.step-circle { width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; background: var(--bg2); color: var(--text2); }
.step-circle.active { background: var(--blue); color: #fff; border-color: var(--blue); }
.step-label { font-size: 11px; color: var(--text2); text-align: center; }
.step-label.active { color: var(--blue); font-weight: 600; }
.step-line { flex: 0.4; height: 1.5px; background: var(--border); margin-bottom: 16px; }

.section { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.section-title { font-size: 13px; font-weight: 600; color: var(--text2); margin-bottom: 14px; display: flex; align-items: center; gap: 6px; border-bottom: 1px solid var(--border); padding-bottom: 10px; }
</style>
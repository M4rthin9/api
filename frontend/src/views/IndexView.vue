<template>
  <div>
    <section class="hero">
      <div class="logo-holder">
        <div class="logo-item">
          <div class="logo-circle">
            <img class="logo-img logo-1" src="/src/asset/cida-logo.png" alt="กรมราชทัณฑ์" />
          </div>
          <div class="logo-ring"></div>
        </div>
        <div class="logo-item">
          <div class="logo-circle">
            <img class="logo-img logo-2" src="/src/asset/Logo-white.png" alt="CC Cafe" />
          </div>
          <div class="logo-ring"></div>
        </div>
      </div>

      <div class="hero-badge">ระบบออนไลน์ · ทัณฑสถานบำบัดพิเศษกลาง</div>

      <h1>โครงการจัดการเรียนรู้<br />การฝึกวิชาชีพด้านอาหารและงานบริการฯ</h1>
      <p class="hero-sub">จองคิวเพื่อร่วมกิจกรรม · รอเจ้าหน้าที่ตรวจสอบ · ชำระเงินหลังได้รับการอนุมัติ</p>

      <div class="cta-group">
        <router-link to="/booking" class="btn-cta btn-book">
          <div class="btn-icon">📋</div>
          <div class="btn-text">
            จองคิวเพื่อร่วมกิจกรรม
            <small>กรอกข้อมูล รับเลขอ้างอิงทันที</small>
          </div>
          <span class="btn-arrow">›</span>
        </router-link>
        <router-link to="/status" class="btn-cta btn-status">
          <div class="btn-icon">🔍</div>
          <div class="btn-text">
            ตรวจสอบสถานะการจอง
            <small>ใช้ Ref No. หรือเลขผู้ต้องขัง</small>
          </div>
          <span class="btn-arrow">›</span>
        </router-link>
      </div>

      <div class="steps-teaser">
        <div class="step-t">
          <div class="step-t-dot">1</div>
          <div class="step-t-label">กรอกข้อมูล<br />จอง</div>
        </div>
        <div class="step-t-arrow">›</div>
        <div class="step-t">
          <div class="step-t-dot">2</div>
          <div class="step-t-label">รอตรวจสอบ<br />วินัย</div>
        </div>
        <div class="step-t-arrow">›</div>
        <div class="step-t">
          <div class="step-t-dot">3</div>
          <div class="step-t-label">ได้รับการ<br />อนุมัติ</div>
        </div>
        <div class="step-t-arrow">›</div>
        <div class="step-t">
          <div class="step-t-dot">4</div>
          <div class="step-t-label">ชำระค่าร่วมกิจกรรม<br />ยืนยันนัด</div>
        </div>
      </div>
    </section>

    <section class="info-section">
      <div class="section-heading">ข้อมูลสำคัญ</div>

      <div class="info-cards">
        <div class="info-card">
          <div class="info-icon blue">📅</div>
          <div class="info-card-text">
            <h3>วันและเวลา</h3>
            <p>เปิดรับจองเฉพาะ<strong>วันทำการ</strong><br />จันทร์ – ศุกร์ (ยกเว้นวันหยุดราชการ)</p>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon gold">💺</div>
          <div class="info-card-text">
            <h3>จำนวนโต๊ะต่อวัน</h3>
            <p>รับจองได้ <strong>20 โต๊ะ / วัน</strong><br />เมื่อเต็มแล้วระบบจะปิดรับโดยอัตโนมัติ</p>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon green">💰</div>
          <div class="info-card-text">
            <h3>ค่าบริการอาหาร</h3>
            <p><strong>1,000 บาท / คน</strong> (คิดรวมผู้ต้องขัง)<br />เช่น ญาติ 2 + ผู้ต้องขัง 1 = 3,000 บาท</p>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon red">⚠️</div>
          <div class="info-card-text">
            <h3>ข้อปฏิบัติ</h3>
            <p>แสดงบัตรประชาชนตัวจริง<br />ห้ามนำโทรศัพท์เข้าพื้นที่เยี่ยม</p>
          </div>
        </div>
      </div>

      <div class="section-heading">ขั้นตอนการจอง</div>
      <div class="notice">
        <strong>① กรอกข้อมูลจอง</strong> — กรอกข้อมูลผู้เข้าร่วมกิจกรรม ข้อมูลผู้ต้องขัง และเลือกวันที่ต้องการเข้าร่วมกิจกรรม<br />
        <strong>② รับเลขอ้างอิง (Ref No.)</strong> — ระบบออกเลขอ้างอิงให้ทันที กรุณาเก็บไว้<br />
        <strong>③ รอผลตรวจสอบวินัย</strong> — เจ้าหน้าที่จะตรวจสอบประวัติและกดรับจอง (1–2 วันทำการ)<br />
        <strong>④ ตรวจสอบสถานะ</strong> — ใช้ Ref No. หรือเลขประจำตัวผู้ต้องขัง ตรวจสอบสถานะได้ที่หน้า "ตรวจสอบสถานะ"<br />
        <strong>⑤ ชำระเงิน</strong> — เมื่อสถานะ "อนุมัติ" จะมีลิงก์ชำระค่าร่วมกิจกรรมให้ดำเนินการต่อ
      </div>

      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <router-link to="/booking" class="btn-primary">📋 ร่วมกิจกรรม</router-link>
        <router-link to="/status" class="btn-secondary">🔍 ตรวจสอบสถานะ</router-link>
      </div>
    </section>

    <footer class="footer">
      ทัณฑสถานบำบัดพิเศษกลาง · กรมราชทัณฑ์<br />
      สอบถามเพิ่มเติมติดต่อเจ้าหน้าที่ ณ ทัณฑสถาน<br />
      <a href="https://main.correct.go.th" target="_blank" rel="noopener" style="color:var(--blue);text-decoration:underline;">ข้อมูลกรมราชทัณฑ์</a>
    </footer>
  </div>
</template>

<style scoped>
.hero {
  background: linear-gradient(155deg, #0B2545 0%, #0A203D 50%, #061A33 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  position: relative;
  overflow: hidden;
}
.logo-holder {
  display: flex;
  gap: 72px;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.35rem;
}
.logo-circle {
  width: 168px;
  height: 168px;
  background: rgba(255,255,255,0.13);
  border: 4px solid rgba(255,255,255,0.38);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 4px;
}
.logo-2 { padding: 0; width: calc(100% + 10px); height: calc(100% + 10px); margin: -5px; }
.hero-badge {
  display: inline-block;
  background: rgba(212,175,55,0.18);
  border: 1px solid rgba(212,175,55,0.45);
  color: #E8D9A3;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 1rem;
}
.hero h1 {
  color: #fff;
  font-size: clamp(20px, 5vw, 28px);
  font-weight: 700;
  text-align: center;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  max-width: 560px;
}
.hero-sub {
  color: rgba(255,255,255,0.7);
  font-size: 14px;
  text-align: center;
  margin-bottom: 2.5rem;
  max-width: 460px;
  line-height: 1.7;
}
.cta-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  max-width: 380px;
  margin-bottom: 3rem;
}
.btn-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 16px 24px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Sarabun', sans-serif;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: all 0.2s;
}
.btn-book { background: linear-gradient(135deg, #8B0000 0%, #6B0000 100%); color: #fff; }
.btn-status { background: rgba(255,255,255,0.15); color: #fff; border: 1.5px solid rgba(255,255,255,0.4); }
.btn-icon { width: 38px; height: 38px; border-radius: 10px; background: rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; font-size: 20px; }
.btn-text { flex: 1; text-align: left; }
.btn-text small { display: block; font-size: 12px; font-weight: 400; opacity: 0.8; margin-top: 2px; }
.btn-arrow { opacity: 0.7; font-size: 18px; }

.steps-teaser {
  display: flex;
  gap: 0;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 480px;
}
.step-t { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 90px; }
.step-t-dot { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.18); border: 1.5px solid rgba(255,255,255,0.35); display: flex; align-items: center; justify-content: center; font-size: 15px; color: #fff; font-weight: 700; }
.step-t-label { font-size: 11px; color: rgba(255,255,255,0.75); text-align: center; line-height: 1.4; }
.step-t-arrow { align-self: center; color: rgba(255,255,255,0.3); font-size: 18px; padding: 0 2px; margin-top: -20px; }

.info-section { max-width: 680px; margin: 0 auto; padding: 2.5rem 1.25rem 4rem; }
.section-heading { font-size: 13px; font-weight: 600; color: var(--text2); letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px; }
.section-heading::after { content: ''; flex: 1; height: 1px; background: var(--border); }
.info-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 1.5rem; }
@media (max-width: 480px) { .info-cards { grid-template-columns: 1fr; } }
.info-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 1rem 1.1rem; display: flex; gap: 12px; align-items: flex-start; box-shadow: 0 4px 24px rgba(13,15,22,0.08); transition: box-shadow 0.2s, transform 0.2s; }
.info-card:hover { box-shadow: 0 8px 40px rgba(13,15,22,0.12); transform: translateY(-2px); }
.info-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
.info-icon.blue { background: var(--blue-light); }
.info-icon.gold { background: var(--gold-light); }
.info-icon.green { background: var(--green-light); }
.info-icon.red { background: var(--red-light); }
.info-card-text h3 { font-size: 14px; font-weight: 600; margin-bottom: 3px; }
.info-card-text p { font-size: 12.5px; color: var(--text2); line-height: 1.6; }

.notice { background: linear-gradient(135deg, var(--blue-light), #F5F2E9); border: 1px solid rgba(11,37,69,0.18); border-left: 4px solid var(--blue); border-radius: 0 14px 14px 0; padding: 14px 16px; font-size: 13px; line-height: 2; color: #334; margin-bottom: 1.5rem; }
.notice strong { color: var(--blue); }

.btn-primary { flex: 1; min-width: 200px; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 13px 20px; background: var(--blue); color: #fff; border-radius: 14px; font-size: 15px; font-weight: 600; text-decoration: none; transition: all 0.2s; box-shadow: var(--shadow); }
.btn-secondary { flex: 1; min-width: 200px; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 13px 20px; background: var(--bg2); color: var(--text); border: 1.5px solid var(--border); border-radius: 14px; font-size: 15px; font-weight: 600; text-decoration: none; transition: all 0.2s; }

.footer { text-align: center; font-size: 12px; color: var(--text2); padding: 1.5rem; border-top: 1px solid var(--border); line-height: 2; }
</style>
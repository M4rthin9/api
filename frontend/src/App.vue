<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler-icons-webfont@latest/tabler-icons.min.css');

:root {
  --navy: #0B2545;
  --crimson: #8B0000;
  --antique-gold: #D4AF37;
  --primary: #8B0000;
  --primary-dark: #5C0000;
  --bg: #FDFBF7;
  --bg2: #F7F3EB;
  --border: #E8E0D1;
  --text: #1C2433;
  --text2: #3F4755;
  --text-muted: #6B7280;
  --blue: #0B2545;
  --blue-dark: #061A33;
  --blue-light: #E8ECF4;
  --green: #2E5238;
  --green-light: #EAF0E8;
  --gold: #D4AF37;
  --gold-light: #F5EFD8;
  --red: #8B0000;
  --red-light: #F8E6E6;
  --radius: 14px;
  --shadow: 0 4px 24px rgba(13,15,22,0.08);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { min-height: 100vh; }
body {
  font-family: 'Sarabun', sans-serif;
  color: var(--text);
  background: var(--bg);
  overflow-x: hidden;
}
</style>
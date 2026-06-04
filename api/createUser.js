const { getSheetsClient } = require('./_lib/google-auth');

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const USERS_SHEET = 'Users';

async function createUser(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const body = req.body;

    const newUsername = body.username?.trim();
    const newPassword = body.password?.trim();
    const newRole = body.role?.trim();

    if (!newUsername || !newPassword || !newRole) {
      return res.status(400).json({ status: 'error', message: 'กรุณากรอกข้อมูลให้ครบ (username, password, role)' });
    }

    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${USERS_SHEET}!A:E`
    });

    const data = response.data.values || [];
    const headers = data[0] || ['username', 'password', 'role', 'displayName', 'createdAt'];

    const usernameIdx = headers.indexOf('username');
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][usernameIdx]).toLowerCase() === newUsername.toLowerCase()) {
        return res.status(400).json({ status: 'error', message: 'ชื่อผู้ใช้นี้มีอยู่แล้ว' });
      }
    }

    const now = new Date().toISOString();
    const newRow = headers.map(h => {
      if (h === 'username') return newUsername;
      if (h === 'password') return newPassword;
      if (h === 'role') return newRole;
      if (h === 'displayName') return newUsername + '_display';
      if (h === 'createdAt') return now;
      return '';
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: USERS_SHEET,
      valueInputOption: 'RAW',
      requestBody: { values: [newRow] }
    });

    res.status(200).json({ status: 'ok', message: 'ผู้ใช้ถูกสร้างสำเร็จ', user: { username: newUsername, role: newRole } });
  } catch (error) {
    console.error('createUser error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = createUser;
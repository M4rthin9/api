const { getSheetsClient } = require('./_lib/google-auth');

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const USERS_SHEET = 'Users';

async function login(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const username = body.username || body.user;
    const pass = body.pass || body.password;

    if (!username || !pass) {
      return res.status(400).json({ status: 'error', message: 'Missing username or password' });
    }

    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${USERS_SHEET}!A:E`
    });

    const data = response.data.values || [];
    if (data.length <= 1) {
      return res.status(401).json({ status: 'error', message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    const headers = data[0];
    const usernameIdx = headers.indexOf('username');
    const passwordIdx = headers.indexOf('password');
    const roleIdx = headers.indexOf('role');
    const displayNameIdx = headers.indexOf('displayName');

    let user = null;
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][usernameIdx]).toLowerCase() === String(username).toLowerCase()) {
        user = {
          username: data[i][usernameIdx],
          password: data[i][passwordIdx],
          role: data[i][roleIdx],
          displayName: data[i][displayNameIdx] || data[i][usernameIdx]
        };
        break;
      }
    }

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    if (String(user.password) !== String(pass)) {
      return res.status(401).json({ status: 'error', message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    res.status(200).json({
      status: 'ok',
      user: {
        username: user.username,
        role: user.role,
        displayName: user.displayName || user.username
      }
    });
  } catch (error) {
    console.error('login error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = login;
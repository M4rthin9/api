const { getSheetsClient } = require('./_lib/google-auth');

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const USERS_SHEET = 'Users';

async function getUsers(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${USERS_SHEET}!A:E`
    });

    const data = response.data.values || [];
    if (data.length <= 1) {
      return res.status(200).json({ status: 'ok', users: [] });
    }

    const headers = data[0];
    const users = data.slice(1).map(r => {
      const obj = {};
      headers.forEach((h, i) => obj[h] = r[i]);
      return obj;
    }).map(u => ({
      username: u.username,
      role: u.role,
      displayName: u.displayName || u.username,
      createdAt: u.createdAt
    }));

    res.status(200).json({ status: 'ok', users });
  } catch (error) {
    console.error('getUsers error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = getUsers;
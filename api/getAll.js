const { getSheetsClient } = require('./_lib/google-auth');

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const MAIN_SHEET = 'การจอง';

async function getAll(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${MAIN_SHEET}!A:Z`
    });

    const data = response.data.values || [];
    if (data.length <= 1) {
      return res.status(200).json({ status: 'ok', rows: [] });
    }

    const headers = data[0];
    const rows = data.slice(1)
      .filter(row => row[headers.indexOf('ref')] && String(row[headers.indexOf('ref')]).trim() !== '')
      .map(row => {
        const obj = {};
        headers.forEach((h, i) => {
          let val = row[i];
          if (val instanceof Date) {
            if (h === 'visitDateISO') {
              const y = val.getFullYear();
              const m = String(val.getMonth() + 1).padStart(2, '0');
              const d = String(val.getDate()).padStart(2, '0');
              val = y + '-' + m + '-' + d;
            } else {
              val = val.toLocaleDateString('th-TH');
            }
          }
          obj[h] = val;
        });
        return obj;
      });

    res.status(200).json({ status: 'ok', rows: rows.reverse() });
  } catch (error) {
    console.error('getAll error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = getAll;
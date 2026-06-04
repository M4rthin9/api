const { getSheetsClient } = require('./_lib/google-auth');

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const PRISONER_SHEET = 'ผู้ต้องขัง';

async function getPrisoners(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${PRISONER_SHEET}!A:Z`
    });

    const data = response.data.values || [];
    if (data.length <= 1) {
      return res.status(200).json({ status: 'ok', prisoners: [] });
    }

    const headers = data[0];
    const nameIdx = headers.indexOf('prisonerName');
    const idIdx = headers.indexOf('prisonerId');
    const wingIdx = headers.indexOf('wing');

    const prisoners = [];
    const seen = new Set();

    for (let i = 1; i < data.length; i++) {
      const name = String(data[i][nameIdx] || '').trim();
      const id = String(data[i][idIdx] || '').trim();
      const wing = String(data[i][wingIdx] || '').trim();

      if (!name || !id) continue;

      const key = id + '|' + name.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);

      prisoners.push({
        prisonerName: name,
        prisonerId: id,
        wing: wing
      });
    }

    prisoners.sort((a, b) => a.prisonerName.localeCompare(b.prisonerName, 'th'));

    res.status(200).json({ status: 'ok', prisoners });
  } catch (error) {
    console.error('getPrisoners error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = getPrisoners;
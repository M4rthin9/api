const { getSheetsClient } = require('./_lib/google-auth');

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const MAIN_SHEET = 'การจอง';

async function updateStatus(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const body = req.body;

    if (!body.ref) {
      return res.status(400).json({ status: 'error', message: 'Missing ref' });
    }

    const sheets = getSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${MAIN_SHEET}!A:Z`
    });

    const data = response.data.values || [];
    if (data.length === 0) {
      return res.status(404).json({ status: 'error', message: 'No data found' });
    }

    const headers = data[0];
    const refIdx = headers.indexOf('ref');

    let statusIdx = headers.indexOf('status');
    let slipIdx = headers.indexOf('slipImage');

    for (let i = 1; i < data.length; i++) {
      if (String(data[i][refIdx]).trim() === String(body.ref).trim()) {
        if (statusIdx > -1 && body.status) {
          await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: `${MAIN_SHEET}!${String.fromCharCode(65 + statusIdx)}${i + 1}`,
            valueInputOption: 'RAW',
            requestBody: { values: [[body.status]] }
          });
        }
        if (slipIdx > -1 && body.slipImage) {
          await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: `${MAIN_SHEET}!${String.fromCharCode(65 + slipIdx)}${i + 1}`,
            valueInputOption: 'RAW',
            requestBody: { values: [[body.slipImage]] }
          });
        }
        return res.status(200).json({ status: 'ok' });
      }
    }

    res.status(404).json({ status: 'error', message: 'Ref not found' });
  } catch (error) {
    console.error('updateStatus error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = updateStatus;
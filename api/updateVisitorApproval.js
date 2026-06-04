const { getSheetsClient } = require('./_lib/google-auth');

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const MAIN_SHEET = 'การจอง';

async function updateVisitorApproval(req, res) {
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
    const headers = data[0] || [];
    const refIdx = headers.indexOf('ref');

    let visitorApprovedIdx = headers.indexOf('visitorApproved');
    let extraVisitorApprovedIdx = headers.indexOf('extraVisitorApproved');
    if (visitorApprovedIdx === -1 || extraVisitorApprovedIdx === -1) {
      return res.status(500).json({ status: 'error', message: 'Missing required columns' });
    }

    let rowIndex = -1;
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][refIdx]).trim() === String(body.ref).trim()) {
        rowIndex = i;
        break;
      }
    }

    if (rowIndex === -1) {
      return res.status(404).json({ status: 'error', message: 'Ref not found' });
    }

    const row = rowIndex + 1;

    if (body.visitorApproved !== undefined) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${MAIN_SHEET}!${String.fromCharCode(65 + visitorApprovedIdx)}${row}`,
        valueInputOption: 'RAW',
        requestBody: { values: [[body.visitorApproved]] }
      });
    }

    if (body.extraVisitorApproved !== undefined) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${MAIN_SHEET}!${String.fromCharCode(65 + extraVisitorApprovedIdx)}${row}`,
        valueInputOption: 'RAW',
        requestBody: { values: [[body.extraVisitorApproved]] }
      });
    }

    const visitorCountIdx = headers.indexOf('visitorCount');
    const totalIdx = headers.indexOf('total');

    if (visitorCountIdx > -1 && body.visitorCount !== undefined) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${MAIN_SHEET}!${String.fromCharCode(65 + visitorCountIdx)}${row}`,
        valueInputOption: 'RAW',
        requestBody: { values: [[body.visitorCount]] }
      });
    }

    if (totalIdx > -1 && body.total !== undefined) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${MAIN_SHEET}!${String.fromCharCode(65 + totalIdx)}${row}`,
        valueInputOption: 'RAW',
        requestBody: { values: [[body.total]] }
      });
    }

    res.status(200).json({ status: 'ok', visitorCount: body.visitorCount, total: body.total });
  } catch (error) {
    console.error('updateVisitorApproval error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = updateVisitorApproval;
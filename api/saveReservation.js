const { getSheetsClient } = require('./_lib/google-auth');

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const MAIN_SHEET = 'การจอง';

const HEADERS = [
  'ref', 'timestamp', 'visitorName', 'visitorId', 'visitorPhone', 'relation',
  'religion', 'allergy', 'extraVisitorReligions', 'extraVisitorAllergies',
  'extraVisitorNames', 'visitorApproved', 'extraVisitorApproved',
  'prisonerName', 'prisonerId', 'wing', 'visitDate', 'visitDateISO',
  'visitorCount', 'totalPersons', 'total', 'adultCount', 'child5to8Count', 'childUnder5Count', 'status', 'slipImage'
];

async function saveReservation(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const body = req.body;

    if (!body.ref) {
      return res.status(400).json({ status: 'error', message: 'Missing ref' });
    }

    const sheets = getSheetsClient();

    const newRow = HEADERS.map(h => body[h] !== undefined ? body[h] : '');

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: MAIN_SHEET,
      valueInputOption: 'RAW',
      requestBody: {
        values: [newRow]
      }
    });

    res.status(200).json({ status: 'ok', ref: body.ref });
  } catch (error) {
    console.error('saveReservation error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = saveReservation;
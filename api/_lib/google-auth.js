const { google } = require('googleapis');

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file'
];

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;
  
  if (!email || !privateKey) {
    throw new Error('Google service account credentials not configured');
  }
  
  privateKey = privateKey.replace(/\\n/g, '\n');
  
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: privateKey,
    },
    scopes: SCOPES
  });
  
  return auth;
}

function getSheetsClient() {
  const auth = getAuth();
  return google.sheets({ version: 'v4', auth });
}

function getDriveClient() {
  const auth = getAuth();
  return google.drive({ version: 'v3', auth });
}

module.exports = { getSheetsClient, getDriveClient };
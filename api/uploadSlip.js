const { getDriveClient } = require('./_lib/google-auth');

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const MAIN_SHEET = 'การจอง';

async function uploadSlip(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const body = req.body;

    if (!body.base64Data) {
      return res.status(400).json({ status: 'error', message: 'Missing base64Data' });
    }
    if (!body.ref) {
      return res.status(400).json({ status: 'error', message: 'Missing ref' });
    }

    const matches = body.base64Data.match(/^data:([a-zA-Z0-9+\/]+\/[a-zA-Z0-9+\/]+);base64,(.+)$/);
    let mimeType, rawBase64;

    if (matches) {
      mimeType = body.mimeType || matches[1];
      rawBase64 = matches[2];
    } else if (body.mimeType) {
      mimeType = body.mimeType;
      rawBase64 = body.base64Data;
    } else {
      return res.status(400).json({ status: 'error', message: 'Invalid base64 format' });
    }

    const ext = mimeType.split('/')[1].replace('jpeg', 'jpg');
    const fileName = body.fileName || ('slip_' + body.ref + '_' + Date.now() + '.' + ext);
    const buffer = Buffer.from(rawBase64, 'base64');

    const drive = getDriveClient();

    let folderId;
    const folderList = await drive.files.list({
      q: "name='VisitorSlips' and mimeType='application/vnd.google-apps.folder' and trashed=false"
    });

    if (folderList.data.files && folderList.data.files.length > 0) {
      folderId = folderList.data.files[0].id;
    } else {
      const folder = await drive.files.create({
        requestBody: {
          name: 'VisitorSlips',
          mimeType: 'application/vnd.google-apps.folder'
        }
      });
      folderId = folder.data.id;
    }

    const file = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId]
      },
      media: {
        mimeType: mimeType,
        body: buffer
      },
      fields: 'id'
    });

    await drive.permissions.create({
      fileId: file.data.id,
      requestBody: {
        type: 'anyone',
        role: 'reader'
      }
    });

    const url = 'https://drive.google.com/thumbnail?id=' + file.data.id + '&sz=w1200';

    res.status(200).json({ status: 'ok', url });
  } catch (error) {
    console.error('uploadSlip error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = uploadSlip;
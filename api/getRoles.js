const { getSheetsClient } = require('./_lib/google-auth');

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

async function getRoles(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `Roles!A:ZZ`
    });

    const data = response.data.values || [];
    if (data.length <= 1) {
      const defaultRoles = [
        { roleName: 'Superadmin', permissions: ['approve', 'reject', 'confirm_payment', 'reject_payment', 'cancel', 'visitor_approval', 'view_slip', 'view_detail', 'export', 'print', 'manage_users', 'view_eventlog'] },
        { roleName: 'Admin', permissions: ['approve', 'reject', 'confirm_payment', 'reject_payment', 'cancel', 'visitor_approval', 'view_slip', 'view_detail', 'export', 'print', 'view_eventlog'] },
        { roleName: 'Finance', permissions: ['confirm_payment', 'reject_payment', 'cancel', 'view_slip', 'view_detail'] },
        { roleName: 'Vinai', permissions: ['approve', 'view_slip', 'view_detail'] },
        { roleName: 'Tadtel', permissions: ['approve_participant', 'visitor_approval', 'view_slip', 'view_detail'] },
        { roleName: 'User', permissions: ['print'] }
      ];
      return res.status(200).json({ status: 'ok', roles: defaultRoles });
    }

    const headers = data[0];
    const rolesList = [];
    for (let i = 1; i < data.length; i++) {
      const roleName = data[i][0];
      const permissions = [];
      for (let j = 1; j < headers.length; j++) {
        if (data[i][j] === true) {
          permissions.push(headers[j]);
        }
      }
      rolesList.push({ roleName, permissions });
    }

    res.status(200).json({ status: 'ok', roles: rolesList });
  } catch (error) {
    console.error('getRoles error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = getRoles;
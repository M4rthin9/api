# Chance & Change Cafe - Backend Setup

## Setup Instructions (Both Vercel & Render.com)

### 1. Google Cloud Service Account Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable APIs:
   - Google Sheets API
   - Google Drive API
4. Create Service Account:
   - Go to IAM & Admin > Service Accounts
   - Create new service account
   - Generate JSON key
5. Share your Google Sheet with the service account email (Editor access)

## Platform-Specific Deployment

### Option A: Render.com Deployment

#### Required Environment Variables:
Add these in Render Dashboard > Environment > Environment Variables:
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` - Service account email from JSON
- `GOOGLE_PRIVATE_KEY` - Private key from JSON (preserve newlines)
- `SPREADSHEET_ID` - Extract from your Google Sheet URL
- `STAFF_PASS` - Staff password (default: `10900`)
- `PORT` - Will be set automatically by Render (use 10000 if needed)

#### Deploy Steps:
1. Push code to GitHub
2. Create new Web Service on [Render.com](https://render.com)
3. Connect your repository
4. Set Build Command: `npm install`
5. Set Start Command: `npm start` (or `node server.js`)
6. Add environment variables
7. Deploy

### Option B: Vercel Deployment

#### Required Environment Variables:
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` - Service account email from JSON
- `GOOGLE_PRIVATE_KEY` - Private key from JSON (preserve newlines)
- `SPREADSHEET_ID` - Extract from your Google Sheet URL
- `STAFF_PASS` - Staff password (default: `10900`)

#### Vercel Dashboard Setup:
1. Import project to Vercel
2. Add environment variables in Settings > Environment Variables
3. Deploy

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/getPrisoners` | GET | Get prisoner master list |
| `/api/getAll` | GET | Get all bookings |
| `/api/saveReservation` | POST | Create new booking |
| `/api/uploadSlip` | POST | Upload payment slip |
| `/api/updateStatus` | POST | Update booking status |
| `/api/cancelBooking` | POST | Cancel a booking |
| `/api/login` | POST | Staff authentication |
| `/api/updateVisitorApproval` | POST | Update visitor approval |
| `/api/getUsers` | GET | Get users list (admin) |
| `/api/createUser` | POST | Create new user (admin) |
| `/api/getRoles` | GET | Get roles list (admin) |

## Migration Notes

- Frontend now uses relative `/api` endpoints
- Original Google Apps Script (`google_apps_script_updated.js`) remains for reference
- All data continues to use Google Sheets as the backend database
- File uploads go to Google Drive in `VisitorSlips` folder
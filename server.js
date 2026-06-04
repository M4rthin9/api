const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// API Routes
app.get('/api/getPrisoners', require('./api/getPrisoners'));
app.get('/api/getAll', require('./api/getAll'));
app.post('/api/saveReservation', require('./api/saveReservation'));
app.post('/api/uploadSlip', require('./api/uploadSlip'));
app.post('/api/updateStatus', require('./api/updateStatus'));
app.post('/api/cancelBooking', require('./api/cancelBooking'));
app.post('/api/login', require('./api/login'));
app.post('/api/updateVisitorApproval', require('./api/updateVisitorApproval'));
app.get('/api/getUsers', require('./api/getUsers'));
app.post('/api/createUser', require('./api/createUser'));
app.get('/api/getRoles', require('./api/getRoles'));

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/*.html', (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const app = express.Router();

const AuthCtrl = require('../controllers/AuthCtrl');

app.post('/login', AuthCtrl.login);	
app.get('/logout', AuthCtrl.logout);

module.exports = app;
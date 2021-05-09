//const router = require('./routes/index');
const express = require('express');
const http = require('http');
const cors = require('cors');

require('dotenv').config();
var app = express();

const { auth, requiresAuth } = require('express-openid-connect');

app.use(auth({
  authRequired: false,
  auth0Logout: true,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  clientID: process.env.CLIENT_ID,
  baseURL: process.env.BASE_URL,
  secret: process.env.SECRET,
})
);

//req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
	//res.send("Hello User!")
	res.header("Access-Control-Allow-Origin", "*");
	res.send(JSON.stringify(req.oidc.user))
});

app.get('/home', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.send('<h1>Welcome to the website! Please login to see your information.</h1>')
});

app.use('/demo',express.static('frontend'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("server is running");
});
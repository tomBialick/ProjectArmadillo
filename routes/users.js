var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST a new auth token */
router.post('/auth', function(req, res, next) {
  req.session.user = req.body.username;
  req.session.save();
  res.status(201).json({body: {results: {status: "Authorized", username: req.body.username}}});
})

/* GET current authentication credential */
router.get('/auth', function(req, res, next) {
  if (!req.query.token) {
    res.status(400).send("Invalid Token")
  }
  else if (!req.sessionID || !req.session.user) {
    res.status(401).send("Unauthorized Access")
  }
  else {
    res.status(200).json({body: {results: {status: "Authorized", username: req.session.user}}});
  }
})

/* Logout */
router.delete('/auth', function(req, res, next) {
  if (!req.session.user || !req.cookies.user_sid) {
    res.status(401).send("Unauthorized Access")
  }
  else {
    delete req.session.user
    delete req.cookies.user_sid
    res.clearCookie('user_sid')
    res.status(201).send("Successfully Logged Out")
  }
})

module.exports = router;

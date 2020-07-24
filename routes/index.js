var express = require('express');
var router = express.Router();

let roomList = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/..', '/client/build', 'index.html'));
});

/* POST new room */
router.post('/room', (req, res, next) => {
  let index = roomList.indexOf(req.body.name)
  if (index >= 0) {
    res.status(422).send("A Room by a user with your name already exists")
  }
  else {
    roomList.push(req.body.name)
    res.status(201).send("Rooom Created Successfully")
  }
})

/* GET the list of rooms */
router.get('/rooms', (req, res, next) => {
  res.status(200).json({ body: JSON.stringify(roomList)})
})

/* DELETE a room from the list */
router.delete('/room', (req, res, next) => {
  let index = roomList.indexOf(req.session.user)
  if (index >= 0) {
    roomList.splice(index, 1);
    res.status(200).send("Room Deleted Successfully")
  }
  else {
    res.status(400).send("Bad Request")
  }
})

module.exports = router;

var express = require('express');
var path = require('path');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/housesofcards.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
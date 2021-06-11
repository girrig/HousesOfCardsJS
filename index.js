var express = require('express');
var path = require('path');

const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function(req, res) {
  res.status(404).send('You found the catch all 404!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
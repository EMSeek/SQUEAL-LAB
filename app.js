// app.js
const express = require('express');
const db = require('./db');
const app = express();
const port = 3000;

app.use('/files', express.static('files'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.send("<html><head><title>Blog CMS v0.101</title></head><body><a href='/route1/1'>First post</a></body></html>");
});

// Route 1: GET /route1/:id
app.get('/route1/:id', (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM posts WHERE id = " +id, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Route 2: POST /route2
app.post('/route2', async function(req, res) {
  const id = req.body.id;
  // Simulate computational stuff here...
  await sleep(110);
  db.get("SELECT * FROM posts WHERE id = " + id, (err, row) => {
    if (err) {
      res.status(500).json({ error: "there was an error" });
      return;
    }
    res.status(200).json({ found: "post exists" });
    return;
  });
});

// Route 3: POST /route3
app.post('/route3', (req, res) => {
  const id = req.body.id.replace(/ /, '');
  db.get("SELECT * FROM posts WHERE id = "+id, (err, row) => {
    if (err) {
      console.log("Error: "+err.message)
    }
      var fs = require('fs');
      var dataToWrite = JSON.stringify(row)
      
      fs.writeFile('files/export.json', dataToWrite, 'utf8', function (err) {
        if (err) {
          console.log('Some error occured - file either not saved or corrupted file saved.');
        } else{
          console.log('It\'s saved!');
        }
    });
  });
  res.status(200).json({ constant: "constant response" });
  return;
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
// app.js
const express = require('express');
const db = require('./db');
const app = express();
const port = 3000;

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
app.post('/route2', (req, res) => {
  const id = req.body.id;
  console.log("SELECT * FROM posts WHERE id = " + id + "["+req.body+"]");
  db.get("SELECT * FROM posts WHERE id = " + id, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Route 3: POST /route3
app.post('/route3', (req, res) => {
  const id = req.body.id;
  db.get("SELECT * FROM posts WHERE id = "+id, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

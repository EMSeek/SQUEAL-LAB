// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
  db.run("CREATE TABLE posts (id INTEGER PRIMARY KEY, user_id INTEGER, content TEXT)");

  const sha1 = require('crypto').createHash('sha1');
  const password = sha1.update('password123').digest('hex');

  var stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
  stmt.run("user1", password);
  stmt.run("user2", password);
  stmt.finalize();

  stmt =  db.prepare("INSERT INTO posts (user_id, content) values (?, ?)");
  stmt.run(1,"Hello World!");
  stmt.run(1,"Welcome to my blog, this is a test");
  stmt.run(1,"Blogging is really hard, who knew");
  stmt.run(1,"I'm quitting blogging to become a tiktok superstar instead!");
  stmt.run(2,"Hello World!");
  stmt.run(2,"Lorem ipsum somthing something");
  stmt.finalize();
  
});

module.exports = db;

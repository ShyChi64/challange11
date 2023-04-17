const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./apiRoutes/index');
const htmlRoutes = require('./htmlRoutes/index');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

// Parse URL encoded & JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Host public folder
app.use(express.static('public'));
app.get('/api/notes', (req, res) =>{
  fs.readFile("./db/db.json", "utf8", (error, data)=>{
      console.log(data);
      const notes = JSON.parse(data);
      console.log(notes);
      res.json(notes);
  } );
 });

// Use apiRoutes
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.post('/api/notes', (req, res) => {
  console.log(req.body);
  req.body.id = uniqid();
  console.log(req.body);
  fs.readFile("./db/db.json", "utf8", (error, data) =>{
      console.log(data);
      const notes = JSON.parse(data);
      console.log(notes);
      notes.push(req.body);
  fs.writeFile("./db/db.json",JSON.stringify(notes), error =>{
      if(error) throw error;
      return res.json(notes);
  });    
  })
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});


const express = require('express');
const mongoose = require('mongoose');

const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');

const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.get('/', async (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  const photos = await Photo.find({});
  res.render('index', {
    photos: photos
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});

//Insert data to database
app.post('/photos', (req, res) => {
  const addPhoto = async (newTitle, newDesc) => {
    await Photo.create({ title: newTitle, description: newDesc });
  };
  addPhoto(req.body.title, req.body.description);
  res.redirect('/');
});

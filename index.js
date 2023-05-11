const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('Middleware worked..');
  next();
});

// app.get('/', (req, res)=>{

//     const photo = {
//         id: 1,
//         name: "Photo name",
//         description: "This is first photo..."
//     }

//     res.send(photo);
// })

//ROUTES
app.get('/', (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render('index');
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

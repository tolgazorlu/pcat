const express = require('express');
const path = require('path');

const app = express();

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

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});

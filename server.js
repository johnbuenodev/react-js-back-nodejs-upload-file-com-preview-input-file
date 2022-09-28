const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

//app
const app = express();

/*
app.use(cors({
  origin: 'https://endereco'  
  ou
  origin: ['https://endereco1', 'https://endereco2/']
})); */

//Acesso todos clientes 
app.use(cors({
  origin: '*'
}));

app.use('/uploads', express.static('uploads'));

//Informando ao app que vai usar o fileUpload
app.use(fileUpload());

//Upload endpoint
app.post('/uploads', (req,res) => {
 
 if(req.files === null) {
    return res.status(400).json({msg: 'No file found'});
 }

 const file = req.files.file;

 //file.mv(`${__dirname}/public/uploads/${file.name}`, err => {
 file.mv(`uploads/${file.name}`, err => {
  if(err) {
    console.log(err);
    console.error(err);
    return res.status(500).send(err);
  }

  res.status(200).json({fileName: file.name, filePath: `http://localhost:5000/uploads/${file.name}`});

 });
  

});



app.listen(5000, () => console.log('Server Started port 5000 ...'));
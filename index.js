const fs = require('fs');
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/upload', upload.single('image'), (req, res) => {

  const file = req.file;
//   console.log("file", file)
  const bitmap = fs.readFileSync(file.path);
//   console.log("bitmap", bitmap)
  const base64Image = Buffer.from(bitmap).toString('base64');
//   console.log("base64Image", base64Image)

  fs.writeFile('image.png', base64Image, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  res.send('Image uploaded and saved as base64!');
});

app.post('/sendBase64', (req, res) => {
    const base64Val = req.body.base64;
    console.log(base64Val);
    let base64Content = getBase64Content(base64Val);
    // base64Content += base64Content.replace('+', ' '); 
    const buffer = Buffer.from(base64Content, 'base64').toString('binary');

    // fs.writeFile('test.png', base64Content, {encoding: 'base64'});

    fs.writeFileSync('test.png', buffer, {encoding: 'base64'}, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    res.send(`base64Val value: ${base64Val}`);
  });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

function getBase64Content(base64Val){
    return base64Val.replace(/^data:image\/\w+;base64,/, '');
}
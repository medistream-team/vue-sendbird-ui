const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})
var upload = multer({ storage: storage });

// App
const app = express();
app.use(cors());

app.get('/uploads/:fileName', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'uploads', req.params.fileName));
}); 

app.post('/upload', upload.array('files', 12), (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error('Please choose files');
    error.httpStatusCode = 400;
    return next(error);
  }
  res.json(files.map(file => {
    file.url = 'http://localhost:3000/' + file.path;
    return file;
  }));
});

app.listen(3000, () => 
  console.log('\x1b[33m File upload server started on port 3000 \x1b[0m')
);

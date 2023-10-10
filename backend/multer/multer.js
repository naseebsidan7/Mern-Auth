const multer = require('multer');

const storage = multer.memoryStorage(); // Store the file in memory

const upload = multer({ storage });

// Use it to handle your file upload route
app.post('/your-upload-route', upload.single('myFile'), (req, res) => {
  // req.file will contain the uploaded file
  // Do whatever you want with it, e.g., save it to MongoDB
  const fileData = req.file;
  // ...
});
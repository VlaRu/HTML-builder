const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
readStream.on('data', (data) => {
  console.log(data);
});
readStream.on('error', (error) => {
  throw error;
});

//node index 01-read-file

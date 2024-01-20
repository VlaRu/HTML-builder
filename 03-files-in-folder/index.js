const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'secret-folder');
fs.readdir(filePath, (err, files) => {
  if (err) {
    console.error('Error directory', err);
    return;
  }
  files.forEach((file) => {
    const fileFullPath = path.join(filePath, file);
    fs.stat(fileFullPath, (statErr, stats) => {
      if (statErr) {
        console.log('Error getting file stats', statErr);
        return;
      }
      if(stats.isFile()){
        const fileName = path.parse(file).name;
        const fileExtension = path.parse(file).ext.substring(1);
        const fileSizeInBytes = stats.size;
        const fileSizeInKb = fileSizeInBytes / 1024;
        console.log(`${fileName} - ${fileExtension} - ${fileSizeInKb}`);
      }
    })
  })
});

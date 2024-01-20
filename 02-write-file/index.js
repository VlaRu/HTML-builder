const fs = require('fs');
const path = require('path');
const { stdout, stdin, exit } = process;

const filePath = path.join(__dirname, 'text.txt');
const promptText =
  '"Please enter text (press Ctrl+C or type \'exit\' to quit)\n"';
const appendToFile = (text) => {
  fs.appendFile(filePath, `${text}\n`, (err) => {
    if (err) throw err;
    console.log('File was modified');
  });
};

fs.writeFile(filePath, '', (err) => {
  if (err) throw err;
  console.log('File was created');
  stdin.resume();
  stdout.write(promptText);

  stdin.on('data', (data) => {
    const txt = data.toString().trim();

    if (txt.toLowerCase() === 'exit') {
      console.log('Bye! Exiting...');
      exit();
    }

    appendToFile(txt);
    stdout.write(promptText);
  });

  // Handle Ctrl+C to exit
  process.on('SIGINT', () => {
    console.log('\nBye...');
    exit();
  });
});
//node 02-write-file
//fix eslint err command:   dos2unix index.js

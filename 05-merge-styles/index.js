const fs = require('fs').promises;
const path = require('path');
const inputFolder = path.join(__dirname, 'styles');
const outputFolder = path.join(__dirname, 'project-dist')
async function compileStyles() {
  try {
    const outputFile = 'bundle.css';
    const styleContents = [];
    const filenames = await fs.readdir(inputFolder);
    await Promise.all(
      filenames.map(async (item) => {
        const filePath = path.join(inputFolder, item);
        const stats = await fs.stat(filePath);
        if (stats.isFile() && path.extname(item) === '.css') {
          const content = await fs.readFile(filePath, 'utf-8');
          styleContents.push(content);
        }
      }),
    );
    const bundleContent = styleContents.join('\n');
    await fs.writeFile(path.join(outputFolder, outputFile), bundleContent);
    console.log(
      `Compilation successful. The bundle.css file is located in ${outputFolder}.`,
    );
  } catch (error) {
    console.error('Error:', error.message);
  }
}
compileStyles();

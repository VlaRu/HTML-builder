const fs = require('fs').promises;
const path = require('path');

async function copyDir(sourceDir, targetDir) {
  try {
    const targetPath = path.join(targetDir, 'files-copy');
    await fs.mkdir(targetPath, { recursive: true });
    const files = await fs.readdir(sourceDir);
    const existingFiles = await fs.readdir(targetPath);
    const filesToRemove = existingFiles.filter((file) => !files.includes(file));
    for (const fileToRemove of filesToRemove) {
      const filePathToRemove = path.join(targetPath, fileToRemove);
      await fs.unlink(filePathToRemove);
      console.log(`Removed file: ${filePathToRemove}`);
    }
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetFilePath = path.join(targetPath, file);
      const stats = await fs.stat(sourcePath);
      if (stats.isDirectory()) {
        await copyDir(sourcePath, targetFilePath);
      } else {
        await fs.copyFile(sourcePath, targetFilePath);
      }
    }
    console.log('Directory copied successfully!');
  } catch (err) {
    console.error('Error copying directory:', err);
  }
}
const sourceDirectory = '04-copy-directory/files';
const targetDirectory = '04-copy-directory';
copyDir(sourceDirectory, targetDirectory);

const fs = require('fs').promises;
const path = require('path');

const filesDir = path.join(__dirname, 'files');
const filesCopyDir = path.join(__dirname, 'files-copy');

async function main() {
    try {
        await fs.mkdir(filesCopyDir, {recursive: true })
        const filesCopy = await fs.readdir(filesCopyDir)
        for (const file of filesCopy) {
          await fs.rm(path.join(__dirname, 'files-copy', file), {force: true })
        }
        const filesForCopy = await fs.readdir(filesDir)
        for (const file of filesForCopy) {
          await fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file))
        }
      } catch (err) {
        console.error(err)
      }
}
main();


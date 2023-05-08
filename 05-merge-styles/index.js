const fs = require('fs').promises;
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');
const distFile = path.join(distDir, 'bundle.css');

async function main() {
  try {
    const files = await fs.readdir(stylesDir);
    let css = '';
      for (const file of files) {
        const filePath = path.join(stylesDir, file);
        const stats = await fs.stat(filePath);
        if (stats.isFile() && path.extname(filePath) === '.css') {
          const fileContents = await fs.readFile(filePath, 'utf8');
          css += fileContents;
        }
    }
    await fs.mkdir(distDir, {recursive: true});
    await fs.writeFile(distFile, css);
    console.log(distFile);
  } catch (err) {
    console.error(err);
  }
}
main();
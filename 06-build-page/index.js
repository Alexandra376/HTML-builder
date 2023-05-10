const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);
const mkdir = util.promisify(fs.mkdir);
const copyFile = util.promisify(fs.copyFile);
const copyDir = util.promisify(fs.copyFile);

const COMPONENTS_DIR = path.join(__dirname, 'components');
const STYLES_DIR = path.join(__dirname, 'styles');
const ASSETS_DIR = path.join(__dirname, 'assets');
const DIST_DIR = path.join(__dirname, 'assets', 'project-dist');

const readComponent = async (name) => {
  const file = path.join(COMPONENTS_DIR, `${name}.html`);
  const content = await readFile(file, 'utf8');
  return { name, content };
};

const readStyle = async (name) => {
  const file = path.join(STYLES_DIR, `${name}.css`);
  const content = await readFile(file, 'utf8');
  return content;
};

const readTemplate = async () => {
  const file = path.join(__dirname, 'template.html');
  const content = await readFile(file, 'utf8');
  return content;
};

const buildPage = async () => {
  try {
    await mkdir(DIST_DIR, { recursive: true });

    const template = await readTemplate();

    const components = await readdir(COMPONENTS_DIR);
    const componentPromises = components.map(async (name) => {
      return readComponent(name.split('.')[0]);
    });
    const componentArr = await Promise.all(componentPromises);
    const componentObj = componentArr.reduce((acc, cur) => {
      acc[cur.name] = cur.content;
      return acc;
    }, {});

    const page = template.replace(/{{(\w+)}}/g, (match, name) => {
      return componentObj[name] || match;
    });

    await writeFile(path.join(DIST_DIR, 'index.html'), page);

    const styles = await readdir(STYLES_DIR);
    const stylePromises = styles.map(async (name) => {
      return readStyle(name.split('.')[0]);
    });
    const styleArr = await Promise.all(stylePromises);
    const style = styleArr.join('\n');

    await writeFile(path.join(DIST_DIR, 'style.css'), style);

    await copyDir(ASSETS_DIR, path.join(DIST_DIR, 'assets'));

    console.log('Build complete!');
  } catch (error) {
    console.error(error);
  }
};

buildPage();

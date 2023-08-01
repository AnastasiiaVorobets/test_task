const fs = require('fs');
const path = require('path');

async function createFile(folder) {

  const data = {
    pathToFolder: folder,
    countOfFolders: 0,
    countOfFiles: 0,
  };

  try {
    const files = await fs.promises.readdir(folder);

    for (const file of files) {
      const pathToFile = path.join(folder, file);
      const fileInformation = await fs.promises.stat(pathToFile);

      if (fileInformation.isDirectory()) {
        await createFile(pathToFile);
        data.countOfFolders++;
      }

      else {
        data.countOfFiles++;
      }
    }

    await createInfoJson(folder, data);
    console.log(`File created successfully in ${folder}`);
  }

  catch (error) {
    console.error('Error:', error);
  }
}

function createInfoJson(folder, data) {
  const pathToInfoFile = path.join(folder, 'info.json');
  fs.promises.writeFile(pathToInfoFile, JSON.stringify(data));
}

createFile('./');

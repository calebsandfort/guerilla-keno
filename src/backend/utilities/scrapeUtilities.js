import fs from "fs";

const writeFile = (fileName, content) => {
  fs.writeFile(fileName, content, err => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log(`${fileName} saved.`);
  });
};

export default {
  writeFile
};

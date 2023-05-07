const fs = require("fs");
const path = require("path");
const directory = "./03-files-in-folder/secret-folder";

fs.readdir(directory, { withFileTypes: true }, function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
    if (file.isFile()) {
        const ext = path.extname(file.name);
        fs.stat(path.join(directory, file.name), function(err, stats) {
          if (err) throw err;
          console.log('Name: ' + file.name);
          console.log('Size: ' + stats.size + ' kb');
          console.log('---------------');
        });
      }
    });
  });

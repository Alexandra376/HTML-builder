const fs = require("fs");
const path = require("path");
const { stdin, stdout } = process;

fs.writeFile(path.join(__dirname, "text.txt"), '', (err) => {
    if (err) throw err;
});
stdout.write('Enter your text:')
stdin.on("data", data => {
  fs.appendFile(path.join(__dirname, "text.txt"), 
  data.toString(), err => {
      if (err) throw err
      if (data.toString().trim() === 'exit') {
        console.log('Bye Bye')
        process.exit()
      }
    } 
  )
})
process.on('SIGINT', () => {
  console.log('\nBye Bye')
  process.exit()
});



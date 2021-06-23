const fs = require('fs');

// Writable Stream  - write() and end() are two important functions
const file = fs.createWriteStream(`${__dirname}/file.txt`);

for (i = 0; i < 1e6; i++) {
    file.write("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n");
}

file.end(); // This size of the file will be around 450MB
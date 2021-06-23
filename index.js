const fs = require('fs');
const server = require('http').createServer();

// Creating a readable stream for the file.txt file - Assuming that file size is very large
// To make the filesize large run the script node insertData.js
const file = fs.createReadStream(`${__dirname}/file.txt`)

server.on('request', (req, res) => {

    /* SOLUTION - 1 : Don't do this
    -------------------------------
    This will make sure that your file is completely read then it will send
    the file data as the response. During this time it needs to store
    the data in the memory which increases the node.js process memory &
    may lead to crash. Hence do not follow this approach if your
    file size is very big.
    
    fs.readFile(`${__dirname}/file.txt`, (err, data) => {
        res.end(data);
    })
    
    */

    /* SOLUTION - 2 : Don't do this
    -------------------------------
    This creates a backpressure. You write stream is not going as handle
    the chunks of data as fast as the readable stream generating it.
    In this case the readable stream need to pause and wait for the write
    stream to emit the drain event then again resume the read stream. If we dont pause
    the readable stream then we may run out of memory & node process 
    gets crashed.

    While calling write() on a stream that is not draining is allowed, 
    Node.js will buffer all written chunks until maximum memory usage 
    occurs, at which point it will abort unconditionally

    This solution is not the optimum one. Check for the solution in backpressure.js

    file.on('data', chunk => {
        console.log(chunk.toString()) // Here chunk is a buffer. To convert that to string use .toString()
        res.write(chunk);
    })

    file.on('end', () => {
        res.end();
    })
    
    file.on('error, () => {
        res.destroy();
    })
    */

    // Solution - 3 : Do this
    // .pipe() internally handles the backpressure and accordingly pasuses the source if the data buffer has exceeeded the highestWaterMark or writable stream returns false 
    file.pipe(res);
})

server.listen(3000);

const fs = require('fs');

// Here we are reading the contents from file.txt and writing into file2.txt
const readableStream = fs.createReadStream(`${__dirname}/file.txt`);
const writableStream = fs.createWriteStream(`${__dirname}/file.txt`);

readableStream.on('data', chunks => {
    // This will return either true or false. 
    // If true we can continue sending chunks from readable stream to writable stream.
    // If false & we are sending the chunks to the writable stream may lead to backpressure. 
    // Where the writable stream has got more chunks and couldn't write upcoming chunks.
    // In this case we need to pause the readable stream and wait for the drain event emitted by the writable stream
    const result = writableStream.write(chunk);
    if (!result) {
        readableStream.pause(); // Pausing the read stream
    }
})

readableStream.on('end', () => {
    writableStream.end();
})

writableStream.on('drain', () => {
    console.log('drained'); // drain event => writable stream is ready to take the chunks again from readable strema
    readableStream.resume(); // Resuming the readable stream which will send the chunks to the writable stream
})

/*********************************************************************/

// Other approach for handling backpressure - .pipe()
// Here pipe internally handles when the writable stream sdata buffer 
// has exceeded the highWaterMark then it automatically pauses the readable stream
// Once the data buffer is emptied, it will wait for the drain event 

readableStream.pipe(writableStream);
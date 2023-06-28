const fs = require('fs');
const zlib = require('zlib');

const r = fs.createReadStream('book.txt');
const z = zlib.createGzip();
const w = fs.createWriteStream('book.txt.gz');
r.pipe(z).pipe(w);
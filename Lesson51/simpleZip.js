const fs = require('fs');
const zlib = require('zlib');

function main() {
    fs.readFile('book.txt', (err, data) => {
        zlib.gzip(data, (err, zip) => {
            fs.writeFile(
                'book2.txt.gz',
                zip,
                () => console.log('Done')
            );
        })
    });
}

main();

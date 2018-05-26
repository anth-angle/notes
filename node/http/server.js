let http = require('http');
let fs = require('fs');
let url = require('url');

http.createServer((request, response) => {
    let pathname = url.parse(request.url).pathname;
    console.log('pathname:' + pathname);

    fs.readFile(pathname,substr(1), (err, data) => {
        if (err) {
            console.error(err);
            response.writeHead(404, {
                'Content-Type': 'text/html'
            });
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            
            response.write(data.toString());
        }
        response.send();
    });
}).listen(8888);

console.log('Server running at http://127.0.0.1:8080/');
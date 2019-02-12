const net = require('net');
const indexDoc = require("./htmlfiles/index.js")
const hydroDoc = require("./htmlfiles/hydrogen.js")
const heliumDoc = require("./htmlfiles/helium.js")
const errorDoc = require("./htmlfiles/404.js")
const cssDataDoc = require("./css.styles.js")

const clientConnections = [];

const server = net.createServer((socket) => {
    console.log('client connected');
    socket.on('data', data => {
        console.log(data)
        let parsedData = data.toString()
        console.log('parsedData to string', parsedData)
        parsedData = parsedData.split('\n')
        console.log('parsedData', parsedData)
        let requestLine = parsedData[0].split(' ')
        console.log('requestLine', requestLine)
        let method = requestLine[0]
        console.log('method', method)
        let requestURL = requestLine[1]
        console.log('requestURL', requestURL)

        console.log(Date() + ` ${method} ` + `${requestURL}`);

        if (method === 'GET') {
            switch (requestURL) {
                case '/': socket.write(
                    `HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Unbuntu)\nContent-Type: text/html; charset=utf-8\n\n${indexDoc}`);
                    socket.end;
                    break;
                case '/index.html': socket.write(
                    `HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Unbuntu)\nContent-Type: text/html; charset=utf-8\n\n${indexDoc}`);
                    socket.end;
                    break;
                case '/hydrogen.html': socket.write(
                    `HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Unbuntu)\nContent-Type: text/html; charset=utf-8\n\n${hydroDoc}`);
                    socket.end;
                    break;
                case '/helium.html': socket.write(
                    `HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Unbuntu)\nContent-Type: text/html; charset=utf-8\n\n${heliumDoc}`);
                    socket.end;
                    break;
                case '/css.styles.css': socket.write(
                    `HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Unbuntu)\nContent-Type: text/css; charset=utf-8\n\n${cssDataDoc}`);
                    socket.end;
                    break;
                default: socket.write(
                    `HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Unbuntu)\nContent-Type: text/html; charset=utf-8\n\n${errorDoc}`);
                    socket.end;
                    break;
            }
        }


    });

});


server.on('error', (err) => {
    throw err;
});
server.listen(8080, () => {
    console.log('server bound')
});
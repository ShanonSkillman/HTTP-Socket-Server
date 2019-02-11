const net = require('net');
const tempPage = require("./tempPage.js")
// const errorDoc = require("./404.js")
// const heliumDoc = require("./helium.js")
// const hydroDoc = require("./hydrogren.js")
// const indexhtmlDoc = require("./styles.css.js")

const clientConnections = [];

const server = net.createServer((socket) => {
    console.log('client connected');
    socket.on('data', data => {
        console.log(data)
        let parsedData = data.toString()
        console.log(parsedData)
        parsedData = parsedData.split('\n')
        console.log(parsedData)
        let requestLine = parsedData[0].split(' ')
        console.log(requestLine)
        let method = requestLine[0]
        console.log(method)
        let uriLine = requestLine[2]
        console.log(uriLine)

        console.log(Date())



        socket.write(tempPage.clientMsg);
        socket.end();
    });
});


server.on('error', (err) => {
    throw err;
});
server.listen(8080, () => {
    console.log('server bound')
});


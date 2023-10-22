import WebSocket, { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', function connection (ws) {
    ws.on('error', console.error)

    ws.on('message', function message (data, isBinary) {
        console.log('Received: ' + data)
        wss.clients.forEach(function (client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary })
            }
        })
    })
})
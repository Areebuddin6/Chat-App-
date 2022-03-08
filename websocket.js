import express from 'express';
import { createServer } from 'http';
import path from 'path';
import {Server} from "socket.io";

const app = express();
const server = createServer(app);
const __dirname = path.resolve();
const io = new Server(server);
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "client1.html"));
});

io.on("connection", socket => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
    });
})

server.listen(port, () => {
    console.log(`listening on ${port}`);
});
const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server);
const { join } = require("node:path");

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log(`A socket connected: ${socket.id} `);
  socket.on("chat message", (msg) => {
    console.log(`Message: ${msg} by ${socket.id}`);
    io.emit("chat message", msg);
  });
});

server.listen(8000, () => {
  console.log("server running at http://localhost:8000");
});

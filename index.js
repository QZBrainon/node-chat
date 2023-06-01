const express = require("express");
const app = express();
const http = require("http").createServer(app);

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
// app.get("/", (req, res) => res.send({ message: "ok" }));

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000", // url aceita pelo cors
    methods: ["GET", "POST"], // Métodos aceitos pela url
  },
});

io.on("connection", (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);

  socket.emit("hello", "Hello there! Welcome to socketIO practicing!");

  socket.on("ping", () => {
    console.log(`User ${socket.id} has pinged`);
    io.emit("pong", `${socket.id} pingou e tomou um ping de volta!`);
  });

  socket.on("sendMessage", (message) => {
    io.emit("serverMessage", message);
  });
});

http.listen(3000, () => console.log("Server ouvindo na porta 3000"));

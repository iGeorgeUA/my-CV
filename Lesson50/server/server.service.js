const { ServiceBroker } = require("moleculer");
const IO = require("socket.io");
const express = require("express");
const app = express();
const http = require("http").Server(app);

const broker = new ServiceBroker();

broker.createService({
  name: "server",
  created() {
    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });

    const io = IO(http);
    io.on("connection", (socket) => {
      socket.on("stream", (image) => {
        socket.broadcast.emit("stream", image);
      });
    });

    http.listen(3000, () => {
      console.log("listening on *:3000");
    });
  },
});

broker.start();
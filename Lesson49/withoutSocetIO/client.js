const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", () => {
  socket.send(JSON.stringify({
    type: "hello from client",
    content: [ 3, "4" ]
  }));
});

socket.addEventListener("message", ({ data }) => {
  const packet = JSON.parse(data);

  switch (packet.type) {
    case "hello from server":
      break;
  }
});
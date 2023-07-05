import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

socket.on("hello from server", (...args) => {
});
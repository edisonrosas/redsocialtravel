import io from "socket.io-client";

export const socketService = {
  connect,
};
//window.location.hostname
function connect() {
  return new Promise((resolve, reject) => {
  /*  const io = require("socket.io")(httpServer, {
      cors: {
        origin: "https://192.168.1.8:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["query"],
        credentials: true
      }
    });*/

    const socket = io('http://localhost:5000/socialtravelapp-e6988/us-central1/app', {
      query: { token: JSON.parse(localStorage.getItem("user")).token },
    });
    socket.on("connect", () => {
      resolve(socket);
    });
  });
}

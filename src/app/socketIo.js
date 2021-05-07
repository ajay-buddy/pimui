import openSocket from "socket.io-client";

const ENDPOINT = "http://localhost:3000/notifications";

const socket = openSocket(ENDPOINT);
function subscribeToTimer(cb) {
  console.log("====>", socket);
  socket.on("event", (timestamp) => cb(null, timestamp));
  socket.emit("subscribeToTimer", 1000);
  console.log("====>", socket);
}
export { subscribeToTimer };

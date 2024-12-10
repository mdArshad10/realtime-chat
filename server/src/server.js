import app from "./app.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { dbConnection } from "./config/db.js";
import { PORT, CORS_ORIGIN } from "./config/constant.js";

const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
  },
});

let userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);

  const userId = socket.handshake.query.userId;
  console.log(userId);

  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`A user disconnected ${socket.id}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

const serverSetUpAndStart = () => {
  server.listen(PORT, async () => {
    await dbConnection();
    console.log(`the server is running at port => ${PORT}`);
  });
};

serverSetUpAndStart();

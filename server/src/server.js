import app from "./app.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { dbConnection } from "./config/db.js";

const server = createServer(app);
const io = new Server(server);

const PORT = 3000;

server.listen(PORT, async () => {
  await dbConnection();
  console.log(`the server is running at port => ${PORT}`);
});

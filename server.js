const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  const userId = socket.id;
  console.log("Connexion d'un utilisateur ID : " + userId);

  socket.on("disconnect", () => {
    console.log("Déconnexion d'un utilisateur ID : " + userId);
  });

  socket.on("chat message", (msg) => {
    const data = {
      userId,
      message: msg.message,
      pseudo: msg.pseudo,
    };
    if (data.message.trim() !== "") {
      console.log("Message de " + data.pseudo + " : " + data.message);
      io.emit("chat message", data);
    }
  });

  socket.on("pseudo joined", (data) => {
    console.log(userId + " a pour pseudo : " + data.pseudo);
    // Émettre le pseudo et l'ID utilisateur à tous les clients
    io.emit("pseudo joined", { pseudo: data.pseudo, userId: data.userId });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} at ` + getCurrentTime());
});

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return hours + ":" + minutes + ":" + seconds;
}
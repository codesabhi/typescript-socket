import { Server, Socket } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

interface Users {
  userName: string;
  socketId: string;
}

let onlineUsers: Users[] = [];

const addNewUser = (userName, socketId) => {
  !onlineUsers.some((user) => user.userName === userName) &&
    onlineUsers.push({ userName, socketId });
    // console.log(onlineUsers)
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userName) => {
  return onlineUsers.find((user) => user.userName === userName);
};

// taking event from client
io.on("connection", (socket: Socket) => {
  socket.on("newUser",(userName)=>{
    addNewUser(userName, socket.id)
  })

  interface Args {
    senderName: string;
    receiverName: string;
    type:number
  }


// taking event from client
socket.on("sendNotification",({senderName, receiverName, type}:Args)=>{
  const receiver = getUser(receiverName)
  io.to(receiver.socketId).emit("getNotification",{
    senderName,
    type,
  })
})

  socket.on("disconnect", () => {
    removeUser(socket.id)
  });
});

io.listen(5000);




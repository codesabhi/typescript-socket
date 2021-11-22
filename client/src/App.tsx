import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/Card";
import Navbar from "./components/navbar/Navbar";
import { posts } from "./data";
import { io, Socket } from "socket.io-client";

function App() {
  const [userName, setUserName] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
    alert("This is a demo app. It is recommended to login with 'john' or 'monica' in a separate window for better eperience.")
  }, []);
  // console.log(socket);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <input
            type="text"
            placeholder="username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
          />
          <button onClick={() => setUser(userName)}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;


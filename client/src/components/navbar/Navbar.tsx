import "./navbar.css";
import Notification from "../../img/notification.svg";
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";
import { useEffect, useState } from "react";

interface Props {
  socket: any;
}

const Navbar = ({ socket }: Props) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    socket.on("getNotification", (data: any) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  //   console.log(notifications);

  const displayNotifications = ({ senderName, type }: any) => {
    let action: string;
    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your posts`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <span className="logo">Notify App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Notification} className="iconImg" alt="" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Message} className="iconImg" alt="" />
          <div className="counter">0</div>
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Settings} className="iconImg" alt="" />
          <div className="counter">0</div>
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotifications(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

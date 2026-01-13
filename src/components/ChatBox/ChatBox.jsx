import React from "react";
import "./ChatBox.css";
import assets from "../../../public/assets/assets";
const ChatBox = () => {
  return (
    <div className="chat-box">
      {/* Top Bar */}

      <div className="chat-user">
        <img src={assets.profile_img} alt="" />
        <p>
          Richard Sanford <img className="dot" src={assets.green_dot} alt="" />
        </p>
        <img src={assets.help_icon} alt="" />
      </div>
      {/* Middle Chat Box */}

      <div className="chat-msg">
        {/* Sender message  */}
        <div className="s-msg">
            <p className="msg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, quis!</p>
            <div>
                <img src={assets.profile_img} alt="" />
                <p>2:30 PM</p>
            </div>
        </div>
        <div className="s-msg">
           <img className="msg-img" src={assets.pic1} alt="" />
            <div>
                <img src={assets.profile_img} alt="" />
                <p>2:30 PM</p>
            </div>
        </div>
        {/* Receiver message  */}
        <div className="r-msg">
            <p className="msg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, quis!</p>
            <div>
                <img src={assets.profile_img} alt="" />
                <p>2:30 PM</p>
            </div>
        </div>
      </div>

      {/* Message text area  */}
      <div className="chat-input">
        <input type="text" placeholder="Send a message" />
        <input type="file" id="image" accept="image/png, img/jpeg" hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" />
      </div>
    </div>
  );
};

export default ChatBox;

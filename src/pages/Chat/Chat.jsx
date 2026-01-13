import React from 'react';
import './Chat.css'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import ChatBox from '../../components/ChatBox/ChatBox';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
// import '/Chat.css'
const Chat = () => {
    return (
        <div className='chat'>
            <div className="chatContainer">
                <LeftSideBar></LeftSideBar>
                <ChatBox></ChatBox>
                <RightSideBar></RightSideBar>
            </div>
            
        </div>
    );
};

export default Chat;
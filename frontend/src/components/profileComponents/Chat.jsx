import { useEffect, useState } from 'react';
import {io} from 'socket.io-client';
import UsersList from './UsersList';

// const socket = io('http://localhost:3000');
export const socket = io('http://localhost:3000', {
    autoConnect: false,
    withCredentials: true
  });
// const socket = io('http://localhost:3001', { autoConnect: false });
// npm install socket.io-redis // multiply servers
// const { createAdapter } = require('@socket.io/redis-adapter');
// const { createClient } = require('redis');

// const pubClient = createClient({ host: 'localhost', port: 6379 });
// const subClient = pubClient.duplicate();

// io.adapter(createAdapter(pubClient, subClient));

// 🔹 Improve Chat: Add usernames, timestamps, and UI improvements.
// 🔹 Authentication: Only allow logged-in users to send messages.
// 🔹 Rooms: Create private/group chats using socket.join(room).
// 🔹 Notifications: Emit real-time alerts when a user joins or leaves.

// import { io } from 'socket.io-client';
// export const socket = io('http://localhost:3000', {
//   withCredentials: true
// });

function Chat() {
    const [chatContent, setChatContent] = useState({content: '', sender_id: '', receiver_id: ''})
    const [messages, setMessages] = useState([]);

    console.log(chatContent)

    useEffect(() => {
        socket.connect(); 
    
        socket.on('receiveMessage', newMessage => {
            setMessages(prev => [...prev, newMessage]);
        });
    
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        socket.on('receiveMessage', newMessage => {
            setMessages(message => [...message, newMessage]);
        })
        
        return _ => {
            socket.disconnect();
        }
    }, [])

    const sendMessage = _ => {
        if (chatContent.trim() !== '') {

            socket.emit('sendMessage', chatContent);
            setChatContent('');
        }
    }
    

    console.log(chatContent)

    return (
        <div className='chat-profile'>
            <UsersList setChatContent={setChatContent}/>
            <div className='chat'>
                <div className='display-texts'>
                    <div className='user-chats'>
                        {messages.map(message => <div className='user-chats__box'>{message}</div>)}
                    </div>
                    <div className='friend-chats'>
                        <div className='friend-chats__box'>bbbbbbbb</div>
                    </div>
                </div>

                {
                    chatContent.receiver_id !== ''? 

                    <div className='text-area'>
                        <textarea className="update-comment" onChange={e => {setChatContent(a => ({...a, content: e.target.value}))}} id="chat" value={chatContent.content}></textarea>
                        <button onClick={sendMessage} className='grenn-btn'>siusti</button>
                    </div>
                    :
                    <></>
                }
                
            </div>
        </div>
    )
}

export default Chat
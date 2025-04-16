import { useEffect, useRef, useState } from 'react';
import {io} from 'socket.io-client';
import UsersList from './UsersList';
import { useMessages } from '../../reducers/useMessages';
import { v4 } from 'uuid';

// const socket = io('http://localhost:3000');
export const socket = io('http://localhost:3000', {
    autoConnect: false,
    withCredentials: true
  });
// const socket = io('http://localhost:3001', { autoConnect: false });
// npm install socket.io-redis // multiply servers
// const { createAdapter } = require('@socket.io/redis-adapter');
// const { createClient } = require('redis');

function Chat() {
    const [chatContent, setChatContent] = useState({message: '', sender_id: '', receiver_id: '', id: v4()})
    const {chatHistory, fetchMessages, saveNewMessages, user_id} = useMessages()
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [chatHistory]);

    useEffect(() => {

        if(chatContent.receiver_id !== ''){
            fetchMessages(chatContent.receiver_id)
        }
    }, [chatContent])


    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }
    
        return () => {
            socket.disconnect();
        }
    }, []);

    useEffect(() => {

        const saveNewMessage = newMessage => {
            const checkDub = chatHistory.some(msg => String(msg.id) === String(newMessage.id));
            if(!checkDub && user_id !== newMessage.sender_id) {
                saveNewMessages(newMessage)  
                setChatContent(a => ({...a, id: v4()}))
            }
        }

        socket.on('receiveMessage', saveNewMessage)
        
        return () => {
            socket.off('receiveMessage', saveNewMessage);
        };
    }, [])


    const sendMessage = _ => {
        if (chatContent.message.trim() !== '') {

            socket.emit('sendMessage', chatContent);
            setChatContent(a => ({...a, message: ''}));
        }
        saveNewMessages(chatContent)
        setChatContent(a => ({...a, id: v4()}))
    }
    

    console.log(chatHistory)
    return (
        <div className='chat-profile'>
            <UsersList setChatContent={setChatContent} chatContent={chatContent}/>
            <div className='chat'>
                <div className='display-texts'>
                        {
                            chatHistory?.map(message => message.from_user === user_id || message.sender_id === user_id ? 
                                <div key={`${message.id}sender`} className='user-chats'>
                                    <div ref={bottomRef} className='user-chats__box'>{message.message}</div>
                                </div>
                                :
                                <div key={`${message.id}receiver`} className='friend-chats' >
                                    <div className='friend-chats__box'>{message.message}</div>
                                </div>
                            )
                        }
                        
                </div>
            
                {
                    chatContent.receiver_id !== ''? 

                    <div className='text-area'>
                        <textarea className="update-comment" onChange={e => {setChatContent(a => ({...a, message: e.target.value}))}} id="chat" value={chatContent.message}></textarea>
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
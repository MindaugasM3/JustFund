import { useState } from 'react'

function Chat() {
    const [chatContent, setChatContent] = useState('')

    console.log(chatContent)

    return (
        <div className='chat'>
            <div className='display-texts'>
                <div className='user-chats'>
                    <div className='user-chats__box'>aaaaaaaaa</div>
                </div>
                <div className='friend-chats'>
                    <div className='friend-chats__box'>bbbbbbbb</div>
                </div>
            </div>
            <div className='text-area'>
                <textarea className="update-comment" onChange={e => {setChatContent(e.target.value)}} id="chat" value={chatContent}></textarea>
                <button className='grenn-btn'>siusti</button>
            </div>
        </div>
    )
}

export default Chat
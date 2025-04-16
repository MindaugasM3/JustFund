import React, { useEffect } from 'react'
import { useMessages } from '../../reducers/useMessages'

function UsersList({setChatContent, chatContent}) {

    const {usersList, fetchUsers, user_id, chatHistory} = useMessages()
    
    useEffect(_ => {
        fetchUsers()
    }, [])
    
   

    const handleChats = receiver_id => {
        setChatContent(a => ({...a, sender_id: user_id, receiver_id: receiver_id}))
        // console.log(chatHistory)
        // const senderMessages = chatHistory?.filter(chat => chat.from_user === user_id)
        // const receiverMessages = chatHistory?.filter(chat => chat.to_user === receiver_id)
        // setFilteredMessages({sentMessages: senderMessages, receivedMessages: receiverMessages})
        // console.log(senderMessages, receiverMessages)
    }

   

    return (
        <div className='users-list'>
            {
                usersList?.map(user => user.id !== user_id? (
                    <div onClick={e => handleChats(user.id)} key={user.id}>
                       <div >{user.name}</div> 
                    </div> 
                )
                :
                null
            )
            }
        </div>
    )
}

export default UsersList
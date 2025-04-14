import React, { useEffect } from 'react'
import { useMessages } from '../../reducers/useMessages'

function UsersList({setChatContent}) {

    const {usersList, fetchUsers, user_id} = useMessages()
    
    useEffect(() => {
        fetchUsers()
    }, [])
    
    console.log(usersList)

    return (
        <div className='users-list'>
            {
                usersList?.map(user => user.id !== user_id? (
                    <div onClick={e => setChatContent(a => ({...a, sender_id: user_id, receiver_id: user.id}))} key={user.id}>
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
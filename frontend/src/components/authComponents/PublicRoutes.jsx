import React from 'react';
import useUsers from '../../reducers/useUsers';
import { Navigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

function PublicRoutes({children}) {
    
    const {loggedin, loading} = useUsers();

    if(loading) {
        return (
            <div className='spinner-box'>
                <RingLoader size={300}/>
            </div>
        )
    }

    return (loggedin? <Navigate to='/profile'/> : children);
} 

export default PublicRoutes
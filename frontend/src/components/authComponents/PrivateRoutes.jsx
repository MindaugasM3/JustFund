import React from 'react';
import useUsers from '../../reducers/useUsers';
import { Navigate, Outlet } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

function PrivateRoutes({ children }) {
    const { loggedin, loading } = useUsers();

    
    if (loading || loggedin === null || typeof loggedin === 'undefined') {
        return (
            <div className='spinner-box'>
                <RingLoader size={300} />
            </div>
        );
    }

    
    if (!loggedin) {
        return <Navigate to='/loginForm' />;
    }

    
    return children || <Outlet />;
}

export default PrivateRoutes;
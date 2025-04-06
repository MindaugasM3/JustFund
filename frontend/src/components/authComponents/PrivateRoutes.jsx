import React from 'react';
import useUsers from '../../reducers/useUsers';
import { Navigate, Outlet } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

function PrivateRoutes({ children }) {
    const { loggedin, loading } = useUsers();

    // Show loader while checking auth
    if (loading || loggedin === null || typeof loggedin === 'undefined') {
        return (
            <div className='spinner-box'>
                <RingLoader size={300} />
            </div>
        );
    }

    // If not logged in, redirect to login
    if (!loggedin) {
        return <Navigate to='/loginForm' />;
    }

    // If logged in, render children or nested route
    return children || <Outlet />;
}

export default PrivateRoutes;
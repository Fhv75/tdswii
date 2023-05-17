import { Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AnonymousProtectedRoute = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [navigate, token]);

    if (token) {
        return <></>;
    }

    // returns child route elements
    return <Outlet />;
};
export default AnonymousProtectedRoute;
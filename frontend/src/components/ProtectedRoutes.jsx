import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ( { children, role } ) =>
{
    const token = localStorage.getItem( "jwt" )

    const { user } = useSelector( state => state.user )
    console.log( role, user.role );

    if ( !token )
    {
        return <Navigate to="/login" />;
    }

    if ( role && user.role !== role )
    {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
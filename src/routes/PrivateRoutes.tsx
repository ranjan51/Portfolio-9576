import React from 'react'
import { decodeToken } from 'react-jwt'
import { Navigate } from 'react-router-dom'
// import { tokenDecoder } from '../appRedux/actions/Common'

const PrivateRoutes = ({ children,roles }: { children: JSX.Element,roles: any; }) => {
    const authenticationToken = sessionStorage.getItem("accessToken")
    if (!authenticationToken) {
        return <Navigate to="/401" />

    } else if (authenticationToken) {
        const data:any = decodeToken(authenticationToken)
        if (!data?.CustomerGuid || data?.expTokenTime) {
            return <Navigate to="/" />
        }
    }
    const userData:any = decodeToken(authenticationToken);
    const userHasRequiredRole = roles.includes(userData?.RoleName);
    if(!userHasRequiredRole){
        return <Navigate to="/403" />
    }
    return children
}

export default PrivateRoutes

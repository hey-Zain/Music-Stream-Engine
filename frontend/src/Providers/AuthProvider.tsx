import { useAuth } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'

const AuthProvider = () => {
    const { getToken, userId } = useAuth();
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const initAuth = async ()=>{
            
        }
    },[]);


    return (
        <div>AuthProvider</div>
    )
}

export default AuthProvider
import React from 'react'
import {GoogleOAuthProvider,GoogleLogin} from "@react-oauth/google"
export default function Sign() {
    const clientId="407063868783-mppipsuahg2n571ufdd3rnsi04ra91f9.apps.googleusercontent.com"
  return (
    <GoogleOAuthProvider clientId={clientId}>
        <div className='w-screen h-screen bg-slate-800 flex flex-col justify-center items-center'>
            <GoogleLogin width="300"  />
        </div>
    </GoogleOAuthProvider>
  )
}

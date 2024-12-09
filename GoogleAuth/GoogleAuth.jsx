import React, { useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../Firebase';

export default function GoogleAuth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = getAuth(app);

    function Register(e) {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }


    return (
        <div>
            <form>
                <h1>Login with google</h1>
                <button style={{ "padding": "5px 50px", "fontSize": "1rem" }} onClick={Register}>Login</button>
            </form>
        </div>
    )
}

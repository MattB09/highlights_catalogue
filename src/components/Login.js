import React, { useCallback, useContext }from 'react'
import {withRouter, Redirect } from "react-router";
import { AuthContext } from '../Auth';
import firebase from "../firebase";

function Login({ history }) {
    const handleLogin = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await firebase
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    const { currentUser } = useContext(AuthContext);
    
    if (currentUser) {
        return <Redirect to="/" />
    }

    return (
        <div className="landing-form-container">
        <h2>Log In</h2>
        <form onSubmit={handleLogin} className="landing-form">
            <label for="login-email" className="landing-label email-label">Email:</label>
            <input id="login-email" name="email" type="email" placeholder="Email" />
            
            <label for="login-password" className="landing-label password-label">Password:</label>
            <input id="login-password" name="password" type="password" placeholder="Password" />

            <button type="submit" className="action-button btn">Log in</button>
        </form>
    </div>
    )
}

export default withRouter(Login);

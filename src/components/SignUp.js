import React, {useCallback } from 'react'
import { withRouter } from "react-router";
import firebase from "../firebase";

function SignUp({ history }) {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (
        <div className="landing-form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp} className='landing-form'>
                <label for="signup-email" className="landing-label email-label">Email</label>
                <input id="signup-email" name="email" type="email" placeholder="Email" />

                <label for="signup-password" className="landing-label password-label">Password</label>
                <input id="signup-password" name="password" type="password" placeholder="Password" />
                
                <button type="submit" className="action-button btn">Sign Up</button>
            </form>
        </div>
    );
};

export default withRouter(SignUp);

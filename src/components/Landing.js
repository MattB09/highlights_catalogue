import React from 'react';
import Login from './Login';
import SignUp from './SignUp'
import logo from  '../img/ML - Logo.png';

export default function Landing() {
    return (
    <>
        <div className="headerContainer">
            <img className="header logo" src={logo} alt="MyLights logo" />
    	</div>
        <div className="form-container">
            <Login />
            <SignUp />
        </div>
    </>)
}

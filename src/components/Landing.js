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
            <h1 className="welcome">Welcome to MyLights!</h1>
            <p className="about-text">Manage and catalogue your highlighted passages from your favorite books!
            Categorize each highlight with zero or many tags and filter highlights based on author, book, or tag.
            <br/>
            <br/>
            Log in or Sign up to get started!
            </p>

            <Login />
            <SignUp />
        </div>
    </>)
}

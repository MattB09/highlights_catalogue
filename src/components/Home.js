import React from 'react'
import firebase from '../firebase';

export default function Home() {
    return (
        <div className="home">
            <h1>Home</h1>
            <button onClick={()=> firebase.auth().signOut()}>Sign out</button>
        </div>
    )
}

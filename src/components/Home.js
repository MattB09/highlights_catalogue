import React from 'react'
import firebaseApp from '../firebase';

export default function Home() {
    return (
        <div className="home">
            <h1>Home</h1>
            <button onClick={()=> firebaseApp.auth().signOut()}>Sign out</button>
        </div>
    )
}

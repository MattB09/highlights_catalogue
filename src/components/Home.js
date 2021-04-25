import React, { useContext, useEffect } from 'react';
import { Context } from '../App';
import { AuthContext } from '../Auth';
import logo from '../img/ML - Logo.png';
import firebase from '../firebase';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import Highlights from './Highlights';
import Tags from './Tags';
import Authors from './Authors';
import Books from './Books';

export default function Home() {
	const { state, dispatch } = useContext(Context);
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		loadData();
	}, []);

	async function loadData() {
		const data = await axios.get(`/api/${currentUser.uid}/all`);
		dispatch({type: 'setContext', payload: data.data})
	}

	// clearfilters
	function clearFilters() {
		dispatch({type: 'clearFilters'});
	}

  return (
    <>
      <div className="headerContainer">
        <img className="header logo" src={logo} alt="MyLights logo" />
      	<p>logged in as {currentUser.email.split('@')[0]}</p>
        <Button variant="primary" className="header" onClick={()=> firebase.auth().signOut()}>Log out</Button>
    	</div>
			{
        state.data !== undefined && Object.keys(state.data.highlights).length
				? 
					(<>
						<div className="clear-div">
							<button id="clear-button" onClick={clearFilters}>Clear Filters</button>
						</div>
						<div id="filters-container">
							<Authors />
							<Books/>
							<Tags />
						</div>
						<Highlights /> 
					</>)
				: 
					<>Loading</>
      }
  	</>
  )
}

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

	useEffect(() => {
		console.log(state);
	}, [state])

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
        <Button variant="primary" className="header" onClick={()=> firebase.auth().signOut()}>Sign out</Button>
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



// import React, {useContext, useState, useEffect } from 'react'
// import { AuthContext } from '../Auth';
// import firebase from '../firebase';
// import Highlights from './Highlights';
// import Tags from './Tags';
// import Authors from './Authors';
// import Books from './Books';
// import axios from 'axios';
// import { Button } from 'react-bootstrap';
// import logo from '../img/ML - Logo.png';

// export default function Home() {
//     // ---------- useStates --------------------------
//     const [highlights, setHighlights] = useState({});
//     const [filteredHighlights, setFilteredHighlights] = useState(highlights);
//     const [filters, setFilters] = useState({author: "", book: "", tag: "", highlight: ""});
//     const [authors, setAuthors] = useState([]);
//     const [filteredAuth, setFilteredAuth] = useState(authors);
//     const [books, setBooks] = useState([]);
//     const [filteredBooks, setFilteredBooks] = useState(books);
//     const [tags, setTags] = useState([]);
//     const [filteredTags, setFilteredTags] = useState(tags);
//     const { currentUser } = useContext(AuthContext);

//     /// ---- useEffects -------------------
//     // api calls
//     useEffect(()=> {
//         loadData();
//         console.log("load data use effect")
//     }, [])

//     // filtering
//     useEffect(() => {
//         if (authors.length) filterAuthors();
//         if (books.length) filterBooks();
//         if (tags.length) filterTags();
//         if (highlights.length) filterHighlights();
//     }, [filters, authors, books, tags, highlights]);

//     // changes to highlights or filter to reset filtered highlights
//     useEffect(() => {
//         console.log("highlights useEffect")
//     }, [filters, highlights]);

//     // ------------------ Helper functions ----------------
//     async function loadData() {
//         // set highlights
//         const data = await axios.get(`/api/${currentUser.uid}/all`);
//         setHighlights(data.data);
//         setFilteredHighlights(data.data);
//         // set authors
//         const authData = await axios.get(`api/${currentUser.uid}/authors`);
//         setAuthors(authData.data);
//         // set books
//         const bookData = await axios.get(`api/${currentUser.uid}/books`);
//         setBooks(bookData.data);
//         //set tags
//         const tagData = await axios.get(`api/${currentUser.uid}/tags`);
//         setTags(tagData.data);
//     }

//     return (
//     <>
//         <div className="headerContainer">
//             <img className="header logo" src={logo} alt="MyLights logo" />
//             <p>logged in as {currentUser.email.split('@')[0]}</p>
//             <Button variant="primary" className="header" onClick={()=> firebase.auth().signOut()}>Sign out</Button>
//         </div>
//             {
//             Object.keys(highlights).length && highlights ? (<>
//                 <div className="clear-div">
//                     <button id="clear-button" onClick={clearFilters}>Clear Filters</button>
//                 </div>
//                 <div id="filters-container">
//                     <Authors authors={filteredAuth} setFilters={setFilters} 
//                         loadData={loadData} clearFilters={clearFilters} />
//                     <Books books={filteredBooks} authors={authors} highlights={highlights}  
//                        setFilters={setFilters} loadData={loadData} 
//                        clearFilters={clearFilters} />
//                     <Tags tags={filteredTags}
//                         setFilters={setFilters} loadData={loadData} clearFilters={clearFilters} />
//                 </div>
//                 <Highlights highlights={filteredHighlights} setFilters={setFilters} loadData={loadData}
//                     clearFilters={clearFilters} books={books} tags={tags} /> 
//             </>) : <>Loading</>
//             }

//     </>
//     )
// }

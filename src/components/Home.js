import React, {useContext, useState, useEffect } from 'react'
import { AuthContext } from '../Auth';
import firebase from '../firebase';
import Highlights from './Highlights';
import Tags from './Tags';
import Authors from './Authors';
import Books from './Books';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default function Home() {
    const [userData, setUserData] = useState({});
    const { currentUser } = useContext(AuthContext);
    const [filteredData, setFilteredData] = useState(userData);

    useEffect(() => {
        loadData();
    }, [])

    async function loadData() {
        const data = await axios.get(`/api/${currentUser.uid}/all`);
        setUserData(data.data);
        setFilteredData(data.data);
    }

    function clearFilters() {
        setFilteredData(userData);
    }

    function filterByTag(e) {
        const filtered = {};
        filtered.Tags = [userData.Tags.find(t => {return t.id === e.currentTarget.value})];
        const hIds = userData.highlights_tags.filter((row)=> row.tag_id === e.currentTarget.value)
            .map((row) => row.highlight_id);
        filtered.Highlights = userData.Highlights.filter((h) => hIds.includes(h.id));
        const bIds = filtered.Highlights.map((h)=> h.book_id);
        filtered.Books = userData.Books.filter((b) => bIds.includes(b.id));
        const authIds = filtered.Books.map((b) => b.author_id);
        filtered.Authors = userData.Authors.filter((a) => authIds.includes(a.id));
        setFilteredData(filtered);
    }

    function filterByAuthor(e) {
        const filtered = {};
        filtered.Authors = [userData.Authors.find(a => a.id === e.currentTarget.value)];
        filtered.Books = userData.Books.filter(b => b.author_id === filtered.Authors[0].id);
        const bIds = filtered.Books.map(b => b.id);
        filtered.Highlights = userData.Highlights.filter(h => bIds.includes(h.book_id));
        const hIds = filtered.Highlights.map(h => h.id);
        const tIds = userData.highlights_tags.filter(row => hIds.includes(row.highlight_id))
            .map(r => r.tag_id);
        filtered.Tags = userData.Tags.filter(t => tIds.includes(t.id));
        setFilteredData(filtered);
    }

    function filterByBook(e) {
        const filtered = {};
        filtered.Books = [userData.Books.find(b => b.id === e.currentTarget.value)]
        filtered.Authors = [userData.Authors.find(a => a.id === filtered.Books[0].author_id)];
        filtered.Highlights = userData.Highlights.filter(h => h.book_id === filtered.Books[0].id);
        const hIds = filtered.Highlights.map(h => h.id);
        const tIds = userData.highlights_tags.filter(row => hIds.includes(row.highlight_id))
            .map(r => r.tag_id);
        filtered.Tags = userData.Tags.filter(t => tIds.includes(t.id));
        setFilteredData(filtered);
    }

    async function deleteHighlight(hId, userData) {
        let tIds = userData.highlights_tags.filter(row => hId === row.highlight_id)
        if (tIds.length) {
            tIds = tIds.map(row => row.tag_id)
            let tIdsString = tIds.join('-');
            const deletedT = await axios.delete(`/api/${currentUser.uid}/highlights/${hId}/tags/${tIdsString}`);
            console.log("deletedT", deletedT);
        }
        const deletedH = await axios.delete(`/api/${currentUser.uid}/highlights/${hId}`);
        console.log("deletedH", deletedH);
    }

    return (
    <>
        <div className="headerContainer">
            <h1 className="header">Welcome {currentUser.email.split('@')[0]}</h1>
            <Button variant="primary" className="header" onClick={()=> firebase.auth().signOut()}>Sign out</Button>
        </div>
            {
            Object.keys(userData).length && userData ? (<>
                <div className="clear-div">
                    <button id="clear-button" onClick={clearFilters}>Clear Filters</button>
                </div>
                <div id="filters-container">
                    <Authors authors={filteredData.Authors} books={userData.Books} filterFunc={filterByAuthor} setData={setUserData} userData={userData} loadData={loadData}/>
                    <Books books={filteredData.Books} authors={filteredData.Authors} filterFunc={filterByBook} 
                        setData={setUserData} userData={userData} loadData={loadData} deleteHighlight={deleteHighlight}/>
                    <Tags tags={filteredData.Tags} tagsH={userData.highlights_tags} filterFunc={filterByTag} loadData={loadData}  setData={setUserData} userData={userData} />
                </div>
                <Highlights highlights={filteredData.Highlights} htags={filteredData.highlights_tags} 
                    tags={filteredData.Tags} setData={setUserData} userData={userData} loadData={loadData} 
                    deleteHighlight={deleteHighlight}/>
            </>) : <>Loading</>
            }

    </>
    )
}

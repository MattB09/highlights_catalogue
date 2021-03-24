import React, {useContext, useState, useEffect } from 'react'
import { AuthContext } from '../Auth';
import firebase from '../firebase';
import Api from '../services/api';
import Highlights from './Highlights';
import Tags from './Tags';
import Authors from './Authors';
import Books from './Books';
import axios from 'axios';

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
        console.log(e.currentTarget.value);
        const filtered = {};
        filtered.Authors = [userData.Authors.find(a => a.id === e.currentTarget.value)];
        filtered.Books = userData.Books.filter(b => b.author_id === filtered.Authors[0].id);
        console.log('filtered books', filtered.Books);
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
        console.log("booksfilter", e.currentTarget)
        filtered.Books = [userData.Books.find(b => b.id === e.currentTarget.value)]
        console.log("booksfilter 2--", filtered.Books);
        filtered.Authors = [userData.Authors.find(a => a.id === filtered.Books[0].author_id)];
        filtered.Highlights = userData.Highlights.filter(h => h.book_id === filtered.Books[0].id);
        const hIds = filtered.Highlights.map(h => h.id);
        const tIds = userData.highlights_tags.filter(row => hIds.includes(row.highlight_id))
            .map(r => r.tag_id);
        filtered.Tags = userData.Tags.filter(t => tIds.includes(t.id));
        setFilteredData(filtered);
    }

    return (
        <div className="home">
            <h1>Welcome {currentUser.email.split('@')[0]}</h1>
            <button onClick={()=> firebase.auth().signOut()}>Sign out</button>
            <button onClick={clearFilters}>Clear Filters</button>
            <Authors authors={filteredData.Authors} filterFunc={filterByAuthor} />
            <Books books={filteredData.Books} authors={filteredData.Authors} filterFunc={filterByBook} />
            <Tags tags={filteredData.Tags} tagsH={userData.highlights_tags} filterFunc={filterByTag} loadData={loadData}  setData={setUserData} userData={userData} />
            <Highlights highlights={filteredData.Highlights} htags={filteredData.highlights_tags} tags={filteredData.Tags} />
        </div>
    )
}

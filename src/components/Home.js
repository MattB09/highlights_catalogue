import React, {useContext, useState, useEffect } from 'react'
import { AuthContext } from '../Auth';
import firebase from '../firebase';
import Highlights from './Highlights';
import Tags from './Tags';
import Authors from './Authors';
import Books from './Books';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import logo from '../img/ML - Logo.png';

export default function Home() {
    // ---------- useStates --------------------------
    const [highlights, setHighlights] = useState({});
    const [filteredHighlights, setFilteredHighlights] = useState(highlights);
    const [filters, setFilters] = useState({author: "", book: "", tag: ""});
    const [authors, setAuthors] = useState([]);
    const [filteredAuth, setFilteredAuth] = useState(authors);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState(books);
    const [tags, setTags] = useState([]);
    const [filteredTags, setFilteredTags] = useState(tags);
    const { currentUser } = useContext(AuthContext);

    /// ---- useEffects -------------------
    // api calls
    useEffect(()=> {
        loadData();
        console.log("load data use effect")
    }, [])

    // filtering
    useEffect(() => {
        if (authors.length) filterAuthors();
        if (books.length) filterBooks();
        if (tags.length) filterTags();
        if (highlights.length) filterHighlights();
    }, [filters, authors, books, tags, highlights]);

    // changes to highlights or filter to reset filtered highlights
    useEffect(() => {
        console.log("highlights useEffect")
    }, [filters, highlights]);

    // ------------------ Helper functions ----------------
    async function loadData() {
        // set highlights
        const data = await axios.get(`/api/${currentUser.uid}/all`);
        setHighlights(data.data);
        setFilteredHighlights(data.data);
        // set authors
        const authData = await axios.get(`api/${currentUser.uid}/authors`);
        setAuthors(authData.data);
        // set books
        const bookData = await axios.get(`api/${currentUser.uid}/books`);
        setBooks(bookData.data);
        //set tags
        const tagData = await axios.get(`api/${currentUser.uid}/tags`);
        setTags(tagData.data);
    }

    function clearFilters() {
        setFilteredHighlights(highlights);
        setFilters({author: "", book: "", tag: ""});
    }

    function filterAuthors() {
        if (filters.author !== "") setFilteredAuth([authors.find(a => a.id === filters.author)]);
        else if (filters.book !== "") {
            let authId = books.find(b => b.id === filters.book);
            if (authId) {
                authId = authId.author_id;
                setFilteredAuth([authors.find(a => a.id === authId)]);
            }
            else setFilteredAuth([]);

        }
        else if (filters.tag !== "") {
            let authIds = highlights.filter(h => h.tags.find(t => t.id === filters.tag))
                .map(h => h.book.author_id);
            if (authIds.length) setFilteredAuth([authors.find(a => authIds.includes(a.id))]);
            else setFilteredAuth([]);
        }
        else setFilteredAuth(authors); 
    }

    function filterBooks() {
        if (filters.author !== "") setFilteredBooks(books.filter(b => b.author_id === filters.author));
        else if (filters.book !== "") {
            setFilteredBooks([books.find(b => b.id === filters.book)]);
        }
        else if (filters.tag !== "") {
            let bookIds = highlights.filter(h => h.tags.find(t => t.id === filters.tag))
                .map(h => h.book.id);
            if (bookIds.length) setFilteredBooks([books.find(b => bookIds.includes(b.id))]);
            else setFilteredBooks([]);
        }
        else setFilteredBooks(books); 
    }

    function filterTags() { 
        if (filters.author !== "") {
            let hWithAuthor = highlights.reduce((acc, cur) => {
                if (cur.book.author_id === filters.author && cur.tags.length) return acc.concat(cur.tags);
                return acc;
            }, []);
            if (hWithAuthor) hWithAuthor = hWithAuthor.filter((h, ind, self) =>
                ind === self.findIndex((hl) => (hl.id === h.id)));
            setFilteredTags(hWithAuthor);
        }
        else if (filters.book !== "") {
            let hWithBooks = highlights.reduce((acc, cur) => {
                if (cur.book.id === filters.book && cur.tags.length) return acc.concat(cur.tags);
                return acc;
            }, []);
            if (hWithBooks) hWithBooks = hWithBooks.filter((h, ind, self) =>
                ind === self.findIndex((hl) => (hl.id === h.id)));
            setFilteredTags(hWithBooks);
        }
        else if (filters.tag !== "") {
            setFilteredTags([tags.find(t => t.id === filters.tag)]);
        }
        else setFilteredTags(tags); 
    }

    function filterHighlights() { 
        if (filters.author !== "") setFilteredHighlights(highlights.filter(h => h.book.author_id === filters.author));
        else if (filters.book !== "") setFilteredHighlights(highlights.filter(h => h.book.id === filters.book));
        else if (filters.tag !== "") {
            let hWithTag = highlights.filter(h => {
                if (h.tags.find(t => t.id === filters.tag)) return true;
                return false;
            });
            setFilteredHighlights(hWithTag);
        }
        else setFilteredHighlights(highlights); 
    }

    return (
    <>
        <div className="headerContainer">
            <img className="header logo" src={logo} alt="MyLights logo" />
            <p>logged in as {currentUser.email.split('@')[0]}</p>
            <Button variant="primary" className="header" onClick={()=> firebase.auth().signOut()}>Sign out</Button>
        </div>
            {
            Object.keys(highlights).length && highlights ? (<>
                <div className="clear-div">
                    <button id="clear-button" onClick={clearFilters}>Clear Filters</button>
                </div>
                <div id="filters-container">
                    <Authors authors={filteredAuth} setFilters={setFilters} 
                        loadData={loadData} clearFilters={clearFilters} />
                    <Books books={filteredBooks} authors={authors} highlights={highlights}  
                       setFilters={setFilters} loadData={loadData} 
                       clearFilters={clearFilters} />
                    <Tags tags={filteredTags}
                        setFilters={setFilters} loadData={loadData} clearFilters={clearFilters} />
                </div>
                <Highlights highlights={filteredHighlights} setFilters={setFilters} loadData={loadData}
                    clearFilters={clearFilters} books={books} /> 
            </>) : <>Loading</>
            }

    </>
    )
}

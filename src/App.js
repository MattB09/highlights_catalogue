import React, { useMemo, useReducer } from "react";
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./components/Home";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Landing from "./components/Landing";
import { addSorted } from './utils/helpers'

export const Context = React.createContext();

// declare reducer
const reducer = (state, action) => {
  switch (action.type) {
    // set initial context reducer
    case 'setContext':
      return { ...state, data: action.payload };
    // Filter reducers
    case 'clearFilters':
      return {...state, filters: {author: "", book: "", tag: ""}}
    case 'setFilter':
      return {...state, filters: action.payload}
    // Author reducers
    case 'addAuthor':
      let authorsCopy = [...state.data.authors];
      addSorted(action.payload, authorsCopy, "name");
      return { filters: state.filters, data: { ...state.data, authors: authorsCopy}}
    case 'editAuthor':
      let authorsCopy1 = [...state.data.authors];
      let bCopy1 = [...state.data.books];
      bCopy1.forEach(b => {
        if (b.author_id === action.payload.id) b.name = action.payload.name;
      });
      let ind = authorsCopy1.findIndex((auth) => auth.id === action.payload.id);
      authorsCopy1.splice(ind, 1);
      addSorted(action.payload, authorsCopy1, "name");
      return { ...state, data: { ...state.data, authors: authorsCopy1}}
    case 'deleteAuthor':
      let authorsCopy2 = [...state.data.authors];
      let bCopy = [...state.data.books];
      bCopy.forEach(b => {
        if (b.name === action.payload.name) b.name = null;
      });
      let index = authorsCopy2.findIndex((auth) => auth.id === action.payload.id);
      authorsCopy2.splice(index, 1);
      return { ...state, data: { ...state.data, authors: authorsCopy2, books: bCopy}}
    // Books reducers
    case 'addBook':
      let booksCopy = [...state.data.books];
      addSorted(action.payload, booksCopy, "title");
      return { filters: state.filters, data: { ...state.data, books: booksCopy}}
    case 'editBook':
      let booksCopy2 = [...state.data.books];
      let hCopy3 = [...state.data.highlights];
      hCopy3.forEach(h => {
        if (h.book.id === action.payload.id) h.book = action.payload;
      })
      let bIndex1 = booksCopy2.findIndex((book) => book.id === action.payload.id);
      console.log("book index", bIndex1);
      booksCopy2.splice(bIndex1, 1);
      addSorted(action.payload, booksCopy2, "title");
      return { ...state, data: {...state.data, highlights: hCopy3, books: booksCopy2}};
    case 'deleteBook':
      let booksCopy1 = [...state.data.books];
      let hCopy = [...state.data.highlights].filter(h => h.book_id !== action.payload.id);
      let bIndex = booksCopy1.findIndex((book) => book.id === action.payload.id);
      booksCopy1.splice(bIndex, 1);
      return { ...state, data: {...state.data, highlights: hCopy, books: booksCopy1}};
    // tags reducers
    case 'addTag':
      let tagsCopy = [...state.data.tags];
      addSorted(action.payload, tagsCopy, "tag");
      return { filters: state.filters, data: {...state.data, tags: tagsCopy}};
    case 'editTag':
      let tagsCopy2 = [...state.data.tags];
      let hCopy2 = [...state.data.highlights];
      hCopy2.forEach((h) => {
        let index = h.tags.findIndex(tag => tag.id === action.payload.id);
        if (index > -1) {
          h.tags.splice(index, 1);
          addSorted(action.payload, h.tags, "tag")
        }
      })
      let tIndex2 = tagsCopy2.findIndex((tag) => tag.id === action.payload.id);
      tagsCopy2.splice(tIndex2, 1);
      addSorted(action.payload, tagsCopy2, "tag");
      return { ...state, data: {...state.data, highlights: hCopy2, tags: tagsCopy2}};
    case 'deleteTag':
      // remove tag from highlights
      let tagsCopy1 = [...state.data.tags];
      let hCopy1 = [...state.data.highlights];
      hCopy1.forEach((h) => {
        let index = h.tags.findIndex(tag => tag.id === action.payload.id);
        if (index > -1) {
          h.tags.splice(index, 1);
        }
      })
      let tIndex = tagsCopy1.findIndex((tag) => tag.id === action.payload.id);
      tagsCopy1.splice(tIndex, 1);
      return { ...state, data: {...state.data, highlights: hCopy1, tags: tagsCopy1}};
    case 'addHighlight':
      let highlightsCopy = [...state.data.highlights];
      addSorted(action.payload, highlightsCopy, "highlight");
      return { filters: state.filters, data: {...state.data, highlights: highlightsCopy}};
    case 'deleteHighlight':
      let highlightsCopy1 = [...state.data.highlights];
      let hIndex = highlightsCopy1.findIndex((h) => h.id === action.payload.id);
      highlightsCopy1.splice(hIndex, 1);
      return { filters: state.filters, data: {...state.data, highlights: highlightsCopy1}};
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {filters: {author: "", book: "", tag: ""}});

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Context.Provider value={ contextValue }>
            <PrivateRoute exact path="/" component={Home} />
          </Context.Provider>
          <Route exact path="/landing" component={Landing} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

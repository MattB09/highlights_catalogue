import React, { useMemo, useReducer } from "react";
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./components/Home";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Landing from "./components/Landing";

export const Context = React.createContext();

// declare reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'setContext':
      return { ...state, data: action.payload };
    case 'addAuthor':
      let authors = {...state.authors};
      authors.push(action.payload);
      return { ...state, authors }
    case 'clearFilters':
      return {...state, filters: {author: "", book: "", tag: ""}}
    case 'setFilter':
      return {...state, filters: action.payload}
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

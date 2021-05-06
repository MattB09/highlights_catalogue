import React, { useMemo, useReducer } from "react";
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./components/Home";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Landing from "./components/Landing";
import reducer from "./utils/reducer";

export const Context = React.createContext();

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

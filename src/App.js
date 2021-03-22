import React from "react";
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom"
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Landing from "./components/Landing";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/landing" component={Landing} />
          {/* <Route exact path="/signup" component={SignUp} /> */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

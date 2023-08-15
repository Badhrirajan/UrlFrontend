import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Login from "./Components/Login";
import {Routes,Route} from 'react-router-dom'
import Sign from "./Components/Sign";
import Email from "./Components/Email";
import Reset from "./Components/Reset";
import Page from "./Components/Page";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Sign} />
        <Route path='/login' Component={Login} />
        <Route path='/email' Component={Email} />
        <Route path='/reset/:id/:token' Component={Reset} />
        <Route path="/welcome" Component={Page} />
      </Routes>
    </div>
  );
}

export default App;

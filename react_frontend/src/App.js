import React from 'react';
import { Route } from 'react-router-dom';
import SearchBar from "./components/SearchBar"
import Home from "./components/Home"
import Results from "./components/Results"
import './App.css'

function App() {
  return (
    <React.Fragment>
      <Route path={'/'} component={SearchBar} />
      <Route path={'/ home'} component={Home} />
      <Route path={'/results'} component={Results} />
    </React.Fragment>
  );
}

export default App;

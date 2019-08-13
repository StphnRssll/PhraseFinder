import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';

const root = (
  <BrowserRouter>
    <Route component={App} />
  </BrowserRouter>
)
ReactDOM.render(
  root,
  document.getElementById('root')
);

import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter, Route } from 'react-router-dom'

//Import all views
 import LandingPage from "./view/LandingPage"
 import ProtectedPage from "./view/ProtectedPage"

 // Import Authenticatio function
 import requireAuth from './utils/requireAuth'

const App = props => {
  return (
   <BrowserRouter>
    <Route path='/' exact component={requireAuth(LandingPage, true)} />
    <Route path='/protectedpath' exact component={requireAuth(ProtectedPage, false)} />
   </BrowserRouter>
  );
}

export default App;

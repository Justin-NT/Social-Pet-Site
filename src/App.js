import React from "react";
import "./App.css";
import Navbar from "./site/Navbar";
import Body from "./site/Body";
import Footer from "./site/Footer";
import {
  BrowserRouter as Router,
} from 'react-router-dom';




function App() {
  return (
    <div className="maindiv">
    
      <Router><Navbar /></Router>
      <Body />
      <Footer />
      
    </div>
  );
}

export default App;

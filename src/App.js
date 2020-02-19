import React from "react";
import "./App.css";
import NavbarDisplay from "./Components/Navbar/NavbarDisplay";
// import Adopt from "./Components/Adopt/Adopt";
// import Paper from "@material-ui/core/Paper";
// import Button from "@material-ui/core/Button"




function App() {
  return (
    <div className="maindiv">
    
      <NavbarDisplay />
      <h3 className="mission">Tired of seeing a depressing scene as you mindlessly scroll through your social media?</h3>
      <h1 className="mission">Don't!</h1> 
      <h3 className="mission">Stay happy and keep your heart full at Petazoa! </h3>
      
    </div>
  );
}

export default App;

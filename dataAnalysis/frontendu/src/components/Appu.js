import React, { useState } from "react";
import { render } from "react-dom"
import Header from "./mainpagestructure/header";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import Join from "./JoinExisting";
import MakeRoom from "./CreateNewTextRoom";
import Writetext from "./writetext";

/* Main Page */

export default function App(props){

    const [sessions, setSessions] = useState(null);


    async function gotopage(props){
        
  
    fetch("/api/in-room")
    .then((response) => response.json())
    .then((data) => setSessions("/room/"+data.code));
    console.log(sessions);




    }
    
     return (

   
       <Router>
          <Routes>

              <Route path='/' element={<Header/>}/>
              <Route path='join' element={ <Join/>}/>
              <Route path='create' element={<MakeRoom/>}/>
              <Route path="room/:roomCode" element={ <Writetext/>}/>
          </Routes>
      </Router>


      
 



     
        
    

      )

   


};
const appDiv = document.getElementById("app");
render(<App/>, appDiv)

import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { Grid, Typography, TextField, FormControlLabel, RadioGroup, FormHelperText, FormControl, Radio  } from '@mui/material';
import { Link } from "react-router-dom";
import { textAlign } from "@mui/system";
import App from "./Appu";

import PrimarySearchAppBar from "./mainpagestructure/Functions/TrueHeader";



const pages = {
  JOIN:"pages.join"
}


/* Join Page */

export default function Join(props){



  const[Code, SetCode]= useState("");

  const handleS = (e) =>{
      
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: Code
        
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok	){
          window.open("/room/"+Code)


        }
        else {
          console.log("Room not found");
        }



      }


      ).catch(console.error())
      


    
  
  }
  
  
  

  return (
    <div>
          <PrimarySearchAppBar/>
    <div className="center">

    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">Join a TextRoom</Typography>
      </Grid>
     

        <Grid item xs={12} align="center">
        <FormControl>
          <TextField id="outlined-basic"
           label="CODE" 
           variant="outlined"
           defaultValue={Code}
           onChange={(e) => SetCode(e.target.value)}
           inputProps={{min:1, style:{textAlign: "center"}}}


            />
  
          </FormControl>

        </Grid>

        <Grid item xs={12} align="center">
         <Button variant="outlined" color="success" onClick={handleS}>Join</Button>

      
        </Grid>

        <Grid item xs={12} align="center">
        <Button variant="outlined" color="error" href="/">Back</Button>



        </Grid>



    </Grid>

    </div>
</div>
  );
}

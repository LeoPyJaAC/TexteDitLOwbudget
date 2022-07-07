import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import PrimarySearchAppBar from "./mainpagestructure/Functions/TrueHeader";
import { Grid, Typography, TextField, FormControlLabel, RadioGroup, FormHelperText, FormControl, Radio  } from '@mui/material';
import { Link } from "react-router-dom";
import { textAlign } from "@mui/system";
import App from "./Appu";


const pages = {
  JOIN:"pages.join"
}



/* Create Page */

export default function MakeRoom(props){
  

  const[DefaultFiles, SetDefault]= useState(2);
  const{ int }= DefaultFiles;
  
  const[Code, SetCode]= useState("");

  const[ handleGuestCanEditChange, SetEditText]= useState("true");
  const { text }= handleGuestCanEditChange;
  const handleS = (e) =>{

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_can_edit: handleGuestCanEditChange,
        guest_can_upload_files_amount: DefaultFiles,
        
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => SetCode("/room/" + data.code));

      
    

    if (handleGuestCanEditChange=="true"){

        console.log("True", DefaultFiles);
     
        window.open(Code)
    }
  
     
    if (handleGuestCanEditChange=="false"){



      console.log("false");
      window.open(Code)
    }

  }
  
  
  

  return (
    <div>
          <PrimarySearchAppBar/>
    <div className="center">

    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">Create a TextRoom</Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">
                Guest can edit
            </div>
          </FormHelperText>

          <RadioGroup row
           defaultValue="true"
           onChange={(e) => SetEditText(e.target.value)}
           >
            <FormControlLabel 
        
              value="true" 
              control={<Radio/>}
              label="Edit"

      
              labelPlacement="bottom"/>
            <FormControlLabel 

              value="false" 
              control={<Radio/>}
              label="View"

              labelPlacement="bottom"/>
          </RadioGroup>

        </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
        <FormControl>
          <TextField id="outlined-basic"
           label="How many files guest can upload?" 
           variant="outlined"
           defaultValue={DefaultFiles}
           onChange={(e) => SetDefault(e.target.value)}
           inputProps={{min:1, style:{textAlign: "center"}}}


            />
  
          </FormControl>

        </Grid>

        <Grid item xs={12} align="center">
         <Button variant="outlined" color="success" onClick={handleS}>Create</Button>

      
        </Grid>

        <Grid item xs={12} align="center">
        <Button variant="outlined" color="error" href="/">Back</Button>



        </Grid>



    </Grid>
    </div>
</div>

  );
}

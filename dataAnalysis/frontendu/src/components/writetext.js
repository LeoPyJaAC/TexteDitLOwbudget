import {Button,Box, Grid, Typography, TextField, FormControlLabel, RadioGroup, FormHelperText, FormControl, Radio, Stack, Card, CardContent,CardMedia, CardActionArea   } from '@mui/material';
import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Autocomplete } from '@mui/material';
import Chip from '@mui/material/Chip';
import PrimarySearchAppBar from './mainpagestructure/Functions/TrueHeader';

/* Write Room Page */

export default function Writetext(props){


  let { roomCode } = useParams();
  const[GetRoomCode, UpdateRoomCode]= useState(roomCode);
  

  const[DefaultFiles, SetDefault]= useState(0);


  const[SetCan, SetEditText1]= useState("te");


  const[ Text2, SetText]= useState([]);

  const[ TextInput, SetTextInp]= useState([]);
  const[ TextSave, SetTextSave]= useState([]);


  const Defaultextes = [
    {label: TextSave.toString()},



  ];


  const[ host, setHost]= useState(0);
  useEffect(() => {
  
        fetch("/api/get-room" + "?code=" + GetRoomCode)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            SetEditText1(data.guest_can_edit);
            SetDefault(data.guest_can_upload_files_amount);
            setHost(data.host);
            SetText(data.textediton);})



  }, []);



  useEffect(() => {
    const interval = setInterval(() => {

      if(Text2 !==TextSave){
    
        fetch("/api/get-room" + "?code=" + GetRoomCode)
        .then((response) => response.json())
        .then((data) => {
      
          SetTextSave(data.textediton)
})
      
      
   } }, 1000);   

    return () => clearInterval(interval);
  }, []);



  

  const Onpressy  = async () =>{
   

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: GetRoomCode,
        textediton:Text2,
      }),

    };
    fetch("/api/update", requestOptions).then((response) => {
      if (response.ok) {
        console.log("good");
        SetTextSave(Text2)
          

          
      } else {
        console.log("bad");
        
      }
;
    });

    
 




    
   

  }




  return (
    <div>


<Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
          <PrimarySearchAppBar/>

   



         <Grid container spacing={2}
        >


       
 

    <Grid item xs={2} >
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="220"
          image={"https://i.pinimg.com/originals/e6/14/2e/e6142eacd3e73a4075e959a611e94819.jpg"}
          alt="Room"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {GetRoomCode}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <p>Votes: {DefaultFiles}</p>
        <p>Guest Can edit: { SetCan.toString()}</p>
        <p>Host: {host.toString()}</p>
           
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
      
      </Grid>
    <Grid item width={'40%'} >

 
        <Autocomplete
      disablePortal
      id="combo-box-demo"
     

      options={Defaultextes.map((option) => option.label)}
   
      freeSolo
      renderInput={(params) => <TextField {...params} fullWidth id="outlined-basic" 
      label="Insert text"
       variant="outlined" 
       onChange={ e => SetText(e.target.value) }
       multiline
       rows={16}/>}  />
       
       
       </Grid>
        <Grid item width={'40%'} >
  

        <TextField 
        id="outlined-basic" 
        label="Insert text" 
        value={TextSave.toString()}
         variant="outlined" 
         fullWidth
         multiline
         rows={16}>


            
        </TextField>

         </Grid>



         
         <Grid item xs={2}>

          <Typography component="h4" variant="h4"></Typography>

          </Grid>

          <Grid item width={"80%"}>
          <Button variant="outlined" color="success" onClick={Onpressy} fullWidth>Save</Button>

            </Grid>
     
          </Grid>
      



       


    
      
      





 

   



   
      </Stack>
</Box>
</div>
         
  )
}



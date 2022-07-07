import React, { useState, useEffect } from "react";

import PrimarySearchAppBar from "./Functions/TrueHeader";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import { Button, Grid, Typography, TextField, FormControlLabel, RadioGroup, FormHelperText, FormControl, Radio, Box, Stack, Card, CardContent,CardMedia, CardActionArea,ListItem, ListItemButton,ListItemText,List   } from '@mui/material';



export default function Header(props){

    

    const[host, SetHost]= useState([]);
    const[id, setId]= useState([]);
    
    useEffect(() => {
  
        fetch("/api/get-room-id")
        .then((response) => response.json())
        .then((data) => {
            setId(data);})



  }, []);
    
    console.log(id);
    const length = id.length;




    
  const[Code, SetCode]= useState("");



    


    


    return (
        

        <div>
        <Box sx={{ width: '100%' }}>
        <Stack spacing={2}>
            <PrimarySearchAppBar/>



        


        
        



        <div>

        <List sx={{    width: '100%',
 
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 500,
        '& ul': { padding: 0 }, }}>

      {id.map((value) => (
        <ListItem
          key={value}
          disableGutters
        >

            <ListItemButton href={`/room/${value}`}
            >
            <Card sx={{width: '100%'} }>
     
        <CardMedia
          component="img"
          height="220"

      
          image={"https://i.pinimg.com/originals/e6/14/2e/e6142eacd3e73a4075e959a611e94819.jpg"}
          alt={`RoomID ${value}`}
        />

        <CardContent sx={{ width: '100%' }}>

          <Typography gutterBottom variant="h5" component="div">
          {`RoomID ${value}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">

           {`RoomID ${value}`}
          </Typography>
        </CardContent>

  
    </Card>

        </ListItemButton>

        </ListItem>
      ))}
 
    </List>

     

        <Grid item xs={12} align="center">
       <Button variant="outlined" color="success" href="create">Create</Button>


       </Grid>

       <Grid item xs={12} align="center">
       <Button variant="outlined" color="success" href="join">Join</Button>



       </Grid>
       </div> 
       
       </Stack>
     
     
     
     </Box>
     
    
</div>


    )

}

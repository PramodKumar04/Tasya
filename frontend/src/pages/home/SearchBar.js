import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function SearchBar(){
  return (
    <div
      className="row d-flex justify-content-center mt-4"
      style={{marginBottom: '28px' }}
    >
      <div className="col-10 col-sm-8 col-md-6 col-lg-4">
        <div style={{ display: 'flex', gap: '10px' }}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px'
              }
            }}
          />
          <Button variant="contained" sx={{ borderRadius: '25px',width:"150px",backgroundColor:"#6C5CE7"}}>
            Search <i className="fa-solid fa-magnifying-glass ms-2"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}

  

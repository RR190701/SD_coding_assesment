import React ,{useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Box from '@mui/material/Box';

export default function SharePDF({fileName}) {
  const [open, setOpen] = React.useState(false);  
  const [errors, setErrors] = useState("");
  const [file, setFile] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {

  }, []);

  const popError = (errorMessage) => {

    toast.error(errorMessage, {
      className :"error-toast",
      position:toast.POSITION.BOTTOM_RIGHT
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 


  const shareFile = async(e) => {
    e.preventDefault();
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
    try {
          const { data } = await axios.post(
            "/api/upload/shareFile",
            {username, fileName },
            config
          );
          toast.success("File Uploaded", {
            className :"success-toast",
            position:toast.POSITION.BOTTOM_RIGHT
          });
        handleClose();
      } catch (error) {
        popError(error.response.data.error);
      };
}



  return (
    <div>
        <ToastContainer></ToastContainer>
        <Button variant="outlined" onClick={handleClickOpen}>
        Share
      </Button>
      <Dialog open={open}>
        <DialogTitle>Share this PDF</DialogTitle>
        <DialogContent>
          <Box
      component="form"
      sx={{
        'display':'flex',
        'boxSizing':'border-box',
        'width':'300px',
        'justifyContent':'space-between',
        'flexWrap':'wrap',
      }}
      noValidate
      autoComplete="off"
    >  
    <input style={{"width":"100%", "padding":".5rem"}}
     type='text' value={username} name={username} placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)}></input>  
     </Box>
   
  {errors && <span>{errors}</span>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => shareFile(e)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
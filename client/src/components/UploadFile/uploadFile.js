import React ,{useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import './style.css';
import Box from '@mui/material/Box';

export default function UploadFile({setfiles}) {
  const [open, setOpen] = React.useState(false);  
  const [errors, setErrors] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {

  }, []);

  const popError = (errorMessage) => {

    toast.error(errorMessage, {
      className :"error-toast",
      position:toast.POSITION.BOTTOM_RIGHT
    });
  }

  const handleClickOpen = () => {
    setErrors("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const uploadFile = async(e) => {
     
    e.preventDefault();
    if(file.type != "application/pdf"){
      setErrors("Can upload PDF only");
      return;
    } 
    setErrors("");
    const formData = new FormData();
    formData.append("myFile", file);
    formData.append("username", localStorage.getItem("username"));
    axios.post("https://sd-backend-g1qt.onrender.com/api/upload/uploadFile", formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
      }).then((res) => {
        setFile(null);
        toast.success("File Uploaded", {
            className :"success-toast",
            position:toast.POSITION.BOTTOM_RIGHT
          });
          console.log("result files ",res);
        setfiles(prevFiles => [...prevFiles, {fileName:res.data.fileName}])
        handleClose();
      }).error((error) => {
        console.log("error")
        popError(error.response.data.error);
      });

}



  return (
    <div>
        <ToastContainer></ToastContainer>
        <Button variant="outlined" sx={{marginBottom:"1rem"}} onClick={handleClickOpen}>
        Upload New File
      </Button>
      <Dialog open={open}>
        <DialogTitle>Upload File</DialogTitle>
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
    
<input  className='upload-file' type = 'file' name= 'myFile' onChange={(e) => setFile(e.target.files[0])}></input>

    </Box>
   
  {errors && <span style={{"color":"red", fontSize:"12px"}}>{errors}</span>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => uploadFile(e)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
import  React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ResponsiveDrawer from './../../components/Navbar/navbar';
import axios from "axios";
import UploadFile from '../UploadFile/uploadFile';
import './style.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import SharePDF from '../SharePDF/sharePDF';

const drawerWidth = 220;
const StudyMaterial = ({history}) => {
    const[files, setfiles] = useState([]);
    const[sharedFiles, setSharedFiles] = useState([]);


    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login");
        } 
        const fetchAllFiles = async() => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
        try {
              const { data } = await axios.post(`https://sd-backend-g1qt.onrender.com/api/upload/getAllFile`, 
              {username:`${localStorage.getItem("username")}`}
              ,config
        );              
              setfiles(data.res);
            
            } 
            catch (error) {
            }
          };
          
          fetchAllFiles();

          const fetchAllSharedFiles = async() => {
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            };
          try {
                const { data } = await axios.post(`https://sd-backend-g1qt.onrender.com/api/upload/getAllSharedFile/${localStorage.getItem("username")}`,
                {username:`${localStorage.getItem("username")}`},
               config);
                setSharedFiles(data.res);
              
              } 
              catch (error) {
              }
            };
            
            fetchAllSharedFiles();
        },[history]);
    return (
        
        <Box sx={{ display: 'flex' }} >
        <ResponsiveDrawer history={history}></ResponsiveDrawer> 
        <Box
        component="main"
        sx = {{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
    <Box component="div"
    sx={{display:"flex"}}>
      {(true)?(<>
<UploadFile setfiles={setfiles}></UploadFile>
              </>

      ):null}


    </Box>
    
<h1 className='pdf-headings'>Owned PDFs</h1>
    <div className ="ownedPdf">
    {files.map(({fileName}) => (
      <div className='owned-pdfs' key={fileName}>
      <div style={{"display":"flex","alignItems":"center"}}>
      <NavLink to={`/pdf/${fileName}`} style={{"color":"black","fontSize":"14px"}} >{fileName}</NavLink>
      </div>
      <SharePDF fileName ={fileName}></SharePDF>
    </div>

    ))}
       
    </div>


<h1 className='pdf-headings'>Shared PDFs</h1>
    <div className ="ownedPdf" >
    {sharedFiles.map(({fileName}) => (
      <div className='owned-pdfs' key={fileName}>
      <div style={{"display":"flex","alignItems":"center"}}>
      <NavLink to={`/pdf/${fileName}`} style={{"color":"black","fontSize":"14px"}} >{fileName}</NavLink>
      </div>
    </div>

    ))}     
    </div>
      </Box>
      </Box>
     );
}
 
export default StudyMaterial;
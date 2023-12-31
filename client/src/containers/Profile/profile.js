import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ResponsiveDrawer from './../../components/Navbar/navbar';
import axios from 'axios';
import './style.css';

const drawerWidth = 220;


const Profile = ({history}) => {
  const[role, setRole] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
    try {
          const { data } = await axios.get(`https://sd-backend-g1qt.onrender.com/api/private/profile/${localStorage.getItem("username")}`, config);
          setRole(data.user.role);     
        
        } catch (error) {
        }
      };
      fetchData();
    },[]);
    return (
        
        <Box sx={{ display: 'flex' }}>
        <ResponsiveDrawer history={history}></ResponsiveDrawer> 
        <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <div className="profile-page">

          <div className='avatar'>
          {localStorage.getItem("username")[0].toUpperCase()}
          </div>
               
               <div  className = "username">{localStorage.getItem("username")}</div>

        </div>
      </Box>
      </Box>
     );
}
 
export default Profile;
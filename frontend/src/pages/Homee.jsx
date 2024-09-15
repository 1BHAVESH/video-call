import React, { useContext, useState } from 'react';
import WithAuth from "../utils/WithAuth"
import { useNavigate } from 'react-router-dom';
import "../App.css"
import { IconButton } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { Button, TextField } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

function HomeComponent() {
    
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const{addToUserHistory} = useContext(AuthContext);
    let handleJoinVideoCall = async() => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }
    return ( 
        <>
       <div className="navBar">
        <div style={{display: "flex", alignItems: "center"}}>
            <h2>Apna video Call</h2>
        </div>

        <div style={{display: "flex", alignItems: "center"}}>
            <IconButton onClick={() => {
                navigate("/history")
            }}>
                <RestoreIcon />
            </IconButton>
            <p>History</p>
            <Button onClick={()=>{
                localStorage.removeItem("token");
                navigate("/auth")
            }}>
             Logout
            </Button>
        </div>
       </div>
       <div className="meetContainer">

        <div className="leftPanel">
            <div>
                <h2>Providing Quality Video Call Just Like Quality Education System</h2>
                <div style={{display: "flex", gap: "10px"}}>

                <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>

                </div>
            </div>
        </div>

        <div className="rightPanel">

            <img srcSet="/public/logo3.png" />

        </div>

       </div>
      </>
     );
}

export default WithAuth(HomeComponent);
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {userState} from "../store/atoms/users.js";
import { BASE_URL } from '../config.js';

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);
    
    return <div>
        <div style={{
            paddingTop:150, marginBottom: 10,
            display:"flex",justifyContent:"center"
        }}>
            <Typography variant='h6'>
                Welcome To Edu-space. Sign in below
            </Typography>
        </div>
        <div style={{display:'flex', justifyContent:'center'}}>
            <Card variant='outlined' style={{width:400, padding:20}}>
                <TextField
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    fullWidth={true}
                    label="Username or Email"
                    variant="outlined"
                />
                <br /><br />
                 <TextField
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    fullWidth={true}
                    label="Password"
                    variant="outlined"
                    type="password"
                />
                <br /><br />
                {/* <Button size='large' variant='contained' onClick={async() => {
                    const options = {
                        "username":email,
                        "password":password 
                    }
                    const res = await axios.post(`${BASE_URL}/admin/login`,{method: "POST"} , options);
                    let data = res.data;
                    localStorage.setItem("token", data.token);
                    setUser({
                        userEmail: email,
                        isLoading:false
                    })
                    navigate("/courses")
                }}> Sign in </Button> */}
                <Button size='large' variant='contained' onClick={() => {
                    fetch(`${BASE_URL}/admin/login`,{
                        method: "POST",
                        headers:{
                            "username" : email,
                            "password" : password
                        }
                    }).then((res) => {
                        res.json().then((data) => {
                            localStorage.setItem("token", data.token);
                        })
                    });
                    setUser({
                        userEmail: email,
                        isLoading:false
                    })
                    navigate("/courses")
                }}> Sign in </Button>
            </Card>
        </div>
    </div>
}
export default Signin;
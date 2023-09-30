import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userEmailState } from "../store/selectors/userEmail";
import { userState } from "../store/atoms/users.js"

function Appbar({}) {
    const navigate = useNavigate();
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);

    if(userLoading) {
        return <></>
    }
    
    if(userEmail) {
        return <div style={{
            display:"flex", justifyContent: "space-between", padding:4, zIndex:1
        }}>
            <div style={{marginLeft:10, cursor:"pointer"}} onClick={() => {
                navigate('/')
            }}>
                <Typography variant="h6">Edu-sapce</Typography>
            </div>
            <div style={{display:"flex"}}>
                <div style={{marginRight:10, display:"flex"}}>
                    <div style={{marginRight:10}}>
                        <Button variant={"contained"} onClick={() => {
                            navigate("/addcourse")
                        }}> Add Course </Button>
                    </div>
                    <div style={{marginRight:10}}>
                        <Button variant={"contained"} onClick={() => {
                            navigate("/courses")
                        }}> Courses </Button>
                    </div>
                    <Button variant= "contained" onClick={() => {
                        localStorage.setItem("token", null);
                        setUser({
                            isLoading: false,
                            userEmail: null
                        })
                        alert("You are logged out")
                        navigate("/signin")
                    }}>Logout</Button>
                </div>
            </div>
        </div>
    } else {
        return <div style={{
            display:"flex",
            justifyContent:"space-between",
            padding: 4,
            zIndex: 1   
        }}>
            <div style={{marginLeft:10, cursor:"pointer"}} onClick={() => {
                navigate("/")
            }}>
                <Typography variant="h6">Edu-space</Typography>
            </div>

            <div style={{display:"flex"}}>  
                <div style={{marginRight:10}}>
                    <Button  
                        variant={"contained"}
                        onClick={() => {
                        navigate("/signup")
                        }}
                    > Sign up </Button>
                </div>
                <div>
                <Button
                        variant={"contained"}
                        onClick={() => {
                        navigate("/signin")
                        }}
                    > Sign in </Button>
                </div>
            </div>
        </div>
    }
}

export default Appbar;
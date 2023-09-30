import { CircularProgress } from "@mui/material";

export const Loading = () => {
    return <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center", height:"100vh"}}>
        <div style={{display:"flex", justifyContent:"center"}}>
            <CircularProgress />
        </div>
    </div>
}
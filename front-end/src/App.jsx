import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./components/Landing.jsx";
import Appbar from "./components/Appbar.jsx";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import Courses from "./components/Courses.jsx";
import Course from "./components/Course.jsx";
import AddCourse from "./components/AddCourse.jsx";
import {
   RecoilRoot, 
   useSetRecoilState 
} from 'recoil';
import { userState } from "./store/atoms/users.js";
import { BASE_URL } from "./config.js";
import axios from "axios";
import { useEffect } from "react";

function App() {
  return (
    <RecoilRoot>
        <div style={{
          width:"100vw",
          height:"100vh",
          backgroundColor: "#eeeeee"
        }}>
          <Router>
            <Appbar />
            <InitUser />
            <Routes>
              <Route path={"/"} element={<Landing />} />
              <Route path={"/signup"} element={<Signup />} />
              <Route path={"/signin"} element={<Signin />} />
              <Route path={"/addcourse"} element={<AddCourse />} />
              <Route path={"/courses"} element={<Courses />} />
              <Route path={"/course/:courseId"} element={<Course />} />
            </Routes>
          </Router>
        </div>
    </RecoilRoot>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async() => {
    try{
      const res = await axios.get(`${BASE_URL}/admin/profile`,{
        headers: {
          "Authorization": "Bearer "+ localStorage.getItem("token")
        }
      })
      if(res.data.username) {
        setUser({
          isLoading:false,
          userEmail: res.data.username
        })
      } else {
        setUser({
          isLoading: false,
          userEmail: null
        })
      }
    } catch(e) {

      setUser({
        isLoading: false,
        userEmail: null
      })
    }
  };

  useEffect(() => {
    init(); 
  }, []);

  return <></>
}

export default App;

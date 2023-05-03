import {
  BrowserRouter, Routes, Route
} from "react-router-dom"
import Home from "./pages/Home/Home.jsx"
import CourseRoad from "./pages/CourseRoad/CourseRoad.jsx";
import Courses from "./pages/Courses/Courses.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx"
import Timetable from "./pages/Timetable/Timetable.jsx";
function App() {
  localStorage.setItem('user',"null")
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/CourseRoad" element={<CourseRoad/>}/>
        <Route path="/Courses" element={<Courses/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Timetable" element={<Timetable/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

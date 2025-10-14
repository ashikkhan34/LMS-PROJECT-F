import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../MainlayOut/MainLayOut";
import Home from "../pages/Home";
import CategoryDetails from "../Components/CourseCategory/CategoryDetails";
import MentorDetails from "../Components/MentorDetails/MentorDetails";
import AllCourse from "../pages/AllCourse";
import AllMentor from "../Components/AllMentor/AllMentor";
import Register from "../Register/Register";
import ToggleFrom from "../ToggleFrom/ToggleFrom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import StudentDashboard from "../Dashborads/StudentDaashboard/StudentDashboard";
import MentorDashboard from "../Dashborads/MentorDashboard/MentorDashboard";
import AdminDashboard from "../Dashborads/AdminDashboard/AdminDashboard";
import Dashboard from "../Dashborads/Dashboard";
import AllUsers from "../Dashborads/AdminDashboard/AllUsers";
import AllMentors from "../Dashborads/AdminDashboard/AllMentors";
import Certificate from "../Dashborads/AdminDashboard/Certificate";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayOut></MainLayOut>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/categoryDetails/:id',
                element:<CategoryDetails></CategoryDetails>
            },
            {
                path:'/mentorDetails/:id',
                element:<MentorDetails></MentorDetails>
            },
            {
                path:'/all-courses',
                element:<AllCourse></AllCourse>
            },
            {
                path:'/all-mentor',
                element:<AllMentor></AllMentor>
            },
            {
                path:'toggle-from',
                element:<ToggleFrom></ToggleFrom>
            },
            {
                path:'/about',
                element:<About></About>
            },
            {
                path:'/contact',
                element:<Contact></Contact>
            },
            {
                path:'/studentDashboard',
                element:<StudentDashboard></StudentDashboard>
            },
            {
                path:'mentorDashboard',
                element:<MentorDashboard></MentorDashboard>
            },
        ]
    },
    {
        path:'/dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:'/dashboard/adminDashboard',
                element:<AdminDashboard></AdminDashboard>
            },
            {
                path:'/dashboard/allUsers',
                element:<AllUsers></AllUsers>
            },
            {
                path:'/dashboard/allMentors',
                element:<AllMentors></AllMentors>
            },
            {
                path:'/dashboard/certificate',
                element:<Certificate></Certificate>
            }
        ]
    }
])
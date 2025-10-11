import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../MainlayOut/MainLayOut";
import Home from "../pages/Home";
import CategoryDetails from "../Components/CourseCategory/CategoryDetails";
import MentorDetails from "../Components/MentorDetails/MentorDetails";
import AllCourse from "../pages/AllCourse";
import AllMentor from "../Components/AllMentor/AllMentor";
import Register from "../Register/Register";
import ToggleFrom from "../ToggleFrom/ToggleFrom";

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
        ]
    }
])
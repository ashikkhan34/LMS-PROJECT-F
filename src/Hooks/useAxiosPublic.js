import axios from "axios";


const axiosPublic = axios.create({
    baseURL:'https://lms-project-3jv6m2s7m-ashik-khans-projects-431c6227.vercel.app/api',
    withCredentials: true,
})

const useAxiosPublic = () =>{
    return axiosPublic
}

export default useAxiosPublic;
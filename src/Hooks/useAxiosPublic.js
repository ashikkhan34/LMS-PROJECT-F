import axios from "axios";


const axiosPublic = axios.create({
    baseURL:'https://lms-project-tau-inky.vercel.app/api/',
    withCredentials: true,
})

const useAxiosPublic = () =>{
    return axiosPublic
}

export default useAxiosPublic;
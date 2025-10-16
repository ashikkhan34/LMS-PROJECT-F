import axios from "axios";


const axiosPublic = axios.create({
    baseURL:'https://lms-project-tau-inky.vercel.app/api/'
})

const useAxiosPublic = () =>{
    return axiosPublic
}

export default useAxiosPublic;
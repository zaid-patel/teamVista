import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const [projects,setProjects] = useState([])
    const [token,setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'):false )
    const [userData, setUserData] = useState(false)
    const [userProjects,setUserProjects] = useState([])
    const [userProfile,setUserProfile]=useState();
    const [tasks,setTasks]=useState([])
    const backendUrl = "http://127.0.0.1:8000/api/v1"
    
    

    const getprojects = async () => {

        try {
            let url;
            if(userData){
                // console.log(userData);
                url=backendUrl + '/projects/q?'+"userId="+userData._id;
                
            }
             
            else  url=backendUrl + '/projects/q?'
            // console.log(url);
            
            const { data } = await axios.get(url)
            if (data.success) {
                setProjects(data.data)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    
    // Getting User Profile using API
    const loadUserProfileData = async () => {

        try {
            if(userData){
            const { data } = await axios.get(backendUrl + '/users/'+userData?.username, { headers: { token } })

            if (data.success) {
                console.log(data.data);
                
                setUserData(data.data[0])
            } else {
                toast.error(data.message)
            }
        }
        else{
            const { data } = await axios.get(backendUrl + '/users/', { headers: { accesstoken:token } })

            if (data.success) {
                console.log(data.data);
                
                setUserData(data.data[0])
            } else {
                toast.error(data.message)
            }
        }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }
    const value = {
        projects,getprojects,token,setToken,backendUrl,userData,setUserData,loadUserProfileData

    }

    useEffect(() => {
            getprojects()
            console.log(projects);
            
    }, [token,userData])

    useEffect(() => {
        if(token){
            loadUserProfileData()
            // console.log(token);
        }
        else{
            setUserData(false)
        }
    },[token])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
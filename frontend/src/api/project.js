import axios from "axios"
// import { AppContext } from "../context/AppContext";

export const getProject=async (projectId)=>{

    // console.log(projectId);
    
    const data=await axios.get('/api/v1/projects/'+projectId)
    // console.log(data.data);
    
    return data.data.data;
}



export const onAddSection=async(data)=>{
    console.log(data);

    const res=await axios.post(`/api/v1/sections/add`,data)

    console.log(res);

    return res.data.success;
    
}


export const onAddFeature=async(data)=>{
    console.log(data);
    const formData={
        title:data.title,
        resources:data.resources[0],
        deadline:data.deadline,
        description:data.description,
    }
    console.log(formData);
    
   try {
     const res=await axios.post(`/api/v1/features`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data'  // Important header for file uploads
        }
    })
 
     console.log(res);
 
     return res.data.success;
   } catch (error) {
    
   }
    
}



export const addOrUpadeProject=async(project,initialData)=>{
    // const getProject=AppContext()
    try {
        
        if(initialData){
            console.log(project);
            
            const res=await axios.patch('/api/v1/projects/update',{...project,
                projectId:initialData._id,
            })
    
            console.log(res);
    
            return res.data.success;
            
        }
        else{
            console.log(data.logo[0]);
            
            const res=await axios.post('/api/v1/projects/create',{
                ...data,
                logo:data.logo[0],
            },{
                headers: {
                    'Content-Type': 'multipart/form-data'  // Important header for file uploads
                  }
            })
            console.log(res);
            
            return res.data.success;
        }
        getProject();
    } catch (error) {
       console.log(error.message);
          
    }
}
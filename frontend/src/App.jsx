import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import { Routes,Route,useRoutes } from 'react-router'
import RegisterComponent from './components/auth/register'
import HomePage from './pages/Home'
import Project from './pages/Project'
import AddSectionForm from './pages/forms/AddSection'
import ProjectForm from './pages/forms/ProjectForm'
import SectionPage from './pages/Section'
import AddFeatureForm from './pages/forms/AddFeature'
// import { LiveblocksProvider } from "@liveblocks/react";
// import { createClient } from "@liveblocks/client";

// const client = createClient({
//   publicApiKey: "pk_dev_anrKkHsD_-0ZPUcwMMXgmgM2GRP6kbEYzi1p2maxYiK2YLkN4fMlZkyrltyXCLZu", // Replace with your key
// });
// <LiveblocksProvider client={client}></LiveblocksProvider>


function App() {

  return (
    <>
        <Routes>
         
          <Route path='/login' element= {<Login/>} />
          <Route path='/register' element= {<RegisterComponent />} />
          <Route path='/' element= {<LandingPage/>} />
          <Route path='/home' element= {<HomePage />} />
          <Route path='/project/:projectId' element= {<Project />} />
          <Route path='/:projectId/addSection' element= {<AddSectionForm />} />
          <Route path='/:projectId/update' element= {<ProjectForm />} />
          <Route path='/create' element= {<ProjectForm />} />
          <Route path='/sections/:sectionId' element= {<SectionPage />} />
          <Route path='/:sectionId/add' element= {<AddFeatureForm />} />



          
        </Routes>
       {/* <LandingPage /> */}
    </>
  )
}

export default App

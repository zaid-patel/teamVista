import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
import { BrowserRouter } from 'react-router'
import AppContextProvider from './context/AppContext.jsx'
import { LiveblocksProvider } from "@liveblocks/react";
import { createClient } from "@liveblocks/client";


// const client = createClient({
//   publicApiKey: "pk_dev_anrKkHsD_-0ZPUcwMMXgmgM2GRP6kbEYzi1p2maxYiK2YLkN4fMlZkyrltyXCLZu", // Replace with your key
// });



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      {/* <LiveblocksProvider client={client}>  */}
      
    <AppContextProvider>
    <SocketProvider>
    
    <App />
    </SocketProvider>
    </AppContextProvider>
    
    {/* </LiveblocksProvider> */}
    </BrowserRouter>

)

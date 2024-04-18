import Home from "./pages/Home"
import {Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin"
import Signup from "./pages/signup/Signup"
import  { Toaster } from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext";
function App() {
const {authUser}=useAuthContext()

  return (
    <>
      
   <div className="p-4 h-screen flex items-center justify-center">
   <Toaster />
   <BrowserRouter>
      <Routes>
        
          <Route path="/" element={authUser?<Home />:<Navigate to="/login"/>} />
          <Route path="/login" element={authUser?<Navigate to="/"/>:<Signin />} />
          <Route path="/signup" element={authUser?<Navigate to="/"/>:<Signup />} />
          
     
      </Routes>
  
    </BrowserRouter>
   </div>

    </>
  )
}

export default App

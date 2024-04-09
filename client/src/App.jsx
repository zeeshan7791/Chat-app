import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin"
import Signup from "./pages/signup/Signup"
import  { Toaster } from 'react-hot-toast';
function App() {


  return (
    <>
      
   <div className="p-4 h-screen flex items-center justify-center">
   <Toaster />
   <BrowserRouter>
      <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          
     
      </Routes>
  
    </BrowserRouter>
   </div>

    </>
  )
}

export default App

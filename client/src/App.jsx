import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin"
import Signup from "./pages/signup/Signup"
function App() {


  return (
    <>
      
   <div className="p-4 h-screen flex items-center justify-center">
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

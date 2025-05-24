import { useState } from 'react'
import './App.css'
import{ Routes,Route,Router} from "react-router-dom"
import Home from './pages/home'
import About from './pages/About'
import Blogs from './pages/Blogs'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Error from './pages/Error'
import Navbar from './components/Navbar'
import BlogUploadPage from './pages/BlogUpload'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/blogs/create" element={<BlogUploadPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="*" element={<Error/>}/>
    </Routes>
    </div>
  )
}

export default App

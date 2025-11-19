import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import {Navbar} from './components/Navbar'
import Footer from './components/Footer'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Blogs from './pages/Blogs'
import SingleBlog from './pages/SingleBlog'
import CreateBlog from './pages/CreateBlog'
import UpdateBlog from './pages/UpdateBlog'
import MyBlogs from './pages/MyBlogs'
import ProfilePage from './pages/ProfilePage'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import AboutUs from './pages/AboutUs'
import ScrollToTop from './components/ScrollToTop'

function App() {

  return (
    <>
    <ToastContainer />
      <BrowserRouter>
          <Navbar />
          <ScrollToTop />
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Blogs/>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/new-blog" element={<CreateBlog />} />
          <Route path="/update-blog/:id" element={<UpdateBlog />} />
          <Route path='/about' element={<AboutUs />}/>

          <Route path="*" element={<h1 className='text-red-400 text-center py-50 uppercase'>404 - Page Not Found</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App

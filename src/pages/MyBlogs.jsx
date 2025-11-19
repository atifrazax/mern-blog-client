import axios from 'axios';
import { useEffect, useState, useCallback } from "react";
import {useNavigate, Link} from "react-router-dom";
import Loader from "../components/Loader";
import Blog from '../components/Blog';

export default function MyBlogs() {
  const navigate = useNavigate();

  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyBlogs = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-blogs`, {
        withCredentials: true,
      });

      const blogs = res.data;
      setMyBlogs(blogs);
    
    } catch (error) {
      console.log(error);
      navigate("/signin", {state: {message: "Your session has expired. Please log in again."}});
    } finally {
      setLoading(false);
    }
  }, [navigate]); 
  useEffect(() => {
    getMyBlogs();
  }, [getMyBlogs]);
  if(loading) return <Loader />;
  return (
    <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col'>
            <h1 className='text-gray text-center py-10'>My Blogs</h1>
            <div className='flex justify-end'>
                <Link to='/new-blog' className='bg-primary hover:bg-secondary hover:text-gray px-4 py-2 rounded'>Create New Blog</Link>
            </div>
        </div>
        {myBlogs ? (
            myBlogs.map((blog) => (
                <Blog key={blog._id} blog={blog} update={true} refetch={getMyBlogs}/>
            ))
        ) : (
        <h2 className='text-center text-gray h-screen pt-40'>No Blog Found</h2>
        )}
    </section>
  )
}

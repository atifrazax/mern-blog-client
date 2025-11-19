import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth.js';
import getCsrfToken from '../utils/getCsrfToken';
import {uploadToCloudinary} from '../utils/uploadToCloudinary.js';
import { toast } from 'react-toastify';

export default function UpdateBlog() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);
  const success = (message) => toast.success(message); // on update blog success message
  const {id} = useParams();

  useEffect(() => {
    if(!user) return navigate("/signin", {state: {message: "Your session has expired. Please log in again."}});
    (async () => {
      const prevBlog = await axios.get(`${import.meta.env.VITE_API_URL}/blog/${id}`, {
                        withCredentials: true,
                        });
                const blog = prevBlog.data;
                setTitle(blog.title);
                setContent(blog.content);
                // console.log(blog);
    })();
  }, [user, navigate, id]);


    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        if (!title || !content) {
          setError("Please Add Title and Content");
          return;
        }
        const csrfToken = await getCsrfToken(); // Get the CSRF token
        // console.log(csrfToken);
        
        let imageUrl, imagePublicId;
        if(file) {
          const res = await uploadToCloudinary(file);
          imageUrl = res.imageUrl;
          imagePublicId = res.imagePublicId;        
          // console.log('Image uploaded',imageUrl, imagePublicId);
        }
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-blog/${id}`, {
          title,
          content,
          image: imageUrl,
          imagePublicId : imagePublicId,
        }, {
          headers: { 'x-csrf-token': csrfToken }, // Send the CSRF token
          withCredentials: true
        });
        // console.log(res.data);
        success(res.data.message);
        navigate("/my-blogs");
      } catch (error) {
        setError(error.response?.data?.message || "Update failed");
      } finally {
        setLoading(false);
      }
    };

  return (
    <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 rounded-2xl'>
        <h1 className="text-center text-gray font-extrabold mb-8">Update Blog</h1>
        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4 py-10 bg-slate-50 p-4 sm:p-10 text-gray'>
            <label htmlFor="title" >Blog Title</label>
                <input type="text" name='title' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title' className='border border-gray-300 p-3 col-span-2'/>
            <label htmlFor="image">Upload Image (Optional)</label>
                <input type="file" name='image' onChange={e=>setFile(e.target.files[0])} accept="image/*" className='border border-gray-300 p-3 col-span-2'/>
            <textarea name="content" value={content} onChange={(e)=>setContent(e.target.value)} placeholder='Blog Content here...' rows='6' className='border p-3 border-gray-300 col-span-2'></textarea>
            {error && <small className='text-red-500! col-span-2'>{error}</small>}

            <button type="submit" disabled={loading} 
                    className='shadow bg-primary hover:bg-secondary hover:text-gray py-2 px-10 rounded-lg bg-gray-custom
                     text-white! hover:bg-red-custom transition-all mt-4 w-fit
                     duration-300 disabled:opacity-50 disabled:cursor-not-allowed'>
                     {loading ? "Updating..." : "Update Blog"}
            </button>
        </form>
    </section>
  )
}

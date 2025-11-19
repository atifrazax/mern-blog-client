import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth.js';
import getCsrfToken from '../utils/getCsrfToken';
import { toast } from 'react-toastify';
import {uploadToCloudinary} from '../utils/uploadToCloudinary.js';

export default function CreateBlog() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const success = (message) => toast.success(message); // create blog success message

  useEffect(() => {
    if(!user) return navigate("/signin", {state: {message: "Your session has expired. Please log in again."}});
  }, [user, navigate]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setUploading(true);
      
      try {
        let imageUrl, imagePublicId;
        if(file) {
          const res = await uploadToCloudinary(file);
          imageUrl = res.imageUrl;
          imagePublicId = res.imagePublicId;        
          // console.log(imageUrl, imagePublicId);
        }
        if (!title || !content) {
          setError("Please Add Title and Content");
          return;
        }
        const csrfToken = await getCsrfToken(); // Get the CSRF token
        // console.log(csrfToken);
        
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/new-blog`, {
          title,
          content,
          image: file ? imageUrl : '',
          imagePublicId : file ? imagePublicId : '',
        }, {
          headers: { 'x-csrf-token': csrfToken }, // Send the CSRF token
          withCredentials: true
        });
        const message = res.data;
        success(message.message);
        setContent('');
        setTitle('');
        setFile('');

        navigate("/my-blogs");
      } catch (error) {
        setError(error.response?.data?.message || "Login failed");
      } finally {
        setUploading(false);
      }
    };

  return (
    <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 rounded-2xl'>
        <h1 className="text-center text-gray font-extrabold mb-8">Create New Blog</h1>
        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4 py-10 bg-slate-50 p-4 sm:p-10 text-gray'>
            <label htmlFor="title" >Blog Title</label>
                <input type="text" name='title' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title' className='border border-gray-300 p-3 col-span-2'/>
            <label htmlFor="file">Upload Image (Optional)</label>
                <input type="file" name='image' accept='image/*' onChange={(e) => setFile(e.target.files[0])} className='border border-gray-300 p-3 col-span-2'/>
            <textarea name="content" value={content} onChange={(e)=>setContent(e.target.value)} placeholder='Blog Content here...' rows='6' className='border p-3 border-gray-300 col-span-2'></textarea>
            {error && <small className='text-red-500! col-span-2'>{error}</small>}

            <button type="submit" disabled={uploading} 
                    className='shadow bg-primary hover:bg-secondary hover:text-gray py-2 px-10 rounded-lg bg-gray-custom
                     text-white! hover:bg-red-custom transition-all mt-4 w-fit
                     duration-300 disabled:opacity-50 disabled:cursor-not-allowed'>
                      {uploading ? "Uploading..." : "Post Blog"}
            </button>
        </form>
    </section>
  )
}

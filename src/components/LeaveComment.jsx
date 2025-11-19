import getCsrfToken from '../utils/getCsrfToken';
import axios from 'axios';
import { useState } from 'react';
import {useAuth} from '../contexts/useAuth.js';
import { toast } from 'react-toastify';
function LeaveComment({blogId}) {
  const message = (data) => toast.success(data.message);
  const {user} = useAuth();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const csrfToken = await getCsrfToken(); // Get the CSRF token

      const res = await axios.put(`${import.meta.env.VITE_API_URL}/comment/${blogId}`,
        { comment }, 
        {
          withCredentials: true,
          headers: { 'x-csrf-token': csrfToken }, // Send the CSRF token
          });

        const blog = res.data;
        setComment('');
        message(blog);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
        }
  if (!user) return <h4 className='text-primary'>Login to leave a comment</h4>
  return (
    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4 py-10 bg-slate-50 p-4 sm:p-10 text-gray'>
        <h5 className='col-span-2'>Leave a comment as {user?.name}</h5>
          <textarea name="comment" placeholder='Leave your good words here...' rows='3' value={comment} onChange={(e) => setComment(e.target.value)} className='border p-3 border-gray-300 col-span-2'></textarea>
          <button type="submit" disabled={loading} 
                    className='shadow bg-primary hover:bg-secondary hover:text-gray py-2 px-10 w-fit rounded-lg bg-gray-custom
                     text-white! hover:bg-red-custom transition-all mt-4
                     duration-300 disabled:opacity-50 disabled:cursor-not-allowed'>Post Comment
          </button>
    </form>
  )
}

export default LeaveComment
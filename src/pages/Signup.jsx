import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import getCsrfToken from '../utils/getCsrfToken.js';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const csrfToken = await getCsrfToken(); // Get the CSRF token

          const res = await axios.post(`${import.meta.env.VITE_API_URL}/register`, { name, email, password }, {
            withCredentials: true,
            headers: { 'x-csrf-token': csrfToken }, // Send the CSRF token
          });
          setName('');
          setEmail('');
          setPassword('');
          setMessage(res.data.message || "Signup successful. Please log in.");
        
        } catch (error) {
          setMessage(error.response?.data?.message || "Signup failed. Please try again");
        } finally {
          setLoading(false);
        }
      };
  return (
    <section>
        <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-5 min-h-screen py-10'>
            <div className='relative grid place-content-center sm:w-1/2 mx-auto bg-white shadow-md sm:shadow-2xl rounded-2xl p-10'>
                <h1 className='text-red-custom mb-15 text-center text-primary'>Sign Up</h1>
                 <form onSubmit={handleSubmit} className='flex flex-col gap-4 *:text-gray'>

                    <input value={name} onChange={e=>setName(e.target.value)} id='name' type="text" placeholder='Your Name' className='shadow py-4 px-10 rounded-lg bg-white'/>

                    <input value={email} onChange={e=>setEmail(e.target.value)} id='email' type="email" placeholder='Your Email' className='shadow py-4 px-10 rounded-lg bg-white'/>

                    <input value={password} onChange={e=>setPassword(e.target.value)} id='password' type="password" placeholder='Your Password' className='shadow py-4 px-10 rounded-lg bg-white'/>
                    
                    {message && <small className='text-red-400!'>{message}</small>}

                    <button type="submit" disabled={loading} 
                    className='shadow bg-primary hover:bg-secondary hover:text-gray py-2 px-10 rounded-lg bg-gray-custom
                     text-white! hover:bg-red-custom transition-all mt-4
                     duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                    '>
                      {loading ? "Signing Up..." : "Sign Up"}
                    </button>

                    <small className='text-center text-gray-400 mt-4'>Already have an account? <Link to="/signin" className='text-primary'>Sign In</Link></small>

                    <span className="animate-[moveAround_8s_ease-in-out_infinite] absolute h-32 w-32 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-10 -z-1"></span>
                 </form>
            </div>
        </div>
    </section>
  )
}

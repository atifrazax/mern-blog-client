import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {useAuth} from "../contexts/useAuth.js";


export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (location.state?.message) {
      setError(location.state.message);
    }
  }, [location.state]);
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/signin`, {
          email,
          password
        }, {
          withCredentials: true
        });
        const data = res.data;

        setUser(data.user);
        navigate("/my-blogs");
      } catch (error) {
        setError(error.response?.data?.message || "Login failed");
      } finally {
        setLoading(false);
      }
    };

  return (
    <section>
        <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-5 min-h-screen'>
            <div className='grid place-content-center sm:w-1/2 mx-auto bg-white shadow-2xl rounded-2xl p-10'>
                <h1 className='text-red-custom mb-15 text-center text-primary'>Sign In</h1>
                 <form onSubmit={handleSubmit} className='flex flex-col gap-4 relative *:text-gray'>

                    <input value={email} onChange={e=>setEmail(e.target.value)} id='email' type="email" placeholder='Your Email' className='shadow py-4 px-10 rounded-lg'/>

                    <input value={password} onChange={e=>setPassword(e.target.value)} id='password' type="password" placeholder='Your Password' className='shadow py-4 px-10 rounded-lg'/>

                    {error && <small className='text-red-400!'>{error}</small>}

                    <button 
                    disabled={loading} 
                    type="submit" 
                    className='shadow bg-primary hover:bg-secondary hover:text-gray py-2 px-10 rounded-lg bg-gray-custom
                     text-white! hover:bg-red-custom transition-all mt-4
                     duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                     '>
                     {loading ? "Signing In..." : "Sign In"}
                     </button>

                    <small className='text-center text-gray-400 mt-4'>Don't have an account? <Link to="/signup" className='text-primary'>Sign Up</Link></small>
                 </form>
            </div>
        </div>
    </section>
  )
}

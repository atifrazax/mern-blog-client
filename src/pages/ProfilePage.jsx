import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import axios from "axios";


export default function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState(''); // backend messages in form
  const [loading, setLoading] = useState(false);
  
  const {user, setUser} = useAuth(); // get user from context
  
  useEffect(() => {
    if(!user) return navigate("/signin", {state: {message: "Your session has expired. Please log in again."}});
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state, navigate, user]);
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      try {
        const res = await axios.patch(`${import.meta.env.VITE_API_URL}/update-profile`, {
          name,
          password
        }, {
          withCredentials: true
        });
        const data = res.data;
        setUser(prev=>({...prev, name: data.name}));
        setMessage(data.message);
        setName('');
        setPassword('');
        // navigate("/profile");
      } catch (error) {
        setMessage(error.message);
        // console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <section>
        <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-15 min-h-screen'>
            <div className='grid place-content-center sm:w-1/2 mx-auto bg-white shadow-2xl rounded-2xl p-10'>
                 <form onSubmit={handleSubmit} className='flex flex-col gap-4 relative *:text-gray'>
                  
                  <div className="flex flex-col items-center gap-4 pb-2">
                    <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${user?.name}`}
                    alt="avatar"
                    className="w-24 h-auto rounded-full"
                    ></img>
                    <span>{user?.email}</span>
                  </div>

                  <input value={name} onChange={e=>setName(e.target.value)} id='name' type="text" placeholder={user?.name} className='shadow py-2 px-10 rounded-lg'/>

                  <input value={password} onChange={e=>setPassword(e.target.value)} id='password' type="password" placeholder="****" className='shadow py-2 px-10 rounded-lg'/>

                  {message && <small className='text-red-400!'>{message}</small>}

                  <button 
                  disabled={loading} 
                  type="submit" 
                  className='shadow bg-primary hover:bg-secondary hover:text-gray py-2 px-10 rounded-lg bg-gray-custom
                    text-white! hover:bg-red-custom transition-all mt-2
                    duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                    '>{loading ? "Updating..." : "Update Profile"}
                    </button>
                 </form>
            </div>
        </div>
    </section>
  )
}

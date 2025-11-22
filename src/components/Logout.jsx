import axios from "axios";
import { toast } from "react-toastify";

export const logout = async (setUser, navigate) => {
  const message = "Successfully logged out";
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/logout`, 
      {}, 
      { withCredentials: true });
    setUser(null);
    navigate("/", {replace: true});
    toast.info(message);

  } catch (error) {
    console.log(error);
  }
};

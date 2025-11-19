import axios from "axios";
import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { toast } from "react-toastify";

function LikeBtn({blog}) {
    const { user } = useAuth();
    const [isLiked, setIsLiked] = useState(blog?.likes?.includes(user?.id));
    // console.log(isLiked);
    const [likeCount, setLikeCount] = useState(blog?.likeCount || 0);
    const [loading, setLoading] = useState(false);
    const message = (data) => toast.error(data);
    const handleLikeBtn = async () => {
        if (!user) return message("Love it? Please login first");
            try {
                setLoading(true);
                setIsLiked(!isLiked);
                setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
                await axios.put(`${import.meta.env.VITE_API_URL}/like/${blog._id}`, {}, {
                    withCredentials: true
                });
            } catch (error) {
                setIsLiked(isLiked);
                setLikeCount(prev => isLiked ? prev + 1 : prev - 1);
                console.log(error);
                // message(error.response?.data?.message || "Like failed");
            } finally {
                setLoading(false);
            }
    };
  return (
    <button
    className="flex items-center cursor-pointer"
    onClick={handleLikeBtn}
    disabled={loading}
    >
    <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 me-2 hover:scale-135 transition-all duration-200"
        fill={isLiked ? "red" : "none"}
        stroke={isLiked ? "red" : "black"}
        strokeWidth="2"
    >
        <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
        />
    </svg>

    {likeCount}
    </button>
  )
}

export default LikeBtn
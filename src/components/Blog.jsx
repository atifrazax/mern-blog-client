import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import person from '../assets/icons/person.svg'
import comment from '../assets/icons/comment.svg'
import calender from '../assets/icons/calender.svg'
import LikeBtn from "./LikeBtn";

export default function Blog({blog, update, refetch}) {
  const success = () => toast.info('Blog deleted successfully!'); // delete success message
  const errorMsg = (message) => toast.error(message);

  const dialogId = `confirmDialog-${blog._id}`; // dialog id
  const openDialog = () => document.getElementById(dialogId).showModal();
    const closeDialog = () => document.getElementById(dialogId).close();
    const confirm = () => {
      (async () => {
      try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/delete-blog/${blog._id}`, {
          withCredentials: true,
        });
        if(refetch) refetch();
        success();
      } catch (error) {
        errorMsg(error.response?.data?.message || "Delete failed");
      }
    })();
      closeDialog();
    };
  return (
    <>
      <div className=" grid grid-cols-1 sm:grid-cols-[1fr_3fr] p-2 animate border-b border-gray/20 sm:gap-x-6 py-8">
          <img src={blog.image} alt="blog post image" loading="lazy" className="md:h-40 w-auto rounded-lg object-cover mb-4" />
          <div className="flex flex-col justify-between mt-0 sm:mt-0">
            <Link to={ `/blog/${blog._id}`}>
            <h4 className="mb-2 text-primary hover:text-secondary transition duration-300 line-clamp-2 sm:line-clamp-1">{blog.title}</h4>
            <p className="text-gray-700 mb-4 line-clamp-3">{blog.content}</p>
            </Link>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 my-2">
                  <LikeBtn blog={blog} />
                  <small className="flex"><img src={person} className="w-4 h-auto me-2" alt="" aria-hidden={true} />{blog?.author?.name}</small>
                  <small className="flex"><img src={calender} className="w-4 h-auto me-2" alt="" aria-hidden={true} />{blog?.createdAt?.slice(0, 10)}</small>
                  <small className="flex"><img src={comment} className="w-4 h-auto me-2" alt="" aria-hidden={true} />{blog?.comments?.length || 0}</small>
                  {update && <Link to={`/update-blog/${blog._id}`} className='border-b-2 duration-300 border-transparent hover:border-primary'>Update</Link>}
                  {update && <Link onClick={openDialog} className='border-b-2 duration-300 border-transparent hover:border-primary'>Delete</Link>}
              </div>
          </div>

      </div>
      {/* dialoge div */}
      <div className="bg-gray flex flex-col justify-center items-center inset-0">
        <dialog
          id={dialogId}
          className="backdrop:bg-black/50 p-6 rounded-lg w-80"
        >
          <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>
          <p className="text-gray-600">This action cannot be undone.</p>

          <div className="flex justify-end gap-3 mt-5">
            <button
              onClick={closeDialog}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={confirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Yes, Delete
            </button>
          </div>
        </dialog>
      </div>
      </>
  )
}

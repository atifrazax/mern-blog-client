
import Aside from "../components/Aside"
import { useParams } from "react-router-dom";
import Socials from "../components/Socials";
import Comments from "../components/Comments";
import LeaveComment from "../components/LeaveComment";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import person from '../assets/icons/person.svg'
import comment from '../assets/icons/comment.svg'
import calender from '../assets/icons/calender.svg'
import LikeBtn from "../components/LikeBtn";

function SingleBlog() {
    const {id} = useParams();
    const [blog, setBlog] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Window.scroll(0,0)
        (async ()=>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/${id}`, {
                withCredentials: true,
                });

        const blog = res.data;
        setBlog(blog);
        // console.log(blog);
        setLoading(false)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    if(loading) return <Loader />
  return (
    <>
    {/* <Loader /> */}
    <section className="bg-white py-10">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Outer flex */}
                <div className="grid grid-cols-[4fr_2fr] gap-x-8">
                    
                    {/* BLOGS SECTION */}
                    <div className="w-full">
                        {blog ? (
                            <div className=" sm:flex-col bg-white p-4 ">
                                <img src={blog?.image} alt="blog post" loading="lazy" className="md:h-80 w-full rounded-lg object-cover mb-4" />
                                <div className="flex flex-col sm:ml-4 mt-4 sm:mt-0">
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 my-2">
                                        <LikeBtn blog={blog} />
                                        <small className="flex"><img src={person} className="w-4 h-auto me-2" alt="" aria-hidden={true} />{blog?.author?.name}</small>
                                        <small className="flex"><img src={calender} className="w-4 h-auto me-2" alt="" aria-hidden={true} />{blog?.createdAt?.slice(0, 10)}</small>
                                        <small className="flex"><img src={comment} className="w-4 h-auto me-2" alt="" aria-hidden={true} />{blog?.comments?.length || 0}</small>
                                    </div>
                                    <h2 className=" mb-4 text-primary">{blog?.title}</h2>
                                    <article className="text-gray mb-4">
                                        {blog.content.split("\n").map((line, i) => (
                                            <span key={i}>
                                            {line}
                                            <br />
                                            </span>
                                        ))}
                                    </article>
                                    <div className="flex bg-gray/90 border-t border-b border-primary py-6 rounded mt-6">
                                      <span className="me-4 ms-6">Share Now:</span>
                                      <span><Socials /></span>
                                    </div>
                                    <h3 className="mt-4">{blog?.comments?.length || 0} Comments</h3>

                                    {blog?.comments?.map((comment) => (
                                        <Comments key={comment?._id} comment={comment} />
                                    ))}

                                    <LeaveComment blogId={blog?._id}/>
                                    
                                </div>
                            </div>
                        ) : (
                            <h1 className='flex justify-center text-black h-screen'>Blog Not Found</h1>
                        )}
                    </div>
                    <div>
                        {/* ASIDE SECTION */}
                        {/* <Aside blogs={blogs}/> */}
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default SingleBlog

import person from '../assets/icons/person.svg'
import heart from '../assets/icons/heart.svg'
import { Link } from 'react-router-dom'
import React from 'react'
function Recent({blogs}) {
  return (
    <>
    {/* TOP LIKED BLOGS SECTION */}
        <div className="space-y-6">
        <h5 className="text-3xl  border-b border-gray-400 pb-4">Top Loved</h5>
            {blogs.filter((_, index) => index < 3).map((blog) => (
                <Link to={`/blog/${blog?._id}`} key={blog?._id} className="flex flex-row">
                    <img src={blog?.image} alt="blog post" loading='lazy' className="w-1/3 h-1/3 rounded-lg me-4 object-cover" />
                    <div className="flex flex-col">
                        <h5 className=" text-sm sm:text-sm mb-2 line-clamp-2">{blog?.title}</h5>
                        <div className="flex flex-wrap gap-2 text-sm mb-2">
                            <small className="flex"><img src={heart} className="w-4 h-auto me-2 invert" alt="" aria-hidden={true} />{blog?.likeCount || 0}</small>
                            <small className="flex"><img src={person} className="w-4 h-auto me-2 invert" alt="" aria-hidden={true} />{blog?.author?.name}</small>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </>
  )
}

export default React.memo(Recent)
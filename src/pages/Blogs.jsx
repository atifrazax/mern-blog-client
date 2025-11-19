import { useEffect, useState } from "react";
import searchSvg from '../assets/icons/search.svg'
import axios from "axios";
import Aside from "../components/Aside"
import Blog from "../components/Blog";
import Loader from "../components/Loader";
import person from '../assets/icons/person.svg'
import calender from '../assets/icons/calender.svg'
import LikeBtn from "../components/LikeBtn";
import { Link } from "react-router-dom";

export default function Blogs() {
const [loading, setLoading] = useState(true);
const [blogs, setBlogs] = useState([]);
const [paginate, setPaginate] = useState([]);
const [search, setSearch] = useState("");
const [debounceSearch, setDebounceSearch] = useState("");
const [date, setDate] = useState("");
const [topLiked, setTopLiked] = useState([]);

useEffect(() => {
    (async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/top-liked`);
            setTopLiked(res.data);
        } catch (error) {
            console.log(error);
        }
    })();
},[setTopLiked])

useEffect(() => {
  const timer = setTimeout(() => {
    setDebounceSearch(search);

  },1000)
  return () => clearTimeout(timer);
}, [search]);

  useEffect(() => {
    (async () => {
      try {

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`, {
          params: {
            search: debounceSearch,
            date,
            page: paginate.page,
          },
        }, {
          withCredentials: true,
        });

        const blogs = res.data.docs;
        setBlogs(blogs);

        setPaginate({
          page:res.data.page, 
          next:res.data.hasNextPage, 
          prev:res.data.hasPrevPage, 
          totalPages:res.data.totalPages});
      
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [debounceSearch, date, paginate.page]);

  if(loading) return <Loader />;
    return (
      <>
      <section className=" py-10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Search blog & filter by Date */}
            <div className="w-full flex justify-end mb-6 space-x-2 sm:space-x-4">
              <div className="relative">
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="border rounded border-gray-300 text-gray-700 py-2 px-4 pr-10"
                />
                <span className="absolute inset-y-0 right-12 flex items-center">
                  <img src={searchSvg} alt="search" className="h-6 w-6" />
                </span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="absolute inset-y-0 right-0 w-9 border rounded border-gray-300 text-gray-700 px-2"
              />
              </div>
            </div>

            {/* Outer flex */}
            <div className="grid sm:grid-cols-[4fr_2fr] grid-cols-1 gap-8">
              <div>
                  {/* Feature Blog */}
                  {!search && !date && (
                  <div className="grid grid-cols-1 text-gray pb-10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 space-y-8 py-6 gap-x-1">
                          <h1 className="line-clamp-2 text-7xl uppercase ">Blog of the day</h1>
                          <div className="flex flex-col justify-between">
                            <Link to={ `/blog/${topLiked[0]?._id}`}>
                            <h4 className="mb-2 text-primary hover:text-secondary transition duration-300 line-clamp-2">{topLiked[0]?.title}</h4>
                              <p className="text-gray-700 mb-4 line-clamp-3 sm:line-clamp-3">{topLiked[0]?.content}</p>
                              </Link>
                              <div className="flex flex-wrap gap-4 items-center text-gray-600 my-2">
                                  <LikeBtn blog={topLiked[0]} />
                                  <small className="flex"><img src={person} className="w-4 h-auto me-2" alt="" aria-hidden={true} />{topLiked[0]?.author?.name}</small>
                                  <small className="flex"><img src={calender} className="w-4 h-auto me-2" alt="" aria-hidden={true} />{topLiked[0]?.createdAt?.slice(0, 10)}</small>
                              </div>
                          </div>
                      </div>
                      <img src="/default.webp" alt="" className="h-[50vh] w-full object-cover rounded"/>
                  </div>
                  )}

                  {/* Filter Display  */}
                  <div className="flex text-gray pb-6 sm:pb-10">
                    {(search || date) && (
                      <h4 className="me-4">Filter:</h4>
                    )}
                    {search  && (
                            <button onClick={()=>setSearch("")} className="line-clamp-1 me-2 bg-red-100 px-3 rounded-2xl hover:bg-red-300">{search} <span className="text-red-600 ms-1">X</span></button>
                          )}
                    {date  && (
                      <button onClick={()=>setDate("")} className="line-clamp-1 bg-red-100 px-3 rounded-2xl hover:bg-red-300">{date} <span className="text-red-600 ms-1">X</span></button>
                    )}
                  </div>
                  
                  {/* BLOGS SECTION */}
                  {blogs.length > 0 ? (

                    blogs.map((blog) => (
                        <Blog key={blog._id} blog={blog}/>
                    ))

                  ) : (
                    <h1 className="text-gray min-h-screen flex text-center justify-center">No Blog Found</h1>
                  )}
                  {/* /BLOGS SECTION */}

                  {/* PAGINATION */}
                  <div className="flex justify-center gap-2 items-center text-white p-4">
                    <button className="bg-primary px-2 rounded-lg disabled:bg-primary/50" disabled={!paginate.prev} onClick={()=>setPaginate({page: paginate.page-1})}>&larr;</button>
                    <button className="bg-primary px-2 rounded-lg disabled:bg-primary/50" disabled={paginate.page===1} onClick={()=>setPaginate({page: 1})}>First</button>
                    <button className="text-gray bg-gray/10 rounded-lg px-2" onClick={()=>setPaginate({page: paginate.page-1})}>{paginate.page > 1 ? (paginate.page-1) : ('')}</button>
                    <button className="text-gray bg-secondary/50 rounded-lg px-2">{paginate.page}</button>
                    <button className="text-gray bg-gray/10 rounded-lg px-2" onClick={()=>setPaginate({page: paginate.page+1})}>{paginate.page < paginate.totalPages ? paginate.page+1 : ''}</button>
                    <button className="bg-primary px-2 rounded-lg disabled:bg-primary/50" disabled={paginate.page===paginate.totalPages} onClick={()=>setPaginate({page: paginate.totalPages})}>Last</button>
                    <button className="bg-primary px-2 rounded-lg disabled:bg-primary/50" disabled={!paginate.next} onClick={()=>setPaginate({page: paginate.page+1})}>&rarr;</button>
                  </div>
                  {/* /PAGINATION */}
              </div>
              <div>
                <Aside blogs={topLiked}/> // ASIDE SECTION
              </div>
            </div>
          </div>
      </section>
      </>
    )
}
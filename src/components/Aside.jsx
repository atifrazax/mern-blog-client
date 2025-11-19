import { Link } from "react-router-dom"
import Socials from "./Socials"
// import search from '../assets/icons/search.svg'
import Recent from "./Recent"

function Aside({blogs}) {
  return (
    <aside className="w-full bg-gray/90 rounded p-8">
            {/* <div className="relative w-full flex flex-col mb-16">
                <input type="search" placeholder="Search..." className="border rounded border-gray-200 py-3 px-4"/>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <img src={search} alt="" aria-hidden="true" className="h-6 w-6"/>
                </span>
            </div> */}
            <div className="relative w-full flex flex-col mb-16">
                <h2 className=" text-3xl  border-b pb-4">Follow Us</h2>
                <Socials className='mt-4'/>
            </div>
            <div className="flex flex-col space-y-6 mb-26">
                <h2 className=" text-3xl  border-b  pb-4">Categories</h2>
                <ul className="flex flex-col">
                    <li className="flex justify-between py-3 border-b border-light">
                        <Link to="/">Technology</Link><span className="text-gray-400">(15)</span>
                    </li>
                    <li className="flex justify-between py-3 border-b border-light">
                        <Link to="/">Cyber Security</Link><span className="text-gray-400">(09)</span>
                    </li>
                    <li className="flex justify-between py-3 border-b border-light">
                        <Link to="/">Entertainment</Link><span className="text-gray-400">(17)</span>
                    </li>
                    <li className="flex justify-between py-3 border-b border-light">
                        <Link to="/">Daram</Link><span className="text-gray-400">(05)</span>
                    </li>
                </ul>
            </div>
            <Recent blogs={blogs} />
            {/* ----Tags Cloud----- */}
            <div className="flex flex-col space-y-8 my-26">
                <h4 className=" text-3xl  border-b  pb-4">Popular Tags</h4>
                <div className="flex flex-wrap space-y-2 **:text-white">
                    <Link to="/" ><button className="bg-gray px-2 py-1 me-2 text-black/60">Internet</button></Link>
                    <Link to="/" ><button className="bg-gray px-2 py-1 me-2 text-black/60">Freelancing</button></Link>
                    <Link to="/" ><button className="bg-gray px-2 py-1 me-2 text-black/60">Episodes</button></Link>
                    <Link to="/" ><button className="bg-gray px-2 py-1 me-2 text-black/60">Dairy</button></Link>
                    <Link to="/" ><button className="bg-gray px-2 py-1 me-2 text-black/60">Risk Management</button></Link>
                    <Link to="/" ><button className="bg-gray px-2 py-1 me-2 text-black/60">Birds</button></Link>
                </div>
                
            </div>
            {/* -----Paragrap------ */}
            <div className="flex flex-col space-y-6 my-26">
                <h4 className=" text-3xl  border-b  pb-4">Paragraph</h4>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui est cum quos veniam rem iure exercitationem, vel distinctio iusto illo.</p>
                
            </div>
        </aside>
  )
}

export default Aside
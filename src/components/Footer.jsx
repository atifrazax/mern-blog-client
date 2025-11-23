import { Link } from 'react-router-dom'
import Socials from './Socials'

function Footer() {
  return (
    <>
    <footer className='bg-gray'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col py-20 justify-center items-center'>
            <div className='flex space-x-20 flex-col sm:flex-row space-y-16'>
                <div className='flex-1 space-y-4'>
                    <h4 className='mb-6  border-b border-gray-400 pb-4'>Why You Are Here?</h4>
                    <article>
                        Be here to read, write, or explore, we strive to make your 
                        experience smooth and engaging. Join us in building a community driven by 
                        curiosity and learning.
                    </article>
                </div>
                <div className='flex-1 flex-col '>
                    <h4 className='mb-6  border-b border-gray-400 pb-4'>Contact Info</h4>
                    <div className='mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" inline me-2 icon icon-tabler icons-tabler-outline icon-tabler-device-mobile"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z" /><path d="M11 4h2" /><path d="M12 17v.01" /></svg>
                        <a href='tel:+123456789' >+1 234 56789</a>
                    </div>
                    <div className='mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" inline me-2 icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
                        <a href='mailto:name@domain.com'>name@domain.com</a>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" inline me-2 icon icon-tabler icons-tabler-outline icon-tabler-map-pins"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.828 9.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829z" /><path d="M8 7l0 .01" /><path d="M18.828 17.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829z" /><path d="M16 15l0 .01" /></svg>
                        <address className='inline'>123 Fake Los Angeles, USA</address>
                    </div>
                    <Socials className={"mt-6"}/>
                </div>
                <div className='flex-1'>
                    <h4 className='mb-6 border-b border-gray-400 pb-4'>Links</h4>
                    <Link to="/"><p className='mb-4'>Blogs</p></Link>
                    <Link to="/about"><p className='mb-4'>About Us</p></Link>
                    <Link to="/contact"><p className='mb-4'>Contact Us</p></Link>
                </div>
            </div>
            <div className='flex flex-col text-center w-full sm:w-1/2 mt-10  '>
                <h4 className='capitalize '>Try our newsletters</h4>
                <form className='relative mt-4 w-full flex justify-center items-center'>
                    <input type="email" placeholder='Enter Email' className=' w-full bg-gray-900 border border-gray-800 p-3 '/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 inline me-2  icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
                </form>
            </div>
        </div>
        <div className="bg-gray-900 py-8">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10 justify-center text-center">
                <span className='text-sm'>© {new Date().getFullYear()} | Made with ❤️ by <a href="https://atifraza.is-great.net/" className="font-bold uppercase" target="_blank" >Atif</a></span>
            </div>
        </div>
    </footer>
    </>
  )
}

export default Footer
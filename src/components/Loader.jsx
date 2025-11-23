import loader from '../assets/loader.svg';

export default function Loader() {
  return (
    <div className='fixed flex justify-center items-center inset-0 bg-[#fff] overflow-hidden touch-none select-none z-10'>
        <img src={loader} alt="loader" className="loader h-30 w-auto" />
    </div>
  )
}

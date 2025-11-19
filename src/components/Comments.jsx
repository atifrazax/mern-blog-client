
function Comments({comment}) {
  return (
      <>
    <div className='grid grid-cols-[auto_1fr] gap-x-4 py-6 text-gray border-b border-gray/20'>
        <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${comment?.fan?.name}`} alt="Profile" className="w-12 h-auto rounded-full " />
        <div>
            <div key={comment._id} className='flex flex-col'>
                <h5>{comment?.fan?.name}</h5>
                <p className='my-4'>{comment.comment}</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Comments
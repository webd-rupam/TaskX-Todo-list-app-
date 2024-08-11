import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-black w-full text-white py-2 sticky top-0'>
        <div className="logo flex">
            <span className='font-bold text-yellow-400 cursor-not-allowed text-xl mx-9'>Task X</span>
        </div>
        {/* end of logo div */}

        <ul className='flex gap-8 mx-9'>
          <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
          <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>

    </nav>
  )
}

export default Navbar

import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Root() {
  return (
    <>
    <header className=' bg-red-500 '>
        <div className='  container mx-auto  '>
            <nav className='flex h-16 justify-between items-center'>
                <h1 className='text-xl text-white font-semibold tracking-wide'>Admin</h1>
                <div className=''>
                    <ul className='flex gap-20 text-white font-medium tracking-wide'>
                        <Link to={'/'}>
                        <li>
                            Home 
                        </li>
                        </Link>
                        <Link to={"/new"}>
                        <li>
                            Add Book
                        </li>
                        </Link>
                        <li>
                            Login
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
    <Outlet />
    <footer></footer>
    </>
  )
}

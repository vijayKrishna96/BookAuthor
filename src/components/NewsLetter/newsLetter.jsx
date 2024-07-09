import React from 'react'
import '../NewsLetter/newsLetter.css'

export default function NewsLetter() {
  return (
    <div className='newsletter'>
        <form action="">
            <h3>subscribe for latest updates</h3>
            <input type="email" placeholder='enter your email'
            className='box'/>
            <input type="submit" value='subscribe' 
            className='bg-blue-500 hover:bg-blue-600 text-xl text-white px-20 py-4 mt-5 rounded-md inline-block'/>
        </form>
    </div>
  )
}

import React from 'react'
import {AiOutlineFileSearch} from 'react-icons/ai'
import {IoMdContacts} from 'react-icons/io'
import { useUserAuth } from '../context/UserAuthContext'
import '../styles/navbar.css'
const Navbar = (props) => {
  const { logOut, user } = useUserAuth();
  return (
    <div className='navbar'>
      <div className='home-link'>
        <IoMdContacts color='white' size={60} />
      </div>

        <div className='search-bar'>

          <div  className='input-ctr'>
          <AiOutlineFileSearch color='white' size={30} />
          <input className='input' placeholder='Search' />
          </div>

        </div>

        <div className='user-info'>
          <label className='user-id'>
            {user.email}
          </label>
          <div className='logout'>
            <button className='btn' onClick={async()=>await logOut()}>Log Out</button>
          </div>
        </div>

    </div>
  )
}

export default Navbar
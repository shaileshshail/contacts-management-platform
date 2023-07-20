import React from 'react'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { BiMenu } from 'react-icons/bi'
import { IoMdContacts } from 'react-icons/io'
import { useUserAuth } from '../context/UserAuthContext'
import '../styles/navbar.css'

const Navbar = () => {
  const { logOut, user } = useUserAuth();
  console.log(user.user)
  return (
    <nav className='navbar'>

      <div className='nav-icon'>
        <BiMenu className='menu-icon' size={40}/>
        <a href='/home'>
          <IoMdContacts className='home-icon'  size={40}/>
          Contacts
        </a>
      </div>


      <div className='search-bar'>
          <input className='input' placeholder='Search' />
      </div>

      <div className='user-card'>
        <label>{user.user.firstname}</label>
          <button  onClick={()=>logOut()} className='pointer'> 
          <img src={user.user.picture} />
          </button>

        </div>
  
        
    </nav>
  )
}

export default Navbar
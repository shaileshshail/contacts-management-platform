
import {IoMdContacts} from 'react-icons/io'
import {AiOutlineFileSearch} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import '../styles/landing.css'
export const Landingnav = (props) => {
  const navigate=useNavigate();
    return (
        <div className='l-navbar'>
          <div className='l-icon'>
            <IoMdContacts color='white' size={70} />
          </div>    
            <div className='l-ctr'>
              <div className='l-signin'>
                <button className='l-btn' onClick={()=>{navigate('/login')}}>Sign In</button>
              </div>
              <div className='l-signup'>
                <button className='l-btn' onClick={()=>{navigate('/signup')}}>Sign Up</button>
              </div>
            </div>
    
        </div>
      )
}


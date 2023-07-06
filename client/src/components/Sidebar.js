import React from 'react'
import '../styles/sidebar.css'
import {BsPlusSquare} from 'react-icons/bs'
import {MdContacts} from 'react-icons/md'
import {IoIosAddCircle} from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
const Sidebar = (props) => {
    const navigate=useNavigate();
    return (
        <div className='sidebar'>
            <ul className='sidebar-list'>
                        <li key={"key"} onClick={()=>navigate('/create')} className='sidebar-row'>
                            <div className='icon'><BsPlusSquare /></div>
                            <div className='title'>Create Contact</div>
                        </li>
                        <li key={"1"} onClick={()=>navigate('/home')} className='sidebar-row'>
                            <div className='icon'><MdContacts /></div>
                            <div className='title'>Contacts</div>
                        </li>
                        <li key={"2"} onClick={()=>navigate('/frequent')} className='sidebar-row'>
                            <div className='icon'><IoIosAddCircle /></div>
                            <div className='title'>Frequent Contacts</div>
                        </li>
            </ul>
        </div>
    )
}

export default Sidebar
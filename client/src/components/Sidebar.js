import React from 'react'
import '../styles/sidebar.css'
import { BsPlusSquare } from 'react-icons/bs'
import { MdContacts } from 'react-icons/md'
import { IoIosAddCircle } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
const Sidebar = (props) => {
    const navigate = useNavigate();
    return (
        <div className='sidebar'>
            <ul >
                <li key={"0"} onClick={() => navigate('/create')} className='sidebar-row'>
                    <div className='icon'><BsPlusSquare /></div>
                    <label >Create Contact</label>
                </li>
                <li key={"1"} onClick={() => navigate('/home')} className='sidebar-row'>
                    <div className='icon'><MdContacts /></div>
                    <label >Contacts</label>
                </li>
                <li key={"2"} onClick={() => navigate('/frequent')} className='sidebar-row'>
                    <div className='icon'><IoIosAddCircle /></div>
                    <label >Frequent Contacts</label>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar

/*

.sidebar-list{
    height: 93%;

    padding: 0;
    width: 100%;

}

.sidebar-list .sidebar-row{
    width: 100%;
    height: 7vh;
    list-style-type: none;
    margin: 0;
    display: flex;
    flex-direction: row;
    color: aliceblue;
    justify-content: center;
    align-items: center;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

}
.sidebar-list .sidebar-row:hover{
    cursor: pointer;
    background-color: #293846;
}

.icon{
    flex: 30%;
    display: grid;
    place-items: center;

}
.title{
    flex: 70%;
}*/
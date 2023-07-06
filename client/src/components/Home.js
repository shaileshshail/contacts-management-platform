import { useEffect, useState } from 'react'
import { useUserAuth } from '../context/UserAuthContext'
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/contacts/useFetch';
import useModify from '../hooks/contacts/useModify';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../styles/home.css'
import CreateContact from './CreateContact';
import FrequentContacts from '../components/FrequentContacts'
import EditContacts from './EditContacts';
import ContactsTable from './ContactsTable';
export const Home = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const [forceUpdate, setForceUpdate] = useState(false)




  return (
    <div className='home'>
      <Navbar />
      <div className='home-disp'>
        <Sidebar  />

                <ContactsTable
 
                 setForceUpdate={setForceUpdate}
                 forceUpdate={forceUpdate}
                />

      </div>
    </div>
  )
}

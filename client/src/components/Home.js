import {  useState } from 'react'
import { useUserAuth } from '../context/UserAuthContext'

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../styles/home.css'

import ContactsTable from './ContactsTable';
export const Home = () => {
  const [forceUpdate, setForceUpdate] = useState(false)




  return (
    <>
      <Navbar />
      <Sidebar />

      <div className='content home'>
          <ContactsTable

            setForceUpdate={setForceUpdate}
            forceUpdate={forceUpdate}
          />
      </div>
    </>

  )
}

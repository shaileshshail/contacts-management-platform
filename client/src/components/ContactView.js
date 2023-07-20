import { useParams,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import useModify from "../hooks/contacts/useModify";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import {MdOutlineMailOutline} from 'react-icons/md';
import {BsFillTelephoneFill} from 'react-icons/bs';
import {PiCakeFill} from 'react-icons/pi'
const ContactView = () => {
  const {id} = useParams();
  const navigate =useNavigate();
  const { getOne } = useModify();

  const [contact, setcontact] = useState(null);
  const getContact = async () => {
    const data = await getOne(id);
    console.log(data)
    setcontact(data);

  }
  useEffect(() => {
    getContact();
  }, [])

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content view" >
      <div className="upper">
        <img src="https://picsum.photos/id/237/200/300" />
        <div className="name">
          <label> {contact?.firstname}</label>
          <label> {contact?.lastname}</label>
        </div>
        <div className="btn">
        <button onClick={()=>navigate('/edit/'+id)}>Edit</button>

        </div>

      </div>
      <div className="lower">
        <h3>Contact Details :</h3>
        <div className="group">
          <MdOutlineMailOutline size={25} />
          <label>{contact?.email}</label>
        </div>
        <div className="group">
          <BsFillTelephoneFill size={25} />
          <label>{contact?.phone}</label>
        </div>
        <div className="group">
          <PiCakeFill size={25} />
          <label>15/06/2008</label>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default ContactView
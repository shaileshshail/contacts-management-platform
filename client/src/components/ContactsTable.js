import useModify from '../hooks/contacts/useModify';
import useFetch from '../hooks/contacts/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ContactsTable = (props) => {
    const { data, loading, error } = useFetch(props.forceUpdate);
    const {deleteContact}=useModify();
    const navigate =useNavigate();
    console.log(data)
    if (loading) return <h1>Loading ...</h1>;
    if (error) console.log(error);
  

    
    const handleDelete=async(id)=>{
        await deleteContact(id);
        props.setForceUpdate(!props.forceUpdate);
        console.log(id)
      }

  return (
    <div className='content'  >
              {data[0]?.contactlist?.length==0 ? (
                <div>
                  <h1>No contacts yet</h1>
                  <button onClick={()=>navigate('/create')}>Create Contact</button>
                  <button>Import Contacts</button>
                </div>
              )
                :
                (
                  <div>
                    <table>
                    <thead>
                      <tr className='contact-title'>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                      </tr>
                      </thead>
                      <tbody>
                      {data[0]?.contactlist?.map((element) => {
                      return (
                        <tr className='element' key={element._id} onClick={()=>navigate('/view/'+element._id)}>
                          <td>{element.firstname}</td>
                          <td>{element.email}</td>
                          <td>{element.phone}</td>
                          <td><button onClick={()=>navigate('/edit/'+element._id)}>Edit</button></td>
                          <td><button onClick={()=>{handleDelete(element._id)}}>Delete</button></td>
                        </tr>
                      )
                    })}
                    </tbody>
                    </table>
                  </div>
                )}
            </div>
  )
}

export default ContactsTable
import useModify from '../hooks/contacts/useModify';
import useFetch from '../hooks/contacts/useFetch';
import { useNavigate } from 'react-router-dom';
import {BiEditAlt} from 'react-icons/bi'
import {MdOutlineDeleteForever} from 'react-icons/md'
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
    <div className='table'  >
              {data[0]?.contactlist?.length==0 ? (
                <div>
                  <h1>No contacts yet</h1>
                  <button onClick={()=>navigate('/create')}>Create Contact</button>
                  <button>Import Contacts</button>
                </div>
              )
                :
                (
                  <div className='fixTableHead'>
                    <table>
                    <thead >
                      <tr className='contact-title'>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Modify</th>
                      </tr>
                      </thead>
                      <tbody>
                      {data[0]?.contactlist?.map((element) => {
                      return (
                        <tr className='element' key={element._id} >
                          <td><input type='checkbox'/></td>
                          <td className='val' onClick={()=>navigate('/view/'+element._id)}>{element.firstname}</td>
                          <td className='val' onClick={()=>navigate('/view/'+element._id)}>{element.email}</td>
                          <td className='val' onClick={()=>navigate('/view/'+element._id)}>{element.phone}</td>
                          <td><button onClick={()=>navigate('/edit/'+element._id)}><BiEditAlt /></button>
                          <button onClick={()=>{handleDelete(element._id)}}><MdOutlineDeleteForever/></button></td>
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
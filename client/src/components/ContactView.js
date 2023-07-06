import { useParams,useNavigate } from "react-router-dom";

const ContactView = () => {
  const {id} = useParams();
  const navigate =useNavigate();
  return (
    <div>
      <div>ContactView</div>
      <button onClick={()=>navigate('/edit/'+id)}>Edit</button>
    </div>
  )
}

export default ContactView
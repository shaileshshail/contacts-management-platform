import { useParams } from "react-router-dom"
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Sidebar from './Sidebar';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { IoMdArrowRoundBack } from 'react-icons/io'

import useModify from "../hooks/contacts/useModify";
import { useEffect, useState } from "react";
const EditContacts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOne, updateOne } = useModify();
  const schema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string(),
    email: yup.string().email(),
    phone: yup.string().required(),
  });
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const [contact, setcontact] = useState(null);
  const getContact = async () => {
    const data = await getOne(id);
    console.log(data)
    setcontact(data);
    setValue('firstname', data?.firstname);
    setValue('lastname', data?.lastname);
    setValue('email', data?.email);
    setValue('phone', data?.phone);
  }
  useEffect(() => {
    getContact();
  }, [])

  const onSubmit = async (form, e) => {
    e.preventDefault();//prevent page refresh on submit
    form._id = id; //adding id to form from param
    console.log(form)
    await updateOne(form);
    navigate('/view/' + id);
  }
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content edit">
      <div className="upper">
        <img src="https://picsum.photos/id/237/200/300" />
        <div className="name">
          <label> {contact?.firstname}</label>
          <label> {contact?.lastname}</label>
        </div>
        <div className="btn">
          <button type="submit" form="editform" >Save</button>
        </div>
      </div>
      <div className="lower">
          <form id='editform' onSubmit={handleSubmit(onSubmit)} >
            <div className="form-group">
              <label>
                First Name
              </label>
              <input placeholder='John' {...register("firstname")} />
              {errors.username?.message}
            </div>
            <div className="form-group">
              <label>
                First Name
              </label>
              <input placeholder='Snow' {...register("lastname")} />
              {errors.username?.message}
            </div>
            <div className="form-group">
              <label>
                Email
              </label>
              <input placeholder='example@email.com' {...register("email")} />
              {errors.email?.message}
            </div>
            <div className="form-group">
              <label>
                Phone
              </label>
              <input placeholder='987654321' {...register("phone")} />
              {errors.password?.message}
            </div>
          </form>
      </div>
      </div>
    </>
  )
}

export default EditContacts

/**
  <div>
          <button onClick={() => navigate('/home')}><IoMdArrowRoundBack size={30} /></button>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div>
              <label>
                First Name
              </label>
              <input placeholder='John' {...register("firstname")} />
              {errors.username?.message}
            </div>
            <div>
              <label>
                First Name
              </label>
              <input placeholder='Snow' {...register("lastname")} />
              {errors.username?.message}
            </div>
            <div>
              <label>
                Email
              </label>
              <input placeholder='example@email.com' {...register("email")} />
              {errors.email?.message}

            </div>
            <div>
              <label>
                Phone
              </label>
              <input placeholder='987654321' {...register("phone")} />
              {errors.password?.message}
            </div>
            <button >Save</button>

          </form>
        </div>
 
 */
import Navbar from './Navbar';
import {  useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Sidebar from './Sidebar';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import useAddOne from '../hooks/contacts/useAddOne';

import { FcAddImage } from 'react-icons/fc'
const CreateContact = (props) => {
    const schema = yup.object().shape({
        firstname: yup.string().required(),
        lastname: yup.string(),
        email: yup.string().email(),
        picture:yup.mixed(),
        phone: yup.string().required(),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const { data, loading, error, addContact } = useAddOne();


    const navigate = useNavigate();

    const onSubmit = async (data, e) => {
        e.preventDefault();//prevent page refresh on submit
        data.picture=data.picture[0]
        console.log(data);
        await addContact(data);

        await delay(520);
    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="content create">
                <div className='upper'>
                    <div className='upload'>
                    <input form='createform' type='file' id='file'
                        {...register("picture")}  accept='image/*'/>
                    <label htmlFor='file'><FcAddImage  size={150}/></label>
                    </div>
                    <div className="name">
                        <label> { }</label>
                        <label> { }</label>
                    </div>
                    <div className="btn">
                        <button type='submit' form='createform' >Save</button>
                    </div>
                </div>
                <div className='lower'>
                    <form id='createform' onSubmit={handleSubmit(onSubmit)}>

                        <div className='form-group'>
                            <label>
                                First Name
                            </label>
                            <input placeholder='John' {...register("firstname")} value={"a"} />
                            {errors.username?.message}
                        </div>
                        <div className='form-group'>
                            <label>
                                Last Name
                            </label>
                            <input placeholder='Snow' {...register("lastname")} value={"a"} />
                            {errors.username?.message}
                        </div>
                        <div className='form-group'>
                            <label>
                                Email
                            </label>
                            <input placeholder='example@email.com' {...register("email")} value={"a@gmail.com"} />
                            {errors.email?.message}

                        </div>
                        <div className='form-group'>
                            <label>
                                Phone
                            </label>
                            <input placeholder='987654321' {...register("phone")} value={"5414514561"} />
                            {errors.password?.message}
                        </div>
                    </form>
                </div>
            </div>
        </>


    )
}

export default CreateContact

/**
 
<div>
                <button onClick={() => navigate('/home')}><IoMdArrowRoundBack size={30} /></button>

            </div>

 */
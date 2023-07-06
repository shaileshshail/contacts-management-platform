import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Sidebar from './Sidebar';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import useAddOne from '../hooks/contacts/useAddOne';
import { IoMdArrowRoundBack } from 'react-icons/io'
const CreateContact = (props) => {
    const schema = yup.object().shape({
        firstname: yup.string().required(),
        lastname: yup.string(),
        email: yup.string().email(),
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

        console.log(data);
        await addContact(data);

        await delay(520);
        navigate('/home');
    }


    return (
        <div>
            <Navbar />
            <div>
            <Sidebar  />
            </div>
            <div>
                <button onClick={() => navigate('/home')}><IoMdArrowRoundBack size={30} /></button>
                <form onSubmit={handleSubmit(onSubmit)}>

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
        </div>

    )
}

export default CreateContact
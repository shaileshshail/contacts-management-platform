import { UserAuthContextProvider, useUserAuth } from '../context/UserAuthContext';
import { Landingnav } from './Landingnav';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  return (
    <>
      {user ? (navigate('/home')) : (
        <div className='landing'>
          <Landingnav />
          <div>
            <h1>
              Contacts Backup Site
            </h1>
          </div>
        </div>
      )}
    </>
  )
}

export default Landing;




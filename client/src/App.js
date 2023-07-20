import './App.css';
import Signup from './components/auth/Signup';
import { Login } from './components/auth/Login';
import { Home } from './components/Home';
import CreateContact from './components/CreateContact';
import EditContacts from './components/EditContacts';
import { Route,Routes } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import ContactView from './components/ContactView'
import FrequentContacts from './components/FrequentContacts';
function App() {
  return (
    <>
      <UserAuthContextProvider>
      <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={ 
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
          <Route path='/create' element={ 
            <ProtectedRoute>
              <CreateContact/>
            </ProtectedRoute>
          }/>
          <Route path='/frequent' element={ 
            <ProtectedRoute>
              <FrequentContacts/>
            </ProtectedRoute>
          }/>
          <Route path='/edit/:id' element={ 
            <ProtectedRoute>
              <EditContacts/>
            </ProtectedRoute>
          }/>
          <Route path='/view/:id' element={ 
            <ProtectedRoute>
              <ContactView />
            </ProtectedRoute>
          }/>
        </Routes>
      </UserAuthContextProvider>
        
      
    </>
  );
}

export default App;

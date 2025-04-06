import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Page404 from './pages/Page404';
import FundsList from './pages/FundsList';
import AuthForm from './pages/AuthForm';
import useUsers from './reducers/useUsers';
import { useEffect } from 'react';
import PrivateRoutes from './components/authComponents/PrivateRoutes';
import PublicRoutes from './components/authComponents/PublicRoutes';
import { RingLoader } from 'react-spinners';
import ProfileNavigator from './components/profileComponents/ProfileNavigator';
import ProfileLayout from './components/profileComponents/ProfileLayout';

    
function App() {

    const {checkForAuth, loading, setUserData, setLoggedin, loggedin} = useUsers();

    
        
    useEffect(() => {

        // setTimeout(() => {
        const checkAuth = async _ => {
            const res = await checkForAuth();
            console.log(res)
            if(res.success === false) {
                // setLoggedin(false)
                return console.log(res.error)

            }
            setUserData(res.data);
        }

        checkAuth()
        // }, 1000);

        }, [])



    
    

    if(loading){
        return (
            <div className='spinner-box'>
                <RingLoader size={300}/>
            </div>
        )
    }
    
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index end element={<Home/>}/>
                <Route path='*' element={<Page404/>}/>
                <Route path='funds' element={<FundsList/>}/>
                <Route path='loginForm' element={<PublicRoutes><AuthForm/></PublicRoutes>}/>
                <Route path='profile' element={<PrivateRoutes><ProfileLayout/></PrivateRoutes>}>
                    {ProfileNavigator()} // kaip komponentas neveikia
                </Route>
            </Route>
        </Routes>
    )
}

export default App;

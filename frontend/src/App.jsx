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
import UserData from './components/profileComponents/UserData';
import StartNewFund from './components/profileComponents/StartNewFund';
import OwnedFunds from './components/profileComponents/OwnedFunds';
import History from './components/profileComponents/History';
import ProfileLayout from './components/ProfileLayout';
import Fund from './pages/Fund';
import { ToastContainer } from 'react-toastify'

    
function App() {

    const {checkForAuth, loading, setUserData} = useUsers();

    
    useEffect(() => {
        // setTimeout(() => {
        const checkAuth = async _ => {
            const res = await checkForAuth();
            console.log(res)
            if(res.success === false) {
                // setLoggedin(false)
                return console.log(res.error)
            }
            console.log(res)
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
        <>
            <ToastContainer className='Toastify__toast-container'/>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='*' element={<Page404/>}/>
                    <Route path='fund/:id' element={<Fund/>}/>
                    <Route path='funds' element={<FundsList/>}/>
                    <Route path='loginForm' element={<PublicRoutes><AuthForm/></PublicRoutes>}/>
                        <Route element={<PrivateRoutes><ProfileLayout /></PrivateRoutes>}>
                            <Route path='user' element={<UserData />} />
                            <Route path='newfund' element={<StartNewFund />} />
                            <Route path='userfunds' element={<OwnedFunds />} />
                            <Route path='history' element={<History />} />
                        </Route>
                </Route>
            </Routes>
        </>

    )
}

export default App;

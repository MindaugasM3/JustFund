import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Page404 from './pages/Page404';
import FundsList from './pages/FundsList';

function App() {
    
  return (
    <Routes>
        <Route path='/' element={<Layout/>}>
            <Route index end element={<Home/>}/>
            <Route path='/funds' element={<FundsList/>}/>
            <Route path='*' element={<Page404/>}/>
        </Route>
    </Routes>
  )
}

export default App;

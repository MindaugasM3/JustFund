import { useState } from 'react';
import useUsers from '../../reducers/useUsers';

function Login() {

    const {userLogin} = useUsers()
    const [login, setLogin] = useState({name: '', password: ''})

    const handleLogin = async _ => {
        const resLogin = await userLogin(login);
        console.log(resLogin);


        setLogin({name: '', password: ''});
    }
    
    return (
        <div className='auth-form login'>
            <h2>Log in</h2>
            <div className='text-left-label'>
                <label htmlFor="nameL">Vardas</label>
                <input id='nameL' type="text" 
                onChange={e => setLogin(r => ({...r, name: e.target.value}))}
                value={login.name}
                />
            </div>
            <div className='text-left-label'>
                <label htmlFor="passwordL">Slaptažodis</label>
                <input type="password" id='passwordL' 
                onChange={e => setLogin(r => ({...r, password: e.target.value}))}
                value={login.password} 
                />

            </div>
            <div>
                 <button className='green-btn' onClick={handleLogin}>Patvirtinti</button>
            </div>
        </div>
    )
}

export default Login
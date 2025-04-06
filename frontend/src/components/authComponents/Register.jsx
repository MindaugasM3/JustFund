import { useState } from "react"
import useUsers from "../../reducers/useUsers"
import Login from "./Login"


function Register() {

    const {userRegister} = useUsers()    
    const [register, setRegister] = useState({name: '', email: '', password: ''})

    const handleRegister = async _ => { 
        const resRegister = await userRegister(register)
        console.log(resRegister)
        
        
        setRegister({name: '', email: '', password: ''});
    }

    console.log(register.password)

    return (
            <div className='auth-form register'>
                <h2>Registruokis</h2>
                <div className='text-left-label'>
                    <label htmlFor="nameR">Vardas</label>
                    <input id='nameR' type="text" 
                    onChange={e => setRegister(r => ({...r, name: e.target.value}))} 
                    value={register.name}/>
                </div>
                <div className='text-left-label'>
                    <label htmlFor="emailR">El. paštas</label>
                    <input type="text" id='emailR' 
                    onChange={e => setRegister(r => ({...r, email: e.target.value}))} 
                    value={register.email}/>
                </div>
                <div className='text-left-label'>
                    <label htmlFor="passwordR">Slaptažodis</label>
                    <input type="password" id='passwordR' 
                    onChange={e => setRegister(r => ({...r, password: e.target.value}))} 
                    value={register.password}/>
                </div>
                <div>
                    <button className='green-btn' onClick={handleRegister}>Patvirtinti</button>
                </div>
            </div>
    )
}

export default Register
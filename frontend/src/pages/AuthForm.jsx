import { useState } from "react";
import Login from "../components/authComponents/Login";
import Register from "../components/authComponents/Register";
import '../style/AuthForm.scss';
import { Link } from "react-router-dom";


function AuthForm() {

    const [showRegister, setShowRegister] = useState(false);

    return (
        <section className="auth section">
            <div className='auth-menu'>
                <span className={showRegister?'highlighted' : ''} onClick={() => setShowRegister(true)}>Prisijunk</span>
                <Link to={'/'} className="link"><span>Justfnd</span></Link>
                <span className={!showRegister?'highlighted' : ''} onClick={() => setShowRegister(false)}>Registruokis</span>
            </div>
            <div className='register-center'>
                <Login/>
                <Register/>
                <div className={`introduction-background ${showRegister? 'slide-right' : 'slide-left'}`}>
                    <div className='introduction'>
                        <p className="middle-name">Pradėk fonda šiandiena!</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuthForm
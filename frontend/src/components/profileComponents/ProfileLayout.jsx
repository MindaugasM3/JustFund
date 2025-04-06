import { Link, Outlet } from "react-router-dom";
import '../../style/Profile.scss';


function ProfileLayout() {
    return (
        <section className='profile'>
            <div className='profile__navigator'>
                <h2>Tavo Profilis</h2>
                <Link to={'/profile/user'}>Profilis</Link>
                <Link to={'/profile/history'}>Istorija</Link>
                <Link to={'/profile/funds'}>Tavo fondai</Link>
                <Link to={'/profile/newfund'}>Naujas fondas</Link>
            </div>
        <div>
            <Outlet/>    
        </div>
    </section>
    )
}

export default ProfileLayout
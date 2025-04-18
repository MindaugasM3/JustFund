import '../style/Header.scss';
import { Link, NavLink } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCircleXmark } from "react-icons/fa6";
import { useState } from 'react';
import useUsers from '../reducers/useUsers';
import { ImExit } from "react-icons/im";


export default function Header() {
    const [hamburgerMenu, setHamburgerMenu] = useState(false);
    const {loggedin, userLogout} = useUsers();

    const toggleHamburger = () => {
        setHamburgerMenu(!hamburgerMenu);
    };

    const handleLogout = async _ =>{
        const res = await userLogout();
        console.log('atsijungiai', res)
        console.log(loggedin)
        if (res.success) {
            toast.success('Sekmingai atsijungėt!');
        } else {
            toast.error('Nepavyko atsijungti!');
        }
    }

    return (
        <div className='header-bg'>
            <div className='wrapper header'>
                <div className='header-search'>
                    <Link to={'/funds'} className="link">Paieška</Link>
                    <CiSearch />
                </div>
                <NavLink to={'/'} className={'navlink'}>JustFnd</NavLink>
                <nav className='header-links'>
                    <NavLink to='/funds' className='navlink'>Fondai</NavLink>
                    <NavLink to='/about' className='navlink'>Apie mus</NavLink>
                    {
                    !loggedin? 
                    <NavLink to='/loginForm' className='navlink'>Prisijungti</NavLink>
                    :
                    <span className='header-spans'>
                        <NavLink className='navlink' to='/user'>Profilis</NavLink>
                        <span className='navlink' onClick={handleLogout}><ImExit /></span>
                    </span>
                    }
                    
                </nav>
                <div className='header-right'>
                    <div className='header-start-fund'>
                        <Link to='/newfund'>Pradėti JustFund</Link>
                    </div>

                    <div className='hamburger'>
                        <GiHamburgerMenu onClick={toggleHamburger} style={{ display: hamburgerMenu ? 'none' : 'block' }} />
                        
                        <div className={`hamburger__menu ${hamburgerMenu ? 'active' : ''}`}>
                            <div className='hamburger__menu__box'>
                                <div><FaCircleXmark className="close-btn" onClick={toggleHamburger}/></div>
                                <NavLink onClick={toggleHamburger} to='/funds' className='navlink'>Fondai</NavLink>
                                <NavLink onClick={toggleHamburger} to='/about' className='navlink'>Apie mus</NavLink>
                                <NavLink onClick={toggleHamburger} to='/contact' className='navlink'>Susisiek</NavLink>
                                <div className='hamburger__menu__buttons'>
                                    <button className='yellow-btn'><NavLink to='/user' onClick={toggleHamburger}>Pradėti Justfund</NavLink></button>
                                    <button className='green-btn'><NavLink onClick={toggleHamburger} to='/authForm'>Prisijunk</NavLink></button>
                                </div>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>
        </div>
    );
}
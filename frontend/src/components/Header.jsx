import '../style/Header.scss';
import { NavLink } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";



export default function Header() {
  return (
    <div className='header-bg'>
        <div className='wrapper header'>
            <div className='header-search'>
                Paieška
                <CiSearch />
                </div>
            <NavLink to={'/'}>JustFnd</NavLink>
            <nav className='header-links'>
                <NavLink to='products'>Fondai</NavLink>
                <NavLink to='about'>Apie mus</NavLink>
                <NavLink to='contact'>Prisijungti</NavLink>
            </nav>
            <div className='header-right'>
                
                <div>
                    <a href='#'>Pradėti JustFnd </a>
                </div>
                   
            </div>
        </div>
    </div>
  );
}
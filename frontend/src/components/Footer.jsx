import { useState } from 'react';
import '../style/Footer.scss';
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSnapchatSquare } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { Link } from 'react-router-dom';

function Footer() {

    const [footerMenu, setFooterMenu] = useState({funds: true, faq: true, about: true, contact: true})

    return (
        <footer>
            <div className="second-menu wrapper">
                <nav className='footer-menu'>

                    <span onMouseEnter={_ => setFooterMenu(e => ({...e, funds: !footerMenu.funds}))}>Fondai</span>
                    <ul className={footerMenu.funds? 'active-footer' : ''}>
                        <li><Link/>Fondu sarašas</li>
                        <li><Link/>Fondu ketegorijos</li>
                        <li><Link/>Naujausi fondai</li>
                    </ul>

                    <span onMouseEnter={_ => setFooterMenu(e => ({...e, faq: !footerMenu.faq}))}>FAQ</span>
                    <ul className={footerMenu.faq? 'active-footer' : ''}>
                        <li><Link/>Taisyklės</li>
                        <li><Link/>Dažniausiai užduodami klausimai</li>
                    </ul>

                    <span onMouseEnter={_ => setFooterMenu(e => ({...e, about: !footerMenu.about}))}>Apie mus</span>
                    <ul className={footerMenu.about? 'active-footer' : ''}>
                        <li><Link/>Kur mes esame</li>
                        <li><Link/>Kodėl tai darom</li>
                        <li><Link/>kontaktai</li>
                    </ul>

                    <span onMouseEnter={_ => setFooterMenu(e => ({...e, contact: !footerMenu.contact}))}>Susisiek</span>
                    <ul className={footerMenu.contact? 'active-footer' : ''}>
                        <li><Link/>Pagalba</li>
                        <li><Link/>Pabendrauti</li>
                    </ul>
                    
                </nav>
                <nav className='footer-social'>
                    <Link href="/#" className="link"><FaYoutube /></Link>
                    <Link href="/#" className="link"><FaFacebook /></Link>
                    <Link href="/#" className="link"><FaTwitter /></Link>
                    <Link href="/#" className="link"><FaSnapchatSquare /></Link>
                    <Link href="/#" className="link"><IoLogoLinkedin /></Link>
                </nav>
            </div>
        </footer>
    )
    
}

export default Footer;
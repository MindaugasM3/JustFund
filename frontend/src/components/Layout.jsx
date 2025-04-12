import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Layout() {

    
    
    return (
        <>
            <Header/>
            <main>
    
                <Outlet/>
                
            </main>
            {/* <div style={{position: 'fixed'}}>hi</div> */}
            <Footer/>
            
        </>
    )
}

export default Layout
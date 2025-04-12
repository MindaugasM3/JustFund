import { Link, Outlet } from "react-router-dom";
import '../style/Profile.scss';
import { RingLoader } from "react-spinners";
import useUsers from "../reducers/useUsers";
import { useEffect, useState } from "react";

function ProfileLayout() {

    const {loading} = useUsers();

    if(loading){
        return (
            <div className='spinner-box'>
                <RingLoader size={300}/>
            </div>
        )
    }

    return (
        <section className='profile section'>
            <div className='profile__navigator'>
                <h2>Tavo Profilis</h2>
                <Link className="link profile-link" to={'user'}>Profilis</Link>
                <Link className="link profile-link" to={'history'}>Istorija</Link>
                <Link className="link profile-link" to={'userfunds'}>Tavo fondai</Link>
                <Link className="link profile-link" to={'newfund'}>Naujas fondas</Link>
                <Link className="link profile-link" to={'chat'}>Pokalbiai</Link>
            </div>
        <div>
            <Outlet/>    
        </div>
    </section>
    )
}

export default ProfileLayout
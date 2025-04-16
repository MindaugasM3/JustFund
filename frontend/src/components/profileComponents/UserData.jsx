import { useEffect, useRef, useState } from "react"
import useUserData from "../../reducers/useUserData"
import { RingLoader } from "react-spinners"
import { FaPencilAlt } from "react-icons/fa";
import userImage from '../../assets/363640-200.png';
import { toast } from "react-toastify";

function UserData() {

    const {fetchUserProfileData, loading, updateUserData} = useUserData()
    const [userData, setUserData] = useState({name: '', email: '', user_description: '', avatar: userImage, id: ''})
    const [editMenu, setEditMenu] = useState(true)

    useEffect(() => {
        const getUserData = async _ => {
            const res = await fetchUserProfileData()
            console.log(res)
            setUserData({...res});
        }
        
        getUserData()

    }, [])

    if(loading){
        return (
            <div className='spinner-box'>
                <RingLoader size={300}/>
            </div>
        )
    }

    const handleUserUpdate = async _ => {
        const res = await updateUserData(userData);
        console.log(res)
        if(res.success){
            toast.success('pavyko pakeisti duomenis')
        } else {
            toast.error('nepavyko pakeisti duomenu')
        }
    }
    
    console.log(userData.user_description)
    return (
        <div className="user-info">
            <div><FaPencilAlt onClick={e => setEditMenu(a => !a)}/></div>
            <div style={{visibility: editMenu? 'hidden' : 'visible'}} className="change-user-info">
                <div>
                    <label htmlFor={`${userData.id}name`}>Vardas: </label>
                    <input 
                        id={`${userData.id}name`} 
                        value={userData?.name} 
                        onChange={e => setUserData(a => ({...a, name: e.target.value}))}
                        type="text" />
                </div>
                <div>
                    <label htmlFor={`${userData.id}user_description`}>El. paštas: </label>
                    <input 
                        id={`${userData.id}user_description`} 
                        value={userData?.email} 
                        onChange={e => setUserData(a => ({...a, email: e.target.value}))}
                        type="text" />
                </div>
                <div>
                    <label htmlFor={`${userData.id}name`}>Vartotojo aprašymas: </label>
                    <input 
                        id={`${userData.id}name`} 
                        value={userData?.user_description} 
                        onChange={e => setUserData(a => ({...a, user_description: e.target.value}))}
                        type="text" />
                </div>
                <button onClick={handleUserUpdate} className="yellow-btn">Patvirtinti</button>
            </div>
            <div className="user-info__main">
                <div>
                    {userData?.avatar}  
                </div>
                <div>
                    Vatotojo vardas: {userData?.name}
                </div>
                <div>
                    Vartotojo El. paštas: {userData?.email}
                </div>
                <div>
                    Aprašymas: {userData?.user_description || 'Duomenų nėra'}
                </div>
            </div>
        </div>
    )
}

export default UserData
import { useEffect, useState } from "react"
import useUserData from "../../reducers/useUserData"
import { RingLoader } from "react-spinners"
import { FaPencilAlt } from "react-icons/fa";

function UserData() {

    const {fetchUserProfileData, loading} = useUserData()
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const getUserData = async _ => {
            const res = await fetchUserProfileData()
            console.log(res)
            setUserData(res);
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
    

    return (
        <div>
            <div>Pakeisti <FaPencilAlt /></div>
            <div>

                <div>
                    {userData?.avatar}  
                </div>
                <div>
                    {userData?.id}, {userData?.name}, {userData?.email}
                </div>
                <div>
                    {useUserData?.user_description}
                </div>
                    <button className="yellow-btn">Patvirtinti</button>

            </div>
        </div>
    )
}

export default UserData
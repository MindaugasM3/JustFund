import { useEffect, useState } from "react"
import useUserData from "../../reducers/useUserData"
import { RingLoader } from "react-spinners"


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
        <div>{userData?.id}, {userData?.name}</div>
    )
}

export default UserData
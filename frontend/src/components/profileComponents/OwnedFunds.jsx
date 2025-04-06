import { useEffect, useState } from "react"
import useUserData from "../../reducers/useUserData"
import useUsers from "../../reducers/useUsers"
import { RingLoader } from "react-spinners"


function OwnedFunds() {


    const {loading, fetchUserFunds} = useUserData()
    const [userFunds, setUserFunds] = useState(null)

    useEffect(() => {
        const getUserFundsFunc = async _ => {
            const res = await fetchUserFunds()
            console.log(res)
            setUserFunds(res);
        }
        
        getUserFundsFunc()

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
            {
                userFunds?.map(fund => <div key={fund.id}>{fund.title}</div>)
            }
        </div>
    )
}

export default OwnedFunds
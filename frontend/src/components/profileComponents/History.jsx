
// fund pilnas puslapis su duomenimis ir vietacomentaramas 

import { useEffect, useState } from "react"
import { useFunds } from "../../reducers/usefunds"
import useUserData from "../../reducers/useUserData";

// komentaru crud 
// likinti dislaikinti funds 
// socket.io
// ideti fonda ir laikyti istorijoje

function History() {

    const {fetchDonationHistory, fetchUserFunds} = useFunds();
    const [fundsHistory, setFundsHistory] = useState();
    const [userFunds, setUserFunds] = useState();

    useEffect(() => {
        
        const getFundsHistory = async _ => {
            try{
                const fundsHsitory = await fetchDonationHistory()
                console.log(fundsHsitory)
                setFundsHistory(fundsHsitory)
            } catch(error) {
                console.log(error)
            }
        }
        getFundsHistory()
    }, [])

    console.log(userFunds)
    console.log(fundsHistory)
    

    return (
        <div>History</div>
    )
}

export default History
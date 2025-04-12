
// fund pilnas puslapis su duomenimis ir vietacomentaramas 

import { useEffect, useState } from "react"
import { useFunds } from "../../reducers/useFunds"
import useUserData from "../../reducers/useUserData";

// komentaru crud 
// likinti dislaikinti funds 
// socket.io
// ideti fonda ir laikyti istorijoje

function History() {

    const {fetchDonationHistory, fetchUserFunds, fundsHistory} = useFunds();
    const [userFunds, setUserFunds] = useState();

    useEffect(() => {
        fetchDonationHistory()
    }, [])

    console.log(fundsHistory)

    return (
        <div className="history-window">
            <div className="fund-history-box">
                {
                    fundsHistory.length > 0? fundsHistory.map(fund => (
                        <div className="history-card">
                            <div>{fund.name}</div>
                            <div className="amount">{fund.amount}</div>
                        </div>
                    ))
                        :
                        <div>nėra fondu aukojimo istorijos</div>
                }
            </div>
        </div>
    )
}

export default History
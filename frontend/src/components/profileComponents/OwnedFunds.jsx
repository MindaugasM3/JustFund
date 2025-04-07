import { useEffect, useState } from "react"
import useUserData from "../../reducers/useUserData"
import useUsers from "../../reducers/useUsers"
import { RingLoader } from "react-spinners"
import OwnedFundCard from "./OwnedFundCard"
import { ToastContainer } from "react-toastify"


function OwnedFunds() {


    const {loading, fetchUserFunds, funds} = useUserData();
    // const [userFunds, setUserFunds] = useState(null);
    const [pageFunds, setPageFunds] = useState(null);

    useEffect(() => {
        const getUserFundsFunc = async _ => {
            const res = await fetchUserFunds()
            console.log(res)
            // setUserFunds(res);
            setPageFunds(res.slice(0, 5))
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

    const handlePages = pages => {
        const pagesDiv = []
        
        for (let i = 0; i <= pages; i++){
            pagesDiv.push(<button key={i} value={i} onClick={e => handlePageData(e.target.value)}>{i}</button>)
        }     
        return (
            <div>
                {pagesDiv.map(page => page)}
            </div>
        )
    }

    const handlePageData = page => {
        const from = page*5;
        const to = 5*(page*1+1);
        setPageFunds(funds.slice(from, to))
    }
    
    return (
        <div className="funds-list">
            <div className="funds-box">
            {
                pageFunds?.map(fund => <OwnedFundCard key={fund.id+'user'} fundData={fund}/>)
            }
            </div>
            <div>
                <div>
                    {
                        funds?.length > 0? handlePages(Math.floor(funds.length/5)) : 'nera fondu'
                    }
                </div>
            </div>
        </div>  
    )
}

export default OwnedFunds
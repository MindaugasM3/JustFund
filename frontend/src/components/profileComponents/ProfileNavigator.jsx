import { Route } from "react-router-dom"
import UserData from "./UserData"
import StartNewFund from "./StartNewFund"
import OwnedFunds from "./OwnedFunds"
import History from "./History"


function ProfileNavigator() {
    return (
            <>
                <Route index path='user' element={<UserData/>}/>
                <Route path='newfund' element={<StartNewFund/>}/>
                <Route path='funds' element={<OwnedFunds/>}/>
                <Route path='history' element={<History/>}/>
            </>
        )
    
}

export default ProfileNavigator

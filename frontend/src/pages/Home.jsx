import AboutFunds from "../components/homeComponets/AboutFunds"
import Header from "../components/Header"
import MainTitle from "../components/homeComponets/MainTitle"
import NewFunds from "../components/homeComponets/NewFunds"


function Home() {
    return (
        <>
            <Header/>
            <MainTitle/>
            <NewFunds/>
            <AboutFunds/>
        </>
    )
}

export default Home
import '../style/FundsList.scss'
import { useFunds } from "../reducers/usefunds"
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from 'react';
import FundCard from '../components/fundComponents/FundCard';

function Funds() {

    const {funds, fetchFunds, loading, updateFund, deleteFund, createNewFund} = useFunds()
    const [searchTitle, setSearchTitle] = useState('')
    const [avaiableFunds, setAvaiableFunds] = useState([])


    useEffect(() => {
        fetchFunds();
    }, [fetchFunds, updateFund, deleteFund, createNewFund, funds])
    
    useEffect(() => {
        const funds2 = funds.filter(fund => fund.title.toLowerCase().includes(searchTitle));
        setAvaiableFunds(funds2)
    }, [searchTitle])
    
    const handleCategories = fundsArray => {
        const filtered = fundsArray.filter((fund, index, self) => 
            self.findIndex(fundOld => 
            fundOld.category === fund.category) === index);
            return filtered;
    }

    return (
        <div className="funds-page">
            <div className="funds-page__categories">
                <div>Categories:</div>
                {
                    avaiableFunds.length === 0 ? handleCategories(funds).map(fundCategory => <div key={fundCategory.id}>{fundCategory.category}</div>)
                    : 
                    handleCategories(avaiableFunds).map(fundCategory => <div key={fundCategory.id}>{fundCategory.category}</div>)
                }   
            </div>
            <div className="funds-page__main">
                <div><h2>Funds:</h2></div>
                <div className="funds-page__main__search">
                    <label htmlFor="search-fund">Ieškoti pgal pvadnima <CiSearch/></label>
                    <input onChange={e => setSearchTitle(e.target.value)} value={searchTitle} id='search-fund'/>
                    <span>{searchTitle.length !== 0 && avaiableFunds.length === 0? 'nieko nerasta' : ''}</span>
                </div>
                <div className="funds-page__main__funds">
                    {
                    avaiableFunds.length === 0 ? funds.map(aFund => <FundCard key={aFund.id} fundData={aFund}/>):
                    avaiableFunds.map(aFund => <FundCard key={aFund.id} fundData={aFund}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Funds
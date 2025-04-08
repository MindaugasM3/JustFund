import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useFunds } from '../../reducers/usefunds';

function FundCard({ fundData, onUpdateFund, showAdd, setShowAdd }) {
    const [fundingAmount, setFundingAmount] = useState('');
    const [showFundForm, setShowFundForm] = useState(false);
    const {fundit, saveFundDonation} = useFunds()
    const [name, setName] = useState('')

   
    const fundedPercentage = (fundData.funded / fundData.fund_goal) * 100;

    const handleFunding = async () => {
        if (fundingAmount.length === 0 || fundingAmount < 10) {
            toast.error('Prašome įvesti daugiau nei 10');
            return;
        }
        // const funddata = {fund_id: fundData.id, amount: fundingAmount, name: name}
        // console.log(funddata)
        // const res = await saveFundDonation(funddata)


        setFundingAmount('')
        const newFunded = 1 * fundingAmount + fundData.funded * 1;
        const success = await fundit(newFunded, fundData.id);
        const funddata = {fund_id: fundData.id, amount: fundingAmount, name: name}
        console.log(funddata)
        const res = await saveFundDonation(funddata)
        console.log(res)
        

        if (success) {
            toast.success('Sekmingai paaukojote!');
            fundData.funded = newFunded;
            setShowFundForm(false); 
        } else {
            toast.error('Auka nepavyko');
        }
        
    };

    return (
        <div className="fund-card">
            <div className="fund-card__pad">
                <div className="image-box">
                    <img src={fundData.url} alt={fundData.title} />
                </div>
                <h3>{fundData.title}</h3>
                <span>{fundData.category}</span>
                <div className="fund-bar">
                    <div className="fund-raised" style={{ width: `${fundedPercentage}%` }}></div>
                </div>
                <span>€ {parseFloat((fundData.funded)).toFixed(2)}</span>
                <span className="fund-date">{fundData.updated_at.split('T')[0]}</span>
            </div>
            <button onClick={_ => showAdd !== fundData.id? setShowAdd(fundData.id): setShowAdd(null)}>noriu paaukoti</button>
            {showAdd === fundData.id && (
    !showFundForm ? (
        <button onClick={() => { setShowFundForm(true) }} className="yellow-btn">
            Donate
        </button>
    ) : (
        <div className="donation-form">
            <label htmlFor={`fund-${fundData.id}-amount`}>Kiekis: €</label>
            <input
                type="number"
                id={`fund-${fundData.id}-amount`}
                value={fundingAmount}
                onChange={e => setFundingAmount(e.target.value)}
            />

            <label htmlFor={`fund-${fundData.id}-name`}>Vardas: </label>
            <input
                type="text"
                id={`fund-${fundData.id}-name`}
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <button onClick={handleFunding} className="green-btn">
                Paaukoti
            </button>
        </div>
    )
)}
        </div>
    );
}

export default FundCard;
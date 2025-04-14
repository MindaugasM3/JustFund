import '../style/Fund.scss';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useFunds } from '../reducers/useFunds';
import Comments from '../components/fundComponents/Comments';

function Fund() {
    const {funds, fetchFunds, saveFundDonation, fundit} = useFunds()

    const [fundingAmount, setFundingAmount] = useState('');
    const [fundMe, setFundMe] = useState(false);
    const [name, setName] = useState('');
    
    useEffect(() => {
        fetchFunds();
    }, [])

    console.log(funds)
    const location = useLocation(); 
    let id = location.state.id; 
    const thisFundData = funds.filter(fund => fund.id == id)[0]
    console.log(thisFundData?.id)


    if (!thisFundData) {
        return <div>Nerastas pusalapis</div>;
    }
    
    const handleFunding = async () => {
        if (fundingAmount.length === 0 || fundingAmount < 10) {
            toast.error('Prasome pasirinkti daugiau nei 10');
            return;
        }

        // const funded = 1*thisFundData.funded + fundingAmount*1
        // setFundedAmount(a => a + fundingAmount*1)
        const res = await fundit(fundingAmount, thisFundData.id)
        console.log(res)
        if(res.success) {
            fetchFunds();
            toast.success('sekmingai paaukojote')
        } else {
            toast.error('nepavyko paaukoti')
        }
    };

    const funded = (thisFundData.funded / thisFundData.fund_goal) * 100;

    return (
        <div>
            <div className='fund-page'>
                <div className='left-size'>
                    <img src={`${thisFundData.url}`} alt={`${thisFundData.title}`} />
                    <p>{thisFundData.description}</p>
                </div>
                <div className='right-page'>
                    <h2>{thisFundData.title}</h2>
                    <p>Kategorija: {thisFundData.category}</p>
                    <div>
                        <p>Paaukota: €{thisFundData.funded}</p>
                        <div className="fund-bar">
                            <div className="fund-raised" style={{ width: `${funded}%` }}></div>
                        </div>
                        <p>Tikslas: €{thisFundData.fund_goal}</p>
                    </div>
                    <div>
                        <button style={{ display: fundMe ? 'none' : '' }} onClick={e => setFundMe(true)} className='yellow-btn'>
                            Paaukoti
                        </button>
                        <div style={{ display: fundMe ? '' : 'none' }}>
                            <div>
                            <label htmlFor={thisFundData.id + 'fund'}>Suma: €</label>
                            <input
                                type="number"
                                id={thisFundData.id + 'fund'}
                                value={fundingAmount}
                                onChange={e => setFundingAmount(e.target.value)}
                            />
                            </div>
                            <div>
                            <label htmlFor={thisFundData.id + 'name'}>vardas: </label>
                            <input
                                type="text"
                                id={thisFundData.id + 'name'}
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <button onClick={handleFunding} className='green-btn'>
                                Paaukoti
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            
             </div>
            <Comments fundId={thisFundData.id}/>
        </div>
    );
}

export default Fund;

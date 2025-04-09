import '../style/Fund.scss';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useFunds } from '../reducers/useFunds';
import Comments from '../components/fundComponents/Comments';

function Fund() {
    const {funds, fetchFunds, loading, updateFund, deleteFund, createNewFund} = useFunds()
    //const { funds, loading, fetchFunds, setFunds } = useFunds()(state => ({
    //     funds: state.funds,
    //     loading: state.loading,
    //     fetchFunds: state.fetchFunds,
    //     setFunds: state.setFunds
    //   }));

    const location = useLocation(); 
    let fundData = location.state; 

    const [fundingAmount, setFundingAmount] = useState('');
    const [fundMe, setFundMe] = useState(false);
    const [name, setName] = useState('');

    

    useEffect(() => {
        fetchFunds();
    }, [])

    console.log(funds)

    // useEffect(() => {
      
    //     const getFunds = async _ => {
    //         const res = await fetchFunds();
    //         console.log(res)
    //     }

    //     getFunds()
    // }, [])

    useEffect(() => {
        if (funds?.length === 0) {
          fetchFunds();
        }
      }, []);
    


    if (!fundData) {
        return <div>Nerastas pusalapis</div>;
    }
    const handleFunding = async () => {
        if (fundingAmount.length === 0 || fundingAmount < 10) {
            toast.error('Prasome pasirinkti daugiau nei 10');
            return;
        }

        const newFunded = 1 * fundingAmount + fundData.funded * 1;
        const res = await fundit(newFunded, fundData.id);
        console.log(res);

        if (res.success) {
            toast.success('Sekmingai paaukojote!');
            fundData.funded = newFunded;
        } else {
            toast.error('Nepavyko paaukoti');
        }
    };

    const funded = (fundData.funded / fundData.fund_goal) * 100;

    return (
        <div>
            <div className='fund-page'>
                <div className='left-size'>
                    <img src={`${fundData.url}`} alt={`${fundData.title}`} />
                    <p>{fundData.description}</p>
                </div>
                <div className='right-page'>
                    <h2>{fundData.title}</h2>
                    <p>Kategorija: {fundData.category}</p>
                    <div>
                        <p>Paaukota: €{fundData.funded}</p>
                        <div className="fund-bar">
                            <div className="fund-raised" style={{ width: `${funded}%` }}></div>
                        </div>
                        <p>Tikslas: €{fundData.fund_goal}</p>
                    </div>
                    <div>
                        <button style={{ display: fundMe ? 'none' : '' }} onClick={e => setFundMe(true)} className='yellow-btn'>
                            Paaukoti
                        </button>
                        <div style={{ display: fundMe ? '' : 'none' }}>
                            <div>
                            <label htmlFor={fundData.id + 'fund'}>Suma: €</label>
                            <input
                                type="number"
                                id={fundData.id + 'fund'}
                                value={fundingAmount}
                                onChange={e => setFundingAmount(e.target.value)}
                            />
                            </div>
                            <div>
                            <label htmlFor={fundData.id + 'name'}>vardas: </label>
                            <input
                                type="text"
                                id={fundData.id + 'name'}
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
            <Comments fundId={fundData.id}/>
        </div>
    );
}

export default Fund;

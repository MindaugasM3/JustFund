import '../style/Fund.scss';
import { useLocation } from 'react-router-dom';
import { useFunds } from '../reducers/usefunds';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Fund() {
    const { fundit, fetchFunds, funds } = useFunds();
    const location = useLocation(); 
    let fundData = location.state; 

    const [fundingAmount, setFundingAmount] = useState('');
    const [fundMe, setFundMe] = useState(false);
    const [name, setName] = useState('');

    console.log(funds)

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
    );
}

export default Fund;

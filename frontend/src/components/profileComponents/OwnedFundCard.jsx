import { useState } from "react";
import { useFunds } from "../../reducers/usefunds";
import { toast } from "react-toastify";
// import { useNavigate } from 'react-router-dom';


function OwnedFundCard({fundData, setPageFunds, pageFunds, editData, setEditData}) {

    const { loading, deleteFund, updateFund } = useFunds();
    const [pressedDelete, setPressedDelete] = useState(false)
    const [editFundData, setEditFundData] = useState({
                                                    title: fundData.title, 
                                                    description: fundData.description,
                                                    fund_goal: fundData.fund_goal,
                                                    category: fundData.category,
                                                    id: fundData.id
                                                })
                                            

    const handleDelete = async _ => {
        setPressedDelete(true);
        const res = await deleteFund(fundData.id);
        if (res.success) {
            toast.success('Fondas sekmingai ištrintas!');
            setPageFunds(prevFunds => prevFunds.filter(fund => fund.id !== fundData.id));
            console.log(pageFunds)
        } else {
            toast.error('Nepavyko ištrinti fondo!');
        }
        setPressedDelete(false); 
    };

    const handleFundEdit = async _ => {
        setPageFunds(prevFunds => prevFunds.map(fund => fund.id === fundData.id? 
            ({...fund, ...editFundData}) 
            : fund));
        const res = await updateFund(editFundData);
        console.log(res)
        if (res.success) {
            toast.success('Fondas sekmingai pakeistas!');
            console.log(fundData.id)
            setEditFundData({
                        title: fundData.title, 
                        description: fundData.description,
                        fund_goal: fundData.fund_goal,
                        category: fundData.category,
                        id: fundData.id
            })                      
            console.log(pageFunds)
        } else {
            toast.error('Nepavyko pakeisti fondo!');
        }
        setEditData(null); 
        
        
    }
      

    return (
        <div className="user-fund-card">
            
            <div className="buttons-menu">
                <button disabled={fundData.id!==editData} onClick={handleFundEdit} className="green-btn">{editData!==fundData.id? 'nepasirinkes' : 'pakeisti'}</button>
                <button onClick={_ => setEditData(fundData.id)} className="yellow-btn">Pasirinkti</button>
                <button disabled={pressedDelete || loading} onClick={handleDelete} className="red-btn">{pressedDelete? 'Ištirnama...' : 'Ištrinti'}</button>
            </div>
            <div className="user-card-data">
                <img src={`/uploads/${fundData.url}`} alt={fundData.title} />
                <input disabled={fundData.id!==editData} onChange={e => setEditFundData(f => ({...f, title: e.target.value}))} type="text" value={editFundData.title}/>
                <input disabled={fundData.id!==editData} onChange={e => setEditFundData(f => ({...f, description: e.target.value}))} type="text" value={editFundData.description}/>
                <input disabled={fundData.id!==editData} onChange={e => setEditFundData(f => ({...f, fund_goal: e.target.value}))} type="number" value={editFundData.fund_goal}/>
                <input disabled={fundData.id!==editData} onChange={e => setEditFundData(f => ({...f, category: e.target.value}))} type="text" value={editFundData.category}/>

            </div>
        </div>
    )
}

export default OwnedFundCard;
import { useState } from "react";
import { useFunds } from "../../reducers/usefunds";
import { toast, ToastContainer } from "react-toastify";

function OwnedFundCard({fundData}) {

    const {deleteFund, loading} = useFunds();
    const [fundCardData, setFundCardData] = useState();
    const [pressedDelete, setPressedDelete] = useState(false)
    const [deleted, setDeleted] = useState(false); 
    
    const handleDelete = async _ => {
        setPressedDelete(true)
        const res = await deleteFund(fundData.id)
        if (res.success) {
            setDeleted(true); // Mark as deleted
            toast.success('fondas sekmingai ištrintas!'); // Show success toast
          } else {
            toast.error('nepavyko ištrinti fondo!');
          }
    }

    if (deleted) {
        return null; // Hide the card if it's deleted
      }

    console.log(loading)
    return (
        <div>
            
            <div>
                <button className="yellow-btn">Pakeisti</button>
                <button disabled={pressedDelete || loading} onClick={handleDelete} className="red-btn">{pressedDelete? 'Ištirnama...' : 'Ištrinti'}</button>
            </div>
            <div>
                <img src={`/uploads/${fundData.url}`} alt={fundData.title} />
                {fundData.title}
                {fundData.description}
                {fundData.fund_goal}
                {fundData.category}
            </div>
        </div>
    )
}

export default OwnedFundCard;
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { useFunds } from "../../reducers/useFunds";
import { toast } from "react-toastify";
import OwnedFundCard from "./OwnedFundCard";

function OwnedFunds() {
    const { loading, fetchUserFunds, funds } = useFunds();
    const [pageFunds, setPageFunds] = useState(null);
    const [pressedDelete, setPressedDelete] = useState(false);
    const [editData, setEditData] = useState(null);

    console.log(pageFunds)
    useEffect(() => {
        const getUserFundsFunc = async () => {
            const res = await fetchUserFunds();
            console.log(res)
            setPageFunds(res.slice(0, 5)); 
        };
        getUserFundsFunc();
    }, []); 

    console.log(pageFunds)


    const handlePages = (pages) => {
        const pagesDiv = [];
        for (let i = 0; i <= pages; i++) {
            pagesDiv.push(
                <button key={i} value={i} onClick={(e) => handlePageData(e.target.value)}>
                    {i}
                </button>
            );
        }
        return <div>{pagesDiv.map((page) => page)}</div>;
    };

    const handlePageData = page => {
        const from = page * 5;
        const to = 5 * (page * 1 + 1);
        setPageFunds(funds.slice(from, to));
    };

    if (loading) {
        return (
            <div className="spinner-box">
                <RingLoader size={300} />
            </div>
        );
    }

    // const handleEdit = id => {
    //     handlePages(Math.floor(funds.length / 5.1, id))
    // }

    return (
        <div className="funds-list">
            <div className="funds-box">
            {pageFunds?.map(fund => <OwnedFundCard editData={editData} setEditData={setEditData} pageFunds={pageFunds} setPageFunds={setPageFunds} key={fund.id+'user'}  fundData={fund}/>)}
                {/* {pageFunds?.map((fund) => (
                    <div key={fund.id}>
                        <div>
                            <button onClick={handleEdit(fund.id)} className="yellow-btn">Pakeisti</button>
                            <button
                                disabled={pressedDelete || loading}
                                onClick={() => handleDelete(fund.id)}
                                className="red-btn">
                                {pressedDelete ? "Ištirnama..." : "Ištrinti"}
                            </button>
                        </div>
                        <div className="user-card-data">
                            <img src={`/uploads/${fund.url}`} />
                            <div>{fund.title}</div>
                            <div>{fund.description}</div>
                            <div>{fund.fund_goal}</div>
                            <div>{fund.category}</div>
                        </div>
                    </div>
                ))} */}
            </div>
            <div>
                <div className="user-funds-pages">
                    {pageFunds?.length > 5
                        ? handlePages(Math.floor(funds.length / 5.1))
                        : "Nėra puslapiu"}
                </div>
            </div>
        </div>
    );
}

export default OwnedFunds;
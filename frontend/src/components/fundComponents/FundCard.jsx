
function FundCard({fundData}) {

    const funded = (fundData.funded / fundData.fund_goal) * 100;

    return (
        <div className="fund-card">
            <div className="fund-card__pad">
                <div className="image-box">
                    <img src={fundData.url} alt={fundData.title} />
                </div>
                <h3>{fundData.title}</h3>
                <span>{fundData.category}</span>
                <div className="fund-bar">
                    <div className="fund-raised" style={{width: `${funded}%`}}></div>
                </div>
                <span>€ {fundData.funded}</span>
                <span className="fund-date">{fundData.updated_at.split('T')[0]}</span>
            </div>
        </div>
    )
}

export default FundCard
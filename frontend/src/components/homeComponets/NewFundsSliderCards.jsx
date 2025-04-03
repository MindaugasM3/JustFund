function NewFundsSliderCards({fundData}) {

    const funded = (fundData.funded / fundData.fund_goal) * 100 ;

    console.log(funded)

    return (
        <div className='new-funds-card'>
            <div className='top-new-fund-card'>
                <h2 >{fundData.title}</h2>
                <img src={fundData.url} alt={fundData.title}/>
            </div>
            <div className='new-fund-description'>
                <p>{fundData.description}</p>
            </div>
            <div className='new-fund-funded'>
                <div>€{fundData.funded} Surinkta</div>
                <div className="fund-bar"><div className="fund-raised" style={{width: `${funded}%`}}></div></div>
            </div>
            <div className='bottom-new-fund-card'>
                <div>votes</div>
            <div>{fundData.updated_at.split('T')[0]}</div>
            </div>
        </div>
    )
}

export default NewFundsSliderCards;
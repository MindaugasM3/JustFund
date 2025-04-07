import React from 'react';
import { useLocation } from 'react-router-dom';

function Fund() {
    const location = useLocation(); 
    const fundData = location.state;

    if (!fundData) {
        return <div>No data available</div>;
    }

    const funded = (fundData.funded / fundData.fund_goal) * 100;

    return (
        <div>
            <h2>{fundData.title}</h2>
            <p>{fundData.description}</p>
            <p>Paaukota: €{fundData.funded} / Tikslas: €{fundData.fund_goal}</p>
            <p>Kategorija: {fundData.category}</p>
            <div className="fund-bar">
                <div className="fund-raised" style={{ width: `${funded}%` }}></div>
            </div>
        </div>
    );
}

export default Fund;
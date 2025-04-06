import React from 'react'
import { useParams } from 'react-router-dom'
import { useFunds } from '../reducers/usefunds'

function Fund() {

    const {funds} = useFunds();
    const {id} = useParams();

    for (let i = 0; i < funds.length; i++){
        console.log(funds[i].id)
    }

    const fundData = funds.map(fund => fund.id === id)
    console.log(fundData)
    return (
        <div>{id}</div>
    )
}

export default Fund
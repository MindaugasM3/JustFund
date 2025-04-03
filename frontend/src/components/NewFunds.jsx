import { useEffect } from 'react';
import { useFunds } from '../reducers/funds'
import '../style/NewFunds.scss'

function NewFunds() {

    const {fetchFunds, funds} = useFunds();

    useEffect(() => {
        fetchFunds()
    }, [fetchFunds])
    

    console.log(funds)

    return (
        <section>
            <div className='navigator-box'>

                <div className='view-slider'>
                    <div className='slide-left'>
                        left
                    </div>

                    <div className='middle'>

                        <div className='show-three'>

                            <div>aaaaaaaaaa</div>
                            <div>bbbbbbbbbbbbb</div>
                            <div>cccccccccccc</div>

                        </div>

                    </div>

                    <div className='slide-right'>
                        right
                    </div>
                </div>
                <div className='navigacija'>
                    navigacija
                </div>
            </div>
        </section>
    )
}

export default NewFunds
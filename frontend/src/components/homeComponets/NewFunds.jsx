import { useEffect, useState } from 'react';
import '../../style/NewFunds.scss'
import NewFundsSliderCards from './NewFundsSliderCards';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useFunds } from '../../reducers/usefunds';



function NewFunds() {

    const {fetchFunds, funds} = useFunds();

    useEffect(() => {
        fetchFunds();
    }, [])


    const newestSixFunds = funds.filter(fund => fund.id <= funds.length-4);


    let index = 1;
    const slides = document.querySelector('.show-three');
    const totalSlides = 6
    const visibleSlides = 3; 
    const slideWidth = 34; 

    const slideLeft = _ => {
        index += visibleSlides;
        if (index > totalSlides - visibleSlides) index = 0; // Loop back
        slides.style.transform = `translateX(${-index * slideWidth}%)`;
    }
    
    const slideRight = _ => {
        index -= visibleSlides;
        if (index < 0) index = totalSlides - visibleSlides; // Loop back
        slides.style.transform = `translateX(${-index * slideWidth}%)`;
    }

    console.log(newestSixFunds)
    return (
        <section>
            <div className='navigator-box'>

                <div className='view-slider'>
                    <div className='slide-left'>
                        <div onClick={slideLeft}><FaArrowLeft /></div>
                    </div>

                    <div className='middle'>

                        <div className='show-three'>

                            {
                                newestSixFunds.map(fund => <NewFundsSliderCards key={fund.id} fundData={fund}/>)
                            }

                        </div>

                    </div>

                    <div className='slide-right'>
                        <div onClick={slideRight}><FaArrowRight /></div>
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
import '../../style/AboutFunds.scss'

function AboutFunds() {
    return (
        <section className='section-about section'>
            <div className='section-about__box'>
                <div className='section-about__box__title'>
                    <h2>Justfund fondai paprasti, patikimi ir greiti.</h2>
                </div>
                <div className='section-about__box__paragraph'>
                    <p>
                        Gauk tai ko tau reikia tam, kad tau pasisektu ar tu 
                        renki pinigus sau, draugams, šeimai ar labdarai.
                        Be jokiu mokeščių, Justfund tau padės tavo kelyje
                        ar tai būtų nuo finacinių sunkumu iki kelionių
                        fondu ir nuo svaikatos iki labdaru. Bet ko tau
                        reikės prašyk ir mes padėsime.
                    </p>
                </div>
                <div className='section-about__box__chat-button'>
                    <button className='yellow-btn'>Reikia, pagalbos susisiek</button>
                </div>
            </div>
        </section>
    )
}

export default AboutFunds
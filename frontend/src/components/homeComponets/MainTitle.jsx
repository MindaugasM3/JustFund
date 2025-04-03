import main from '../../assets/main.jpg';
import '../../style/MainTittle.scss'

function MainTitle() {
    return (
        <>
            <div className='introduction'> 
                <img src={main} alt="main picture" />
                <div className='introduction__left'>
                    <div className='introduction__left__text'>
                        # Mano pirmas fondo projektas
                    </div>
                    <div className='introduction__left__text'>
                        Sekmingi fondai prasidėda čią!
                    </div>
                    <div className='introduction__left__text'>
                        <button className='green-btn'>Pradėti fonda</button>
                    </div>
                    <div className='introduction__left__phyramid'>

                        <div className='introduction__left__phyramid__first'>
                            <div><span>Gyvūnai</span></div>
                            <div><span>Verslas</span></div>
                        </div>
                        <div className='introduction__left__phyramid__second'>
                            <span>Išsilavinimas</span>
                            <span>Medicina</span>
                        </div>
                        <div className='introduction__left__phyramid__third'>
                            <span>Tau</span>
                        </div>
                    
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainTitle
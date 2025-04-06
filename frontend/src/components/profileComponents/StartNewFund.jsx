import { useState } from "react";
import { useFunds } from "../../reducers/usefunds";


function StartNewFund() {

    const {images, addImage, imageReader, updateImage, deleteImage, mainImage} = useFunds()
    const [newFundData, setNewFundData] = useState({title: '', description: '', category: '', fund_goal: ''})

    const submitNewFund = _ => {

    }

    const readFile = async (e, id) => {
        try {
            const img = e.target.files[0];
            const res = await imageReader(img);
            updateImage(id, res)

            // res => setImage(imgs => imgs.map(img => img.id === id? {...img, src: res}: img)))
        }catch(error){
            console.log(error)
        }

    }

    return (
        <div className="new-fund">
            <div>
                <div>fund will need user_id</div>
                <div>
                    <label htmlFor="title">Pavadinimas</label>
                    <input id="title" 
                        type="text" 
                        onChange={e => setNewFundData(f => ({...f, title: e.target.value}))} 
                        value={newFundData.title}/>
                </div>
                <div> 
                    <label htmlFor="description">aprašymas</label>
                    <input id="description" 
                        type="text" 
                        onChange={e => setNewFundData(f => ({...f, description: e.target.value}))} 
                        value={newFundData.description}/>
                </div>
                <div>
                    <label htmlFor="category">Kategorija</label>
                    <input id="category" 
                        type="text" 
                        onChange={e => setNewFundData(f => ({...f, category: e.target.value}))} 
                        value={newFundData.category}/>
                </div>
                <div>
                    <label htmlFor="fund_goal">Tiklas</label>
                    <input id="fund_goal" 
                        type="number" 
                        onChange={e => setNewFundData(f => ({...f, fund_goal: e.target.value}))} 
                        value={newFundData.fund_goal}/>
                </div>
            </div>
            <br />
            
            <div className="add-image" onClick={addImage} style={{ cursor: 'pointer', marginTop: '10px' }}>
                Pridėk nuotrauką
            </div>
        <div className="images">


        {
            images.map(image => 
                <div key={image.id} className="image-card">
                    <div className="controllers">
                        <input className='input-btn' id={image.id} type="file" onChange={e => readFile(e, image.id)}/>
                        <label htmlFor={image.id}>Pridėti</label>
                        <label><span onClick={() => deleteImage(image.id)}>Ištrinti</span></label>
                        <label onClick={() => mainImage(image.id)}>{image.main? 'M' : ''}</label>
                    </div>
                {
                    image.src? 
                    <div className="image-box">
                        <img src={image.src} alt="image" />
                    </div>
                    :
                    <div></div>
                }
                </div>
            )
        }
        </div>           
            <button onClick={submitNewFund} className="green-btn">Patvirtinti</button>
        </div>
    )
}

export default StartNewFund
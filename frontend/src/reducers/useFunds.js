import {create} from 'zustand';
import axios from 'axios';
import {v4} from 'uuid';

export const useFunds = create(set => ({
    loading: false,
    funds: [],
    images: [],
    // setImages: newimage => set(state => ({images: [...images, newimage]})),
    setFunds: newfund => set({...funds, newfund}),

    fetchFunds: async _ => {
        set({loading: true})
        try {
            const res = await axios.get('api/funds');
            const data = res.data.data;
            set({funds: data, loading: false})
        } catch(error) {
            console.log(error)
            set({loading: false});
        }
    },

    createNewFund: async (fund, images) => {

        if(!fund.title || !fund.description || !fund.category || !fund.fund_goal) {
            return ({success: false, message: 'uzpildyk visus laukelius'});
        }

        if(images.length === 0) {
            return ({success: false, message: 'Nuotrauka privalo buti'});
        }


        set({loading: true})
        console.log('naujas fondas =>', fund)
        let fund_id

        
        try {
            const resData = await axios.post('api/fund/new', fund, {withCredentials: true});
            // set({loading: false})
            // return res.data.data;
            fund_id = resData.data.data;
            
            if (!resData.data.success) {
                return ({success: false, message: 'nepavyko ikelti duomenu'})
            }
        } catch(error) {
            console.log(error)
            set({loading: false});
            return ({success:false, message: 'klaida ikelti duomenu'})
        }
        
        try {
            const res = await axios.post('api/fund/images', {images, fund_id});
            console.log(res)
            set({loading: false});
            return res.data
        } catch(error) {
            set({loading: false});
            console.log(error)
            return ({success:false, message: 'klaida ikelti nuotrauka'})
        }

    },
    updateFund: async fundID => {
        set({loading: true})
        try {
            const res = await axios.put('api/fund/update/:id', fundID, {withCredentials: true});
            set({loading: false})
            return res.data.data;
        } catch(error) {
            console.log(error)
            set({loading: false});
        }
    },
    deleteFund: async fundID => {
        set({loading: true})
        try {
            const res = await axios.delete(`/api/fund/delete/${fundID}`, {withCredentials: true});
            set({loading: false})
            set(state => ({
                funds: state.funds.filter(fund => fund.id !== fundID)
            }))
            return res.data;
        } catch(error) {
            console.log(error)
            set({loading: false});
        }
    },
    

    imageReader: img => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            console.log(img)
            reader.onload = _ => resolve(reader.result);
            reader.onerror = error => reject(error); 
        })
    
    },
    addImage: () =>
        set(state => {
          const isMain = state.images.length === 0;
          const newImage = {
            id: v4(),
            src: null,
            main: isMain,
          };
          return { images: [...state.images, newImage] };
    }),

    updateImage: (id, src) => {
        set(state => ({
            images: state.images.map(image => image.id === id? {...image, src} : image)
        }))
    },
    deleteImage: id => {
        set(state => ({
            images: state.images.filter(image => image.id !== id || image.main !== false)
        }))
    },
    mainImage: id => {
        set(state => ({
            images: state.images.map(image => image.id === id? {...image, main:true} : {...image, main:false})
        }))
    },
    
}));
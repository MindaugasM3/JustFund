import {create} from 'zustand';
import axios from 'axios';
import {v4} from 'uuid';

export const useFunds = create(set => ({
    loading: true,
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
    createNewFund: async fund => {

        if(!fund.title || !fund.description || !fund.category || !fund.fund_goal) {
            return ({success: false, message: 'uzpildyk visus laukelius'});
        }

        console.log('naujas fondas =>', fund)

        set({loading: true})
        try {
            const res = await axios.post('api/fund/new', fund, {withCredentials: true});
            set({loading: false})
            return res.data.data;
        } catch(error) {
            console.log(error)
            set({loading: false});
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
            const res = await axios.delete('/api/fund/delete/:id', fundID, {withCredentials: true});
            set({loading: false})
            return res.data.data;
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
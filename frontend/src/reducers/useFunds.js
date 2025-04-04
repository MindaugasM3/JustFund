import {create} from 'zustand';
import axios from 'axios';

export const useFunds = create(set => ({
    loading: true,
    funds: [],
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
            const res = await axios.post(('api/fund/new'), fund);
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
            const res = await axios.put(('api/fund/update/:id'), fundID);
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
            const res = await axios.delete(('api/fund/delete/:id'), fundID);
            set({loading: false})
            return res.data.data;
        } catch(error) {
            console.log(error)
            set({loading: false});
        }
    }
}));
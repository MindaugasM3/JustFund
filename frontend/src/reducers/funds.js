import {create} from 'zustand';
import axios from 'axios';

export const useFunds = create(set => ({
    loading: true,
    funds: [],
    setFunds: funds => set({funds}),

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
    }
}));
import {create} from 'zustand';
import axios from 'axios';

export const useUsers = create(set => ({
    loading: true,

    userRegister: async fund => {

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
    userLogin: async fundID => {
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
    userLogout: async fundID => {
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
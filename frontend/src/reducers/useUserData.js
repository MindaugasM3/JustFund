import {create} from 'zustand';
import axios from 'axios';

const useUserData = create(set => ({
    loading: true,
    funds: [],
    userProfileData: null,
    
    fetchUserProfileData: async _ => {
        set({loading: true});

        try{
            const res = await axios.get('/api/user/data', {withCredentials: true});
            const data = res.data.data;
            set({loading: false});
            console.log(data)
            return data;
        } catch(error) {
            set({loading: false});
            return console.log(error)
        }
    },
    updateUserData: async userData => {
        set({loading: true});

        try{
            const res = await axios.put('/api/user/update', userData, {withCredentials: true});
            const data = res.data;
            set({loading: false});
            console.log(data)
            return data;
        } catch(error) {
            set({loading: false});
            return console.log(error)
        }
    },

}));

export default useUserData;
import {create} from 'zustand';
import axios from 'axios';

export const useUsers = create(set => ({
    loading: true,
    loggedin: false,
    userData: [],
    setUserData: userData => set({loggedin: true, userData}),

    userRegister: async newUserData => {

        if(!newUserData.name || !newUserData.email || !newUserData.password) {
            return ({success: false, message: 'uzpildyk visus laukelius'});
        }

        console.log('naujas vartotojas =>', newUserData)

        set({loading: true})
        try {
            const res = await axios.post('/auth/user/register', newUserData);
            set({loading: false});
            console.log(res);
            return res.data;
        } catch(error) {
            console.log(error);
            set({loading: false});
            return error.response.data;
        }
    },
    userLogin: async loginData => {

        if(!loginData.name || !loginData.password){
            return ({success: false, message: 'Prašome užpildyk visus laukelius'})
        }

        console.log('login vartotojas =>', loginData)

        set({loading: true})
        try {
            const res = await axios.post('/auth/user/login', loginData);
            set({loading: false, loggedin: true});
            return res.data;
        } catch(error) {
            console.log(error);
            set({loading: false});
            return error.response.data;
        }
    },
    userLogout: async _ => {

        set({loading: true})

        try {
            const res = await axios.delete('/auth/user/logout', {withCredentials: true});
            set({loading: false, loggedin: false})
            return res.data.data;
        } catch(error) {
            console.log(error)
            set({loading: false});
            return error.response.data;
        }
    },
    checkForAuth: async _ => {
        set({loading: true})
        try {
            const res = await axios.get('/auth/user', {withCredentials: true})
            set({loading: false})
            console.log(res)
            return {success: true, data: res.data.user_id};
        } catch(error) {
            set({loading: false})
            console.log(error)
            return {success: false, error: error};
        }
    }

}));

export default useUsers;
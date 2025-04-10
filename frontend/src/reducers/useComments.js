import axios from 'axios';
import { v4 } from 'uuid';
import { create } from 'zustand';

const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

export const useComments = create((set) => ({
    comments: [],
    loading: true,
    
    fetchComments: async fund_id => {
        console.log(fund_id)
        set({loading: true})

        try{
            const res = await axios.get(frontendUrl+`/api/comments/${fund_id}`)
            const data = res.data.data;
            set({comments: data, loading: false})
            return data;

        }catch(error) {
            set({loading: false})
            console.log(error)
        }

    },
    writeComment: async commentData => {

        set({loading: true})

        try{
            const res = await axios.post(frontendUrl+`/api/comments/create`, commentData, {withCredentials: true})
            const data = res.data;
            set({loading: false})
            const date = new Date().toISOString();
            set(state => ({
                comments: [{...commentData, created_at: date, id: v4()}, ...state.comments]
            }));
            return data;

        }catch(error) {
            set({loading: false})
            console.log(error)
            return {success: false}
        }

    },
    updateComment: async commentData => {

        set({loading: true})

        try{
            const res = await axios.put(frontendUrl+`/api/comments/create`, commentData, {withCredentials: true})
            const data = res.data;
            set({loading: false})
            // const date = new Date().toISOString();
            set(state => ({
                comments: [{...commentData, id: v4()}, ...state.comments]
            }));
            return data;

        }catch(error) {
            set({loading: false})
            console.log(error)
            return {success: false}
        }

    },

}))
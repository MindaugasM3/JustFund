import axios from 'axios';
import { create } from 'zustand';

export const useComments = create(set => ({
    comments: [],
    loading: true,
    
    fetchComments: async fund_id => {

        set({loading: true})

        try{
            const res = await axios.get(`api/comments/${fund_id}`)
            const data = res.data.data;
            set({comments: data, loading: false})
            return data;

        }catch(error) {
            set({loading: false})
            console.log(error)
        }

    },
    writeComment: async (commentData) => {

        set({loading: true})

        try{
            const res = await axios.post(`api/comments/create`, commentData, {withCredentials: true})
            const data = res.data.data;
            set({loading: false})
            set(state => ({
                comments: [commentData, ...state.comments]
            }));
            return data;

        }catch(error) {
            set({loading: false})
            console.log(error)
            return {success: false}
        }

    },

}))
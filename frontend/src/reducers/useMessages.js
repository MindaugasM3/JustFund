import axios from "axios";
import { create } from "zustand";

const backUrl = import.meta.env.VITE_BACKEND_URL;

export const useMessages = create(set => ({
    usersList: [],
    loading: true,
    chatHistory: [],
    user_id: '',

    fetchUsers: async _ => {
        set({loading: true})

        try{
            const res = await axios.get(backUrl + '/chat/get/users', {withCredentials: true})
            console.log(res.data)
            set({loading: false})
            set({usersList: res.data.data})
            set({user_id: res.data.user_id})
        }catch(error){
            console.log(error)
            set({loading: false})
        }
    },
    fetchMessages: async id => {
        set({loading: true})

        const {chatHistory} = get()

        if(chatHistory[id]){
            set({loading: false})
            return
        }

        try{
            const res = await axios.get(backUrl + `/chat/get/messages/${id}`, {withCredentials: true})
            const messages = res.data.data;
            set(state => ({
                loading: false,
                chatHistory: {
                    ...state.chatHistory, [id]: messages
                }
            }))
        }catch(error){
            console.log(error)
            set({loading: false})
        }
    },
    saveNewMessages: async chatNewData => {
        set({loading: true})
        const date = new Date().toISOString();
        const chatNewDataWithDate = {...chatNewData, date}
        const {receiver_id} = chatNewData;
        
        set(state => ({
            chatHistory: {
                ...state.chatHistory, [receiver_id]: [
                    ...(state.chatHistory[receiver_id] || []),
                    chatNewData
                ]
            }
        }))

        try{
            const res = await axios.post(backUrl + '/chat/save/messages', chatNewData, {withCredentials: true})
            console.log(res)
            set({loading: false})
        }catch(error){
            console.log(error)
            set({loading: false})
        }
    }
}))
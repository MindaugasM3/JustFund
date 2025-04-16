import axios from "axios";
import { v4 } from "uuid";
import { create } from "zustand";

const backUrl = import.meta.env.VITE_BACKEND_URL;

export const useMessages = create((set, get) => ({
    usersList: [],
    loading: true,
    chatHistory: [],
    user_id: null,

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
            console.log(messages)
            set(state => ({
                loading: false,
                chatHistory: messages
            }))
        }catch(error){
            console.log(error)
            set({loading: false})
        }
    },
    saveNewMessages: async (chatNewData) => {
        set({loading: true})
        const date = new Date().toISOString();
        console.log(chatNewData)
        const chatNewDataWithDate = {...chatNewData, date}
        const {receiver_id} = chatNewData;
        // set(state => {
        // const alreadyExists = state.chatHistory.some(
        //     msg => String(msg.id) === String(chatNewData.id)
        // );

        // if (!alreadyExists) {
        //     return {
        // console.log(chatNewData)


        const {user_id} = get();
        if(user_id === chatNewData.sender_id){
            console.log('issaugojo')
            set(state => ({
                chatHistory: [...state.chatHistory, chatNewData]
            }));
            return;
        }

        set(state => ({
            chatHistory: [...state.chatHistory, chatNewData]
        }));
        //     };
        // }});

        
    

        try{
            const res = await axios.post(backUrl + '/chat/save/message', chatNewDataWithDate, {withCredentials: true})
            console.log(res)
            set({loading: false})
        }catch(error){
            console.log(error)
            set({loading: false})
        }
    }
}))
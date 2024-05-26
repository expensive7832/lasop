import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: false,
    info: {},
    token: null,
    payment: false
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginCtrl: (state, {payload}) =>{
            state.login = true
            state.token = payload
        },
        
        infoCtrl: (state, {payload}) =>{
            state.info = payload
        },
        activatePayment: (state) =>{
            state.payment = true
        }, 
        Logout: (state) =>{
            state.login = false
            state.token = null
            state.info = {}
        }
    }
})


export default userSlice.reducer
export const {loginCtrl, infoCtrl, activatePayment, Logout} = userSlice.actions
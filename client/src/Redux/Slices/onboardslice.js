import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: {},
  page: 1,
  id: null
}




const userSlice = createSlice({
  name: 'onboard',
  initialState,
  reducers: {
   
   addData: (state, action) => {
      state.userData = {...state.userData, ...action.payload}
  },

   setPage: (state) => {
      state.page = state.page < 3 ? state.page + 1 : 3
    },
   LastPage: (state) => {
      state.page =  3
    },
   goBack: (state) => {
      state.page = state.page - 1
    },

    clearData: (state) =>{
      state.userData = {}
      state.page = 1
    },
    setId: (state, action) =>{
      state.id =action.payload
    }
   
  },
})

// Action creators are generated for each case reducer function
export const { addData, setPage, LastPage, clearData, setId, goBack} = userSlice.actions

export default userSlice.reducer
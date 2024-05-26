import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  upload: []
}

const cohortSlice = createSlice({
  name: 'cohortfiles',
  initialState,
  reducers: {
   
   addFiles: (state, action) => {
    if(action.payload.length > 0){
        state.upload = [...state.upload, ...action.payload]
    }else{
        state.upload = [...state.upload, action.payload]
    }
     
  },

 
  },
})

// Action creators are generated for each case reducer function
export const { addFiles } = cohortSlice.actions

export default cohortSlice.reducer
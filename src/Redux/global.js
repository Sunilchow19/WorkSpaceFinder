
import { createSlice } from "@reduxjs/toolkit";



let globalObject=createSlice({
    name:"Global",
    initialState:{locationDet:[]},
    reducers:{
        loc:(state,action)=>{
            state.locationDet=[...state.locationDet,action.payload]
        }
    }
})

export let {loc}=globalObject.actions
export default globalObject.reducer
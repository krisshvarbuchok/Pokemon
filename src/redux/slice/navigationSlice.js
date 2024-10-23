import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
    name: 'navigation',
    initialState: 'pagination',
    reducers: {
        changeNavigation: (state, action) =>{
            return state = action.payload;
        }
    }
})
export const {changeNavigation} = navigationSlice.actions;
export default navigationSlice.reducer;
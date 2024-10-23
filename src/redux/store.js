import { configureStore } from "@reduxjs/toolkit";
import navigationSlice from './slice/navigationSlice';
import listSlice from './slice/listSlice';

const store = configureStore({
    reducer:{
        navigation: navigationSlice,
        list: listSlice,
    }
})
export default store;
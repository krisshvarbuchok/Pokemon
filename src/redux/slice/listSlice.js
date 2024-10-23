import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// const getCount = async () => {
//     const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1');
//     //console.log('count', response);
//     return response.data
// }
// const fetchGetCount = createAsyncThunk('count/fetchGetCount', async () => {
//     const data = await getCount();
//     console.log('count', data.count);
//     return data.count
// })

const getPokemon = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=20`);
    return response.data.results;
}
const fetchGetPokemon = createAsyncThunk('list/fetchGetPokemon', async () => {
    const data = await getPokemon();
    return data;
})
const getMoreAboutPokemon = async (name) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    //console.log('response', response.data);
    return response.data;
}
const fetchGetMoreAboutPokemon = createAsyncThunk('info/fetchGetMoreAboutPokemon', async (name) => {
    const data = await getMoreAboutPokemon(name);
    console.log('data', data);
    return data;
})

const listSlice = createSlice({
    name: 'list',
    initialState: {
        data: [],
        count: 0,
        info: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetPokemon.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGetPokemon.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(fetchGetPokemon.rejected, (state, action) => {
                state.error = 'failed'
                state.error = action.payload
            })
            .addCase(fetchGetMoreAboutPokemon.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGetMoreAboutPokemon.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.info.push(action.payload)
            })
    }
})
export { fetchGetPokemon, fetchGetMoreAboutPokemon };
export default listSlice.reducer;
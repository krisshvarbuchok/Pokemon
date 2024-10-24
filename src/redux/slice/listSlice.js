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

const getPokemon = async ({limit, offset}) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    return {results: response.data.results, count:response.data.count};
}
const fetchGetPokemon = createAsyncThunk('list/fetchGetPokemon', async (obj) => {
    const data = await getPokemon(obj);
    //console.log(data);
    
    return data;
})
const getMoreAboutPokemon = async (url) => {
    const response = await axios.get(url);
    console.log('response', response.data);
    return {name: response.data.name, img: response.data.sprites.front_default, id: response.data.id};
}
const fetchGetMoreAboutPokemon = createAsyncThunk('info/fetchGetMoreAboutPokemon', async (url) => {
    const data = await getMoreAboutPokemon(url);
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
    reducers: {
        clearInfo: (state, action) => {
            state.info = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetPokemon.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGetPokemon.fulfilled, (state, action) => {
                const {results, count} = action.payload
                console.log(count);
                
                state.status = 'succeeded'
                state.data = results
                state.count = count
            })
            .addCase(fetchGetPokemon.rejected, (state, action) => {
                state.error = 'failed'
                state.error = action.payload
            })
            .addCase(fetchGetMoreAboutPokemon.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGetMoreAboutPokemon.fulfilled, (state, action) => {
                const {name, img, id} = action.payload
                state.status = 'succeeded'
                state.info.push({name: name, [name]: {img: img, id: id}});
            })
    }
})
export const {clearInfo} = listSlice.actions;
export { fetchGetPokemon, fetchGetMoreAboutPokemon };
export default listSlice.reducer;
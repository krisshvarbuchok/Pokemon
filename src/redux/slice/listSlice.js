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
const getPokemonScroll = async ({limit, offset}) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    return {results: response.data.results, count:response.data.count};
}

const fetchGetPokemonForScroll = createAsyncThunk('list/fetchGetPokemonForScroll', async (obj) => {
    console.log('дошло');
    
    const data = await getPokemonScroll(obj);
    console.log('go', data);
    
    return data;
})
const getMoreAboutPokemon = async (url) => {
    const response = await axios.get(url);
    //console.log('responseMore', response.data);
    return {name: response.data.name, img: response.data.sprites.front_default, id: response.data.id};
}
const fetchGetMoreAboutPokemon = createAsyncThunk('info/fetchGetMoreAboutPokemon', async (url) => {
    const data = await getMoreAboutPokemon(url);
    //console.log('dataMore', data);
    return data;
})
const getMoreAboutPokemonScroll = async (url) => {
    const response = await axios.get(url);
    console.log('responseMore', response.data);
    return {name: response.data.name, img: response.data.sprites.front_default, id: response.data.id};
}
const fetchGetMoreAboutPokemonScroll = createAsyncThunk('info/fetchGetMoreAboutPokemonScroll', async (url) => {
    console.log('fetchGetMoreAboutPokemonScroll');
    
    const data = await getMoreAboutPokemonScroll(url);
    console.log('dataMore', data);
    return data;
})

const listSlice = createSlice({
    name: 'list',
    initialState: {
        data: [],
        count: 0,
        info: [],
        dataScroll: [],
        infoScroll: [],
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
                //console.log(count);
                
                state.status = 'succeeded'
                state.data = results
                state.count = count
            })
            .addCase(fetchGetPokemon.rejected, (state, action) => {
                state.error = 'failed'
                state.error = action.payload
            })
            .addCase(fetchGetPokemonForScroll.fulfilled, (state, action) =>{
                const {results, count} = action.payload
                //console.log(count);
                
                state.status = 'succeeded'
                state.dataScroll = results
                state.count = count
            })
            .addCase(fetchGetMoreAboutPokemon.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGetMoreAboutPokemon.fulfilled, (state, action) => {
                const {name, img, id} = action.payload
                state.status = 'succeeded'
                state.info.push({name: name, [name]: {img: img, id: id}});
            })
            .addCase(fetchGetMoreAboutPokemonScroll.fulfilled, (state, action) => {
                const {name, img, id} = action.payload
                state.status = 'succeeded'
                state.infoScroll.push({name: name, [name]: {img: img, id: id}});
            })
    }
})
export const {clearInfo} = listSlice.actions;
export { fetchGetPokemon, fetchGetPokemonForScroll, fetchGetMoreAboutPokemon, fetchGetMoreAboutPokemonScroll };
export default listSlice.reducer;
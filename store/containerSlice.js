import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    containers: [],
    container: undefined,
    searchText: '',
};

export const containerSlice = createSlice({
    name: 'container',
    initialState,
    reducers: {
        setContainers: (state, { payload }) => {
            console.log('setContainers');
            state.containers = payload;
        },
        setContainer: (state, { payload }) => {
            console.log('setContainer', payload);
            state.container = payload;
        },
        setSearch: (state, { payload }) => {
            state.searchText = payload
        },
        resetContainer: (state) => {
            console.log('resetContainer');
            state.container = undefined;
        },
    },
});

export const containerReducer = containerSlice.reducer;

export const { setContainers, setContainer, setSearch, resetContainer } = containerSlice.actions;
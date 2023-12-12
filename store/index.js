import { configureStore } from '@reduxjs/toolkit';
import { containerReducer } from './containerSlice';

export const store = configureStore({ reducer: { container: containerReducer } });
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../../config/axios.config';
import { API_ENDPOINTS } from '../../../shared/api-endpoints';

// Define the type for the Pagination argument
interface Pagination {
  limit: number;
  offset: number;
}

export const GetAllProducts: any = createAsyncThunk(
  'GetAllProducts',
  async (pagination: Pagination) => {
    try {
      const { data } = await API.post(API_ENDPOINTS.GET_ALL_PRODUCTS, pagination);
	  console.log("alldataformat",data?.data)
      return data?.data;
    } catch (GetAllProductsErr: any) {
      return GetAllProductsErr?.response?.data;
    }
  }
);

const GetAllProductsSlice = createSlice({
	name: 'GetAllProducts',
	initialState: {
	  GetAllProductsData: [],
	  GetAllProductsLoad: false,
	  GetAllProductsErr: ''
	},
	reducers: {
	  reset: (state) => {
		state.GetAllProductsData = [];
		state.GetAllProductsLoad = false;
		state.GetAllProductsErr = '';
	  }
	},
	extraReducers: (builder) => {
	  builder
		.addCase(GetAllProducts.fulfilled, (state:any, action: any) => {
		  state.GetAllProductsLoad = false;
  
		  // Ensure payload is an array before appending
		  const newProducts = Array.isArray(action.payload) ? action.payload : [];
  
		  // Append new products to existing products
		  state.GetAllProductsData = [...state.GetAllProductsData, ...newProducts];
		  state.GetAllProductsErr = '';
		})
		.addCase(GetAllProducts.pending, (state) => {
		  state.GetAllProductsLoad = true;
		})
		.addCase(GetAllProducts.rejected, (state, action: any) => {
		  state.GetAllProductsLoad = false;
		  state.GetAllProductsErr = action.payload;
		});
	}
  });
  

export const { reset: resetGetAllProducts } = GetAllProductsSlice.actions;
export const GetAllProductsReducer = GetAllProductsSlice.reducer;

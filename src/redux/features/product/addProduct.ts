import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../../config/axios.config';
import { API_ENDPOINTS } from '../../../shared/api-endpoints';

export const AddNewProduct: any = createAsyncThunk('AddNewProduct', async (formData: any) => {
	try {
		const { data } = await API.post(API_ENDPOINTS.ADD_NEW_PRODUCT, formData);
		return data;
	} catch (AddNewProductErr: any) {
		return AddNewProductErr?.response?.data;
	}
});
const AddNewProductSlice = createSlice({
	name: 'AddNewProduct',
	initialState: {
		AddNewProductData: [],
		AddNewProductLoad: false,
		AddNewProductErr: ''
	},
	reducers: {
		reset: (state) => {
			state.AddNewProductData = [];
			state.AddNewProductLoad = false;
			state.AddNewProductErr = '';
		}
	},
	extraReducers: (builder) => {
		builder.addCase(AddNewProduct.fulfilled, (state, action: any) => {
			state.AddNewProductLoad = false;
			state.AddNewProductData = action.payload;
			state.AddNewProductErr = '';
		});

		builder.addCase(AddNewProduct.pending, (state) => {
			state.AddNewProductLoad = true;
		});

		builder.addCase(AddNewProduct.rejected, (state, action: any) => {
			state.AddNewProductLoad = false;
			state.AddNewProductData = [];
			state.AddNewProductErr = action.payload;
		});
	}
});

export const { reset: resetAddNewProduct } = AddNewProductSlice.actions;
export const AddNewProductReducer = AddNewProductSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../../config/axios.config';
import { API_ENDPOINTS } from '../../../shared/api-endpoints';

export const GetMasterCategory: any = createAsyncThunk('GetMasterCategory', async () => {
	try {
		const { data } = await API.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
		return data;
	} catch (GetMasterCategoryErr: any) {
		return GetMasterCategoryErr?.response?.data;
	}
});
const GetMasterCategorySlice = createSlice({
	name: 'GetMasterCategory',
	initialState: {
		GetMasterCategoryData: [],
		GetMasterCategoryLoad: false,
		GetMasterCategoryErr: ''
	},
	reducers: {
		reset: (state) => {
			state.GetMasterCategoryData = [];
			state.GetMasterCategoryLoad = false;
			state.GetMasterCategoryErr = '';
		}
	},
	extraReducers: (builder) => {
		builder.addCase(GetMasterCategory.fulfilled, (state, action: any) => {
			state.GetMasterCategoryLoad = false;
			state.GetMasterCategoryData = action.payload;
			state.GetMasterCategoryErr = '';
		});

		builder.addCase(GetMasterCategory.pending, (state) => {
			state.GetMasterCategoryLoad = true;
		});

		builder.addCase(GetMasterCategory.rejected, (state, action: any) => {
			state.GetMasterCategoryLoad = false;
			state.GetMasterCategoryData = [];
			state.GetMasterCategoryErr = action.payload;
		});
	}
});

export const { reset: resetGetMasterCategory } = GetMasterCategorySlice.actions;
export const GetMasterCategoryReducer = GetMasterCategorySlice.reducer;

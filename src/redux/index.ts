import { combineReducers } from 'redux';
import Auth from '../appRedux/reducers/Auth';
import Common from '../appRedux/reducers/Common';
import Settings from '../appRedux/reducers/Settings';
import { appTakenSlice, logoutSlice, setDefaultRole, switchRoleSlice } from './features/auth/Authentication';
import { GetAllProductsReducer } from './features/product/getAllProduct';
import { AddNewProductReducer } from './features/product/addProduct';
import { GetMasterCategoryReducer } from './features/product/getAllCategories';

export default combineReducers({
	settings: Settings,
	auth: Auth,
	common: Common,
	appToken: appTakenSlice,
	switchRole: switchRoleSlice,
	logout: logoutSlice,
	setDefaultRole: setDefaultRole,
	GetAllProductAction:GetAllProductsReducer,
	AddNewProductAction:AddNewProductReducer,
	GetMasterCategoryAction:GetMasterCategoryReducer,
});

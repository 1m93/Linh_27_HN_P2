import { combineReducers } from "redux";
import browserProductsReducer from "./browseProducts";
import discoverProductsReducer from "./discoverProducts";
import navbarReducer from "./navbar";
import productDetailReducer from "./productDetail";
import sidebarReducer from "./sidebar";
import authReducer from "./auth";
import cartRedudcer from "./cart";
import orderReducer from "./order";
import adminReducer from "./admin";

const rootReducer = combineReducers({
	discoverProducts: discoverProductsReducer,
	sidebar: sidebarReducer,
	browseProducts: browserProductsReducer,
	navbar: navbarReducer,
	productDetail: productDetailReducer,
	auth: authReducer,
	cart: cartRedudcer,
	order: orderReducer,
	admin: adminReducer,
});

export default rootReducer;

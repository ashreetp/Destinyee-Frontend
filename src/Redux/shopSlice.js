import {createSlice} from '@reduxjs/toolkit'

export const shopSlice = createSlice({
	name: "shops",
	initialState: {
		products: [],
		refresh_products: [],
		changed_products: [],
		cart_details: [],
		refresh_search: []
	},
	reducers:{
		setProducts: (state,action) => {
			state.products=action.payload
			state.changed_products=action.payload
		},
		setChanged_products: (state,action) => {
			state.changed_products=action.payload
		},
		setRefresh_products: (state,action) => {
			state.refresh_products=action.payload
		},
		setRefresh_search: (state,action) => {
			state.refresh_search=action.payload
		},
		setCart_details: (state,action) => {
			state.cart_details=action.payload
		},
	},
});

export const {setRefresh_search,setCart_details,setProducts,setChanged_products,setRefresh_products} =shopSlice.actions

export const selectRefresh_search = (state) => state.shops.refresh_search

export const selectProducts = (state) => state.shops.products

export const selectCart_details = (state) => state.shops.cart_details

export const selectChanged_products = (state) => state.shops.changed_products

export const selectRefresh_products = (state) => state.shops.refresh_products

export default shopSlice.reducer

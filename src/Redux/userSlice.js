import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
	name: "users",
	initialState: {
		user: (sessionStorage.getItem("login"))?window.atob(sessionStorage.getItem("login")):null,
		cart: [],
		quantities: [],
		filter: [],
		navbar: []
	},
	reducers:{
		setUser: (state,action) => {
			state.user=action.payload.data
		},
		logout:(state) =>{
			state.user= null
		},
		setCart: (state,action) => {
			state.cart.push(action.payload)
		},
		setQuant: (state,action) => {
			state.quantities.push(action.payload.quantities)
		},
		setFilter: (state,action) => {
			state.filter.push(action.payload)
		},
		setNavbar: (state,action) => {
			state.navbar.push(action.payload)
		},
		remQuant:(state,action) =>{
			state.quantities.filter(dat=> dat.name!=action.payload.quantities.name)
		}
	},
});

export const {setNavbar,setFilter,remQuant,setUser,logout,setCart,setQuant} =userSlice.actions

export const selectUser = (state) => state.users.user

export const selectQuant = (state) => state.users.quantities

export const selectNav = (state) => state.users.navbar

export const selectFilter = (state) => state.users.filter

export const selectCart = (state) => state.users.cart

export default userSlice.reducer

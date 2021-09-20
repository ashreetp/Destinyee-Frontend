import {createSlice} from '@reduxjs/toolkit'

export const adminSlice = createSlice({
	name: "admin",
	initialState: {
		admin_name: (sessionStorage.getItem("admin"))?sessionStorage.getItem("admin"):null,
	},
	reducers:{
		setAdmin_name: (state,action) => {
			state.admin_name=action.payload.data
		}
    }
});

export const {setAdmin_name} =adminSlice.actions

export const selectAdmin = (state) => state.admin.admin_name

export default adminSlice.reducer


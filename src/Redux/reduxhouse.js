import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import shopReducer from './shopSlice'
import adminReducer from './adminSlice'

export default configureStore({
	reducer: {
		users: userReducer,
		shops: shopReducer,
		admin: adminReducer
	},
	// devTools: false,
})
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import userReducer from "./SliceUser"
import persistStore from "redux-persist/es/persistStore";
import AdminReducer from "./AdminSlice"


const persistConfig ={
    key:'root',
    type: 'persist/PERSIST',
    storage,
}

const rootReducer = combineReducers({
    User_data:userReducer,
    Admin_data:AdminReducer


})

const PersistedReducer = persistReducer(persistConfig,rootReducer)

const appStore = configureStore({

    reducer:PersistedReducer
    
});

const persist=persistStore(appStore)

export {persist,appStore}


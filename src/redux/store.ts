import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
// import { thunk } from "redux-thunk"
import reducer from "./reducer"
import { persistStore, persistReducer } from "redux-persist"

const persistConfig = {
    key: "root",
    storage,
    whitelist: [],
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // You can customize or disable middleware options here
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)

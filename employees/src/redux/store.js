// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// // Persist Configuration
// const persistConfig = {
//   key: "root",
//   storage,
//   version: 1,
// };

// // Combine Reducers
// const rootReducer = combineReducers({
//   auth: authReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure Store
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// const store = configureStore({
//   reducer: persistedReducer,
// });
// export const persistor = persistStore(store);
// export default store;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Combine Reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Persist Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor
export const persistor = persistStore(store);

export default store;

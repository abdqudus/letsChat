import {
  Middleware,
  applyMiddleware,
  compose,
  createStore,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";
import contactMiddleware from "../utils/onlineStatus";

export type RootState = ReturnType<typeof rootReducer>;
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
  contactMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

// const middleWares = [
//   process.env.NODE_ENV === "development" && logger,
//   sagaMiddleware,
// ].filter(Boolean);
// This was the previous state without typescript.
// The ...middlewarees part of composedEnhancer threw an error so the code had to rewritten like this.
// The reason for this error is as follows:
// Applymiddleware is only expecting middlewares.
// However, since  process.env.NODE_ENV === "development"  could evaluate to false,
// Typescript thinks that the array of middleware might contain a boolean value.
// However, we know that the filter function will filter out any boolean value.
// So, to tell Typescript that it would never contain any boolean vale, we use the type predicate function.
// When you are confused about what this block is doing,
// just comment out the middlewares in line 27 and uncomment that in line 32

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const composedEnhancer = composeEnhancer(applyMiddleware(...middleWares));
const store = createStore(persistedReducer, undefined, composedEnhancer);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export default store;

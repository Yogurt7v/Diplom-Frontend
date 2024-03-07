import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {thunk} from "redux-thunk";
import {appReducer,userReducer} from "./reducers"
import { productReducer, productsReducer } from "./reducers";


const reducer = combineReducers({
    app: appReducer,
    user: userReducer,
    product: productReducer,
    products: productsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {thunk} from "redux-thunk";
import {appReducer,userReducer,  productReducer, productsReducer, busketReducer} from "./reducers"


const reducer = combineReducers({
    app: appReducer,
    user: userReducer,
    product: productReducer,
    products: productsReducer,
    busket: busketReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store
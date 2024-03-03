import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {thunk} from "redux-thunk";
import {userReducer} from "./reducers"


const reducer = combineReducers({
    user: userReducer,
    // users: usersReducer,
    // post: postReducer,
    // product: productReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {thunk} from "redux-thunk";
import {appReducer,userReducer} from "./reducers"


const reducer = combineReducers({
    app: appReducer,
    user: userReducer,
    // users: usersReducer,
    // post: postReducer,
    // product: productReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store
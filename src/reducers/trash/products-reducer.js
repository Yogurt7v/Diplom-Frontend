import { ACTION_TYPE } from "../actions";

const initialProductsState = {

};
export const productsReducer = (state = initialProductsState, action) => {
    switch (action.type) {

        case ACTION_TYPE.GET_ALL_PRODUCTS: {
            return {
                ...state,
                ...action.payload
            }
        }
        case ACTION_TYPE.CLEAR_ALL_PRODUCTS: {
            return initialProductsState
        }
        default: {
            return state;
        }
    }
}
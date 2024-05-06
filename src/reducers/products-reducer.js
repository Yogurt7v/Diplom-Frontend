import { ACTION_TYPE } from "../actions";

const initialProductsState = {

};
export const productsReducer = (state = initialProductsState, action) => {
    switch (action.type) {

        case ACTION_TYPE.SET_PRODUCT_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        case ACTION_TYPE.CLEAR_PRODUCTS: {
            return initialProductsState
        }
        default: {
            return state;
        }
    }
}
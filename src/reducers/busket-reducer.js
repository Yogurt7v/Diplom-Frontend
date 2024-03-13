import { ACTION_TYPE } from "../actions";

const initialBusketState = {
    productId: "",
    currentUser: {
        id: "",
        login: "",
        password: "",
        roleId: "",
    },
    productName: "",
    quntity: "",
    price:"", 
};


export const busketReducer = (state = initialBusketState, action) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_BUSKET_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case ACTION_TYPE.REMOVE_BUSKET_DATA: {
        return {
            ...state,
            ...action.payload,
          };
    }
    default: {
      return state;
    }
  }
};

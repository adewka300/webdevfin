import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY } from '../actions/cartActions';

const initialState = {
    cartItems: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.id === item.id);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.id === existItem.id ? { ...item, qty: existItem.qty + 1 } : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...item, qty: 1 }],
                };
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.id !== action.payload),
            };
        case INCREASE_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map((x) =>
                    x.id === action.payload ? { ...x, qty: x.qty + 1 } : x
                ),
            };
        case DECREASE_QUANTITY:
            const targetItem = state.cartItems.find((x) => x.id === action.payload);
            if (targetItem.qty === 1) {
                return {
                    ...state,
                    cartItems: state.cartItems.filter((x) => x.id !== action.payload),
                };
            } else {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.id === action.payload ? { ...x, qty: x.qty - 1 } : x
                    ),
                };
            }
        default:
            return state;
    }
};

export default cartReducer;

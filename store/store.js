import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";

// initial states here

const initalState = {};

// middleware
const middleware = [thunk];

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count.count) {
      nextState.count.count = state.count.count;
    } // preserve count value on client side navigation
    if (state.cart.cart.length > 0) {
      nextState.cart.cart = state.cart.cart;
    } // preserve cart value on client side navigation
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};
// creating store
export const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

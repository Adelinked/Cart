import { INC_ITEM, DEC_ITEM, REMOVE_ITEM, FETCH_ITEMS } from "../types";

export const setCart = (p, id) => async (dispatch) => {
  dispatch({ type: p, payload: id });
};

export const loadingCart = () => async (dispatch) => {
  dispatch({ type: "LOADING_CART", payload: [] });
};

export const fetchItems = (p) => async (dispatch) => {
  dispatch(loadingCart());
  const url = p === 1 ? "http://localhost:3000/api/" : "./api/";
  const response = await fetch(url);
  const cart = await response.json();

  dispatch({ type: "FETCH_ITEMS", payload: cart });
};

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import {
//   Row,
//   Col,
//   ListGroup,
//   Image,
//   Form,
//   Button,
//   Card,
// } from "react-bootstrap";
// import { Message } from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Actions/cartAction";
/**
 * @author
 * @function CartScreen
 **/

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  console.log(qty);

  const dispatch = useDispatch();

  //   const cart = useSelector((state) => state.cart);
  //   const { loading, error, product } = productDetails;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return <></>;
};

export default CartScreen;

import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { Safepay } from "@sfpy/node-sdk";
import { Link } from "react-router-dom";

const SafePayment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const [url, seturl] = useState("");

  const dispatch = useDispatch();

  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const makePayment = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const safepay = new Safepay({
        environment: "sandbox",
        apiKey: "sec_c0921699-010a-4331-b3da-158a372f6c0d",
        v1Secret: "bar",
        webhookSecret: "foo",
      });
      const { token } = await safepay.payments.create({
        amount: 10000,
        currency: "PKR",
      });

      // Pass `token` to create checkout link
      const url = safepay.checkout.create({
        token,
        orderId: "T800",
        cancelUrl: "http://localhost:3000/363t",
        redirectUrl: "http://localhost:3000/success",
        source: "custom",
        webhooks: true,
      });

      seturl(url);

      window.location = url

      // history.push(url);

      // redirect user to `url`
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => makePayment(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
          </div>
          <div>
            <EventIcon />
          </div>
          <div>
            <VpnKeyIcon />
          </div>
       
            <button
              type="submit"
              value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
              ref={payBtn}
              className="paymentFormBtn"
            >
              Pay Now
            </button>
      
        </form>
      </div>
    </Fragment>
  );
};

export default SafePayment;

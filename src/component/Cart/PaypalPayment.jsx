import React, { useEffect, useState } from "react";
import {
  usePayPalScriptReducer,
  PayPalButtons,
  PayPalMarks,
} from "@paypal/react-paypal-js";
import axios from "axios";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import "./payment.css";
import { backend_api } from "../../utils/backend_api";
const PaypalPayment = () => {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { totalPrice } = JSON.parse(sessionStorage.getItem("orderInfo"));
  const loadPaypalScript = async () => {
    const {
      data: { paypalApiKey },
    } = await axios.get(`${backend_api}/api/v1/payment/paypalapikey`);

    paypalDispatch({
      type: "resetOptions",
      value: {
        "client-id": paypalApiKey,
        currency: "USD",
      },
    });

    paypalDispatch({ type: "setLoadingStatus", value: "pending" });
  };

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        // dispatch({ type: "PAY_REQUEST" });
        // const { data } = await axios.put(
        //   `/api/orders/${order._id}/pay`,
        //   details,
        //   {
        //     headers: { authorization: `Bearer ${userInfo.token}` },
        //   }
        // );
        // dispatch({ type: "PAY_SUCCESS", payload: data });
        toast.success("Order is paid");
      } catch (err) {
        // dispatch({ type: "PAY_FAIL", payload: getError(err) });
        console.log(err);
        toast.error("Failed to pay");
      }
    });
  }
  function onError(err) {
    console.log(err);
    toast.error("Failed to pay");
  }

  useEffect(() => {
    loadPaypalScript();
  }, []);
  return (
    <div className="paypalContainer">
      {isPending ? (
        <Loader />
      ) : (
        <div className="buttons">
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          ></PayPalButtons>{" "}
          {/* <PayPalMarks fundingSource={undefined} /> */}
        </div>
      )}
    </div>
  );
};

export default PaypalPayment;

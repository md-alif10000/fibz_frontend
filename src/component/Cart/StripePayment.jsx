import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { backend_api } from "../../utils/backend_api";
import "./payment.css";
const StripePayment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const [stripeToken, setstripeToken] = useState(null);

  const { user } = useSelector((state) => state.user);

  const onToken = (token) => {
    setstripeToken(token);
    // axios
    //   .post("/api/v1/payment/stripe_process", {
    //     description,
    //     source: token.id,
    //     currency: "USD",
    //     amount: orderInfo.totalPrice,
    //   })
    //   .then(() => window.alert("Success"))
    //   .catch(() => window.alert("Failed"));
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(`${backend_api}/api/v1/payment/stripe_process`, {
          tokenId: stripeToken.id,
          amount: orderInfo.totalPrice * 100,
        });

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <div className="stripe_container">
      <h2>Pay With Your VISA/MASTER/CREDIT Card</h2>
      <h3>Please,Click on the button to process payment</h3>
      <StripeCheckout
        name="Mr Marvel"
        billingAddress
        shippingAddress
        description={"Your total is"}
        amount={orderInfo.totalPrice * 100}
        token={onToken}
        // currency={"USD"}
        stripeKey={
          "pk_test_51KqsYOEB6Tsc76QKCoDOmoQF8lzcMBBBw5a7PD4DqIBLmtRGUBRyOPbCaRolIYtO4UFlKhRrs8rtxh8AqkceKi7600xw5kGzO8"
        }
      >
        <button>Pay With Dabit or Credit Card</button>
      </StripeCheckout>
    </div>
  );
};

export default StripePayment;

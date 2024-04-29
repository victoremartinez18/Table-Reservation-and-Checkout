import React, { useState, useEffect } from "react";
import debug from "sabio-debug";
import { loadStripe } from "@stripe/stripe-js";
import checkoutService from "services/checkoutService";
import { toast } from "react-toastify";
import "../Reservation/reservation.css";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const _logger = debug.extend("CheckoutButton");

const CheckoutButton = ({ payload }) => {
  const [sessionData, setSessionData] = useState({
    id: "",
  });

  const apiKey = // private key.
    useEffect(() => {
      if (sessionData.id !== "") {
        sessionStorage.setItem("sessionId", sessionData.id);

        loadStripe(apiKey).then(onLoadSuccess).catch(onLoadError);
      }
    }, [sessionData.id]);

  function onLoadSuccess(stripeObj) {
    return stripeObj.redirectToCheckout({ sessionId: sessionData.id });
  }

  function onLoadError(error) {
    _logger(error);

    toast.error("Error loading Checout.", {
      position: "top-right",
    });
  }

  const onCheckoutBtnClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed to Checkout",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.setItem("tableId", payload.tableId);
        sessionStorage.setItem("date", payload.date);
        sessionStorage.setItem("total", payload.Total);

        checkoutService
          .checkoutSession(payload)
          .then(onCreateSessionSuccess)
          .catch(onCreateSessionError);
      }
    });
  };

  function onCreateSessionSuccess(response) {
    toast.success("Moving to Checkout.", {
      position: "top-right",
    });
    let createdSessionId = response.item;

    setSessionData((prevState) => {
      let newState = { ...prevState };
      newState.id = createdSessionId;
      return newState;
    });
  }

  function onCreateSessionError(error) {
    _logger(error);
    toast.error("Error loading Checkout.", {
      position: "top-right",
    });
  }

  return (
    <React.Fragment>
      <button
        type="button"
        id="checkout-button"
        className="res-Checkout"
        onClick={onCheckoutBtnClick}
      >
        Checkout
      </button>
    </React.Fragment>
  );
};

CheckoutButton.propTypes = {
  payload: PropTypes.shape({
    Total: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tableId: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  }),
};

export default CheckoutButton;

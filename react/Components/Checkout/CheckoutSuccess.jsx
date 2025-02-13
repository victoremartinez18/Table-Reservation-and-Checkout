import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import reservationService from "services/reservationService";
import "../Reservation/reservation.css";

function CheckoutSuccess() {
  const navigate = useNavigate();


  const [payload] = useState({
    CouponCode: "",
    DiscountValue: 0,
    Total: sessionStorage.getItem("total"),
    ChargeId: "TestFromPostman",
    PaymentAccountId: 44,
    BillingAddressId: 1,
    CreatedBy: 1,
    TableId: sessionStorage.getItem("tableId"),
    BookingStatusId: 3,
    BatchReservationItems: [
      {
        TableId: sessionStorage.getItem("tableId"),
        Start: sessionStorage.getItem("date"),
        End: sessionStorage.getItem("date"),
      },
    ],
  });

  const [reservationData, setReservationData] = useState();
  const [venueId, setVenueId] = useState();

  useEffect(() => {
    if (
      sessionStorage.getItem("total") === "undefined" ||
      sessionStorage.getItem("total") === null
    ) {
      navigate(`/reservation?id=1`); //This should be the path for the venue information page. Needs to be replaced when rout is merge for venue information.
    } else {
      setVenueId(sessionStorage.getItem("venueId"));
      reservationService
        .addReservation(payload)
        .then(onAddReservationSuccess)
        .catch(onAddReservationError);
    }
  }, []);

  const onAddReservationSuccess = (Response) => {
    toast.success("Reservation was Successfully created!", {
      position: "top-right",
    });
    sessionStorage.clear();
    setReservationData(Response.item);
  };

  const onAddReservationError = (error) => {
    _logger(error);
    toast.error("Error creating reservation.", {
      position: "top-right",
    });
  };

  const onContinueClicked = () => {
    navigate(`/reservation?id=${venueId}`); //This should be the path for the venue information page. Needs to be replaced when rout is merge for venue information.
    sessionStorage.clear();
  };

  return (
    <React.Fragment>
      <section className="res-success">
        <div className="res-success-message">
          <h3>Reservation #: {reservationData}</h3>
          <h3>
            We appreciate your business! If you have any questions, please
            email:
            <a href="mailto:orders@example.com"> orders@example.com</a>.
          </h3>
          <div className="res-success-btn-container">
            <button
              type="button"
              id="checkout-button"
              className="res-success-btn"
              onClick={onContinueClicked}
            >
              Continue
            </button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default CheckoutSuccess;

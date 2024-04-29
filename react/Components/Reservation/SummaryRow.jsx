import React from "react";
import PropTypes from "prop-types";
import "../Reservation/reservation.css";

function SummaryRow({ row }) {
  if (row.rowType === "prod") {
    let totalQty = row.quantity * row.price;

    return (
      <tr>
        <td>{row.quantity}</td>
        <td>{row.name}</td>
        <td>${row.price.toFixed(2)}</td>
        <td>${totalQty.toFixed(2)}</td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{row.quantity}</td>
        <td>{row.name}</td>
        <td>{row.capacity}</td>
        <td>${row.price.toFixed(2)}</td>
      </tr>
    );
  }
}

SummaryRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    capacity: PropTypes.number.isRequired,
    rowType: PropTypes.string.isRequired,
  }),
};

export default SummaryRow;

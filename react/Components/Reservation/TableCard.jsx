import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
} from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "../Reservation/reservation.css";

function TableCard({ tableObj, tableHandler }) {
  const onCardClicked = () => {
    tableHandler(tableObj);
  };

  return (
    <React.Fragment>
      <Card className="res-card" onClick={onCardClicked}>
        {tableObj.isSelected && (
          <FontAwesomeIcon className="res-card-check" icon={faCheckCircle} />
        )}

        <img
          alt="Sample"
          src="https://img.freepik.com/free-photo/table-dinner-set_74190-1534.jpg"
        />
        <CardBody>
          <CardTitle tag="h5">{tableObj.name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            ${tableObj.price.toFixed(2)}
          </CardSubtitle>
          <CardText>Capacity: {tableObj.capacity}</CardText>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

TableCard.propTypes = {
  tableObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    capacity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    statusType: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),
  tableHandler: PropTypes.shape({
    tableHandler: PropTypes.func.isRequired,
  }),
};

export default TableCard;

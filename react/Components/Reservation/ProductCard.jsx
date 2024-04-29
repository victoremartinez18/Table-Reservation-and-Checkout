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
import {
  faCheckCircle,
  faPlusSquare,
  faMinusSquare,
} from "@fortawesome/free-solid-svg-icons";

import "../Reservation/reservation.css";

function ProductCard({ product, handler, quantityHandler }) {
  const onCardClicked = () => {
    if (product.isSelected) {
      product = { ...product, quantity: 1 };
      handler(product);
    } else {
      handler(product);
    }
  };

  const onPlusClicked = () => {
    product = { ...product, quantity: product.quantity + 1 };
    quantityHandler(product);
  };

  const onMinusClicked = () => {
    product = { ...product, quantity: product.quantity - 1 };
    quantityHandler(product);
  };

  const total = product.price * product.quantity;

  return (
    <React.Fragment>
      <Card className="res-card">
        {product.isSelected && (
          <FontAwesomeIcon className="res-card-check" icon={faCheckCircle} />
        )}

        <img
          onClick={onCardClicked}
          alt="Sample"
          src="https://picsum.photos/300/200"
        />
        <div className="res-quantity-container">
          <span>
            {product.quantity === 1 ? (
              <FontAwesomeIcon
                className="res-card-qty-disabled res-card-minus"
                icon={faMinusSquare}
              />
            ) : (
              <FontAwesomeIcon
                className="res-card-qty res-card-minus"
                icon={faMinusSquare}
                onClick={onMinusClicked}
              />
            )}

            {` ${product.quantity} `}

            {product.quantity === 10 ? (
              <FontAwesomeIcon
                className="res-card-qty-disabled res-card-minus"
                icon={faMinusSquare}
              />
            ) : (
              <FontAwesomeIcon
                className="res-card-qty res-card-plus"
                icon={faPlusSquare}
                onClick={onPlusClicked}
              />
            )}
          </span>
        </div>
        <CardBody onClick={onCardClicked}>
          <CardTitle tag="h5">{product.name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            ${total.toFixed(2)}
          </CardSubtitle>
          <CardText>{product.description}</CardText>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    productType: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),

  handler: PropTypes.func.isRequired,
  quantityHandler: PropTypes.func.isRequired,
};

export default ProductCard;

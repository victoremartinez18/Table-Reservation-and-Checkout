import React, { useState, useEffect } from "react";
import "../Reservation/reservation.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import { toast } from "react-toastify";

import productsService from "services/productsService";
import ProductCard from "./ProductCard";
import tableService from "services/tableService";
import TableCard from "./TableCard";
import CheckoutButton from "components/Checkout/CheckoutButton";
import SummaryRow from "./SummaryRow";

function ReservationPage() {
  const [reservationData, setReservationData] = useState({
    prodArray: [],
    tableArray: [],
    prodComponents: [],
    summaryProdRows: [],
    summaryTableRow: [],
    tableComponents: [],
    selectedProds: [],
    selectedTable: [],
    currentPage: "prods",
    reservationDate: null,
    totalProd: 0,
    totaltable: 0,
    totalToPay: 0,
  });

  const [startDate, setStartDate] = useState(new Date());

  const [payload, setPayload] = useState({
    Total: 0,
    Name: "",
    Image: "",
    tableId: null,
    date: "",
  });

  const [venueId] = useSearchParams();

  sessionStorage.setItem("venueId", venueId.get("id"));

  let prodTotal = 0.0;
  let tableTotal = 0.0;

  useEffect(() => {
    productsService
      .getProductByVenueId(0, 10, venueId.get("id"))
      .then(onGetProductByVenueIdSuccess)
      .catch(onGetProductByVenueIdError);
  }, []);

  useEffect(() => {
    if (reservationData.selectedProds.length) {
      const selectedProdArray = reservationData.selectedProds;

      for (let i = 0; selectedProdArray.length > i; i++) {
        prodTotal +=
          reservationData.selectedProds[i].price *
          reservationData.selectedProds[i].quantity;
      }
    } else {
      prodTotal = 0;
    }

    setReservationData((prevState) => {
      const newState = { ...prevState };
      newState.totalProd = prodTotal;
      newState.totalToPay = prodTotal + reservationData.totaltable;
      return newState;
    });
  }, [reservationData.selectedProds]);

  useEffect(() => {
    if (reservationData.selectedTable.length) {
      tableTotal += reservationData.selectedTable[0].price;
    } else {
      tableTotal = 0;
    }

    setReservationData((prevState) => {
      const newState = { ...prevState };
      newState.totaltable = tableTotal;
      newState.totalToPay = tableTotal + reservationData.totalProd;
      return newState;
    });
  }, [reservationData.selectedTable]);

  const onGetProductByVenueIdSuccess = (response) => {
    const prodArray = response.item.pagedItems;

    setReservationData((prevState) => {
      const newState = { ...prevState };
      newState.prodArray = prodArray.map(mapArray);
      newState.prodComponents = newState.prodArray.map(mapProds);
      return newState;
    });
  };

  const onGetProductByVenueIdError = (Error) => {
    
    toast.error("Error loading content.", {
      position: "top-right",
    });
  };

  const handler = (product) => {
    const prodFilterer = (prod) => {
      return prod.id !== product.id;
    };

    const prodMapper = (prod) => {
      if (prod.id === product.id) {
        return {
          ...product,
          isSelected: !product.isSelected,

          quantity: product.quantity,
        };
      } else {
        return { ...prod };
      }
    };

    setReservationData((prevState) => {
      let newSelectedProds;
      let newMappedProds;
      let newProdsComponents;

      if (product.isSelected === false) {
        newSelectedProds = [...prevState.selectedProds, product];
      } else {
        newSelectedProds = prevState.selectedProds.filter(prodFilterer);
      }
      newMappedProds = prevState.prodArray.map(prodMapper);
      newProdsComponents = newMappedProds.map(mapProds);
      return {
        ...prevState,
        selectedProds: newSelectedProds,
        prodArray: newMappedProds,
        prodComponents: newProdsComponents,
      };
    });
  };

  const quantityHandler = (product) => {
    const prodFilterer = (prod) => {
      return prod.id !== product.id;
    };

    const prodMapper = (prod) => {
      if (prod.id === product.id) {
        return {
          ...product,
          isSelected: false,
          quantity: product.quantity,
        };
      } else {
        return { ...prod };
      }
    };

    setReservationData((prevState) => {
      let newSelectedProds;
      let newMappedProds;
      let newProdsComponents;

      newSelectedProds = prevState.selectedProds.filter(prodFilterer);
      newMappedProds = prevState.prodArray.map(prodMapper);
      newProdsComponents = newMappedProds.map(mapProds);
      return {
        ...prevState,
        selectedProds: newSelectedProds,
        prodArray: newMappedProds,
        prodComponents: newProdsComponents,
      };
    });
  };

  const mapProds = (product) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        handler={handler}
        quantityHandler={quantityHandler}
      />
    );
  };

  const mapProdsSummary = (product) => {
    product = { ...product, rowType: "prod" };

    return <SummaryRow key={product.id} row={product} />;
  };

  const mapArray = (obj) => {
    return { ...obj, isSelected: false, quantity: 1 };
  };

  const tableHandler = (tableObj) => {
    const prodMapper = (table) => {
      if (table.id === tableObj.id) {
        return { ...tableObj, isSelected: !tableObj.isSelected };
      } else {
        return { ...table, isSelected: false };
      }
    };

    setReservationData((prevState) => {
      let newSelectedTables;
      let newMappedTables;
      let newTableComponents;

      if (tableObj.isSelected === false) {
        newSelectedTables = [tableObj];
      } else {
        newSelectedTables = [];
      }

      newMappedTables = prevState.tableArray.map(prodMapper);
      newTableComponents = newMappedTables.map(tableMapper);
      return {
        ...prevState,
        selectedTable: newSelectedTables,
        tableArray: newMappedTables,
        tableComponents: newTableComponents,
      };
    });
  };

  const tableMapper = (tableObj) => {
    return (
      <TableCard
        key={tableObj.id}
        tableObj={tableObj}
        tableHandler={tableHandler}
      />
    );
  };

  const tableMapperSummary = (tableObj) => {
    tableObj = { ...tableObj, rowType: "table" };
    return <SummaryRow key={tableObj.id} row={tableObj} />;
  };

  const nextClicked = () => {
    if (reservationData.currentPage === "prods") {
      if (reservationData.tableArray.length === 0) {
        tableService
          .GetByVenueId(0, 10, venueId.get("id"))
          .then(onGetTableByVenueIdSuccess)
          .catch(onGetTableByVenueIdError);
      } else {
        setReservationData((prevState) => {
          const newState = { ...prevState };
          newState.currentPage = "tables";

          return newState;
        });
      }
    } else if (reservationData.currentPage === "tables") {
      setReservationData((prevState) => {
        const newState = { ...prevState };
        newState.currentPage = "date";

        return newState;
      });
    } else if (reservationData.currentPage === "date") {
      setPayload((prevState) => {
        const newState = { ...prevState };
        let payloadTotal = reservationData.totalToPay.toFixed(2);
        newState.Total = payloadTotal;
        newState.Name = "Table Reservation";
        newState.Image =
          "https://img.freepik.com/free-photo/table-dinner-set_74190-1534.jpg";
        newState.tableId = reservationData.selectedTable[0].id;

        return newState;
      });

      setReservationData((prevState) => {
        const newState = { ...prevState };
        newState.currentPage = "summary";
        newState.summaryProdComponents =
          prevState.selectedProds.map(mapProdsSummary);
        newState.summaryTableComponents =
          prevState.selectedTable.map(tableMapperSummary);

        return newState;
      });
    }
  };

  const onGetTableByVenueIdSuccess = (response) => {
    const tableArray = response.item.pagedItems;

    setReservationData((prevState) => {
      const newState = { ...prevState };
      newState.tableArray = tableArray.map(mapArray);
      newState.tableComponents = newState.tableArray.map(tableMapper);
      newState.currentPage = "tables";

      return newState;
    });
  };

  const onGetTableByVenueIdError = (error) => {
    _logger("onGetTableByVenueIdSuccess::::: ", error);
    toast.error("Error loading content.", {
      position: "top-right",
    });
  };

  const prevClicked = () => {
    let newPage;
    if (reservationData.currentPage === "tables") {
      newPage = "prods";
    } else if (reservationData.currentPage === "date") {
      newPage = "tables";
    } else if (reservationData.currentPage === "summary") {
      newPage = "date";
    }

    setReservationData((prevState) => {
      const newState = { ...prevState };
      newState.currentPage = newPage;
      return newState;
    });
  };

  const onDateChanged = (date) => {
    setStartDate(date);

    const formattedDate = date.toISOString().slice(0, 19);

    setReservationData((prevState) => {
      const newState = { ...prevState };
      newState.reservationDate = date;
      return newState;
    });

    setPayload((prevState) => {
      const newState = { ...prevState };
      newState.date = formattedDate;

      return newState;
    });
  };

  return (
    <React.Fragment>
      <div className="res-main-container">
        <section className="res-header">
          <h1> Reservation </h1>
        </section>
        <div className="res-container">
          <div className="res-title-container">
            <div className="res-arrow-left">
              {reservationData.currentPage === "prods" ? (
                <FontAwesomeIcon
                  className="res-arrow-disabled"
                  icon={faArrowLeft}
                />
              ) : (
                <FontAwesomeIcon
                  className="res-arrow"
                  icon={faArrowLeft}
                  onClick={prevClicked}
                />
              )}
            </div>
            <div className="res-title">
              {reservationData.currentPage === "prods" && (
                <h3> Select Products </h3>
              )}
              {reservationData.currentPage === "tables" && (
                <h3> Select Table </h3>
              )}
              {reservationData.currentPage === "date" && <h3> Select Date </h3>}
              {reservationData.currentPage === "summary" && <h3> Summary </h3>}
            </div>
            <div className="res-arrow-right">
              {(reservationData.selectedTable.length !== 0 &&
                reservationData.currentPage === "tables") ||
              reservationData.currentPage === "prods" ||
              (reservationData.reservationDate !== null &&
                reservationData.currentPage !== "summary" &&
                reservationData.currentPage !== "tables") ? (
                <FontAwesomeIcon
                  type="button"
                  className="res-arrow"
                  icon={faArrowRight}
                  onClick={nextClicked}
                />
              ) : (
                <FontAwesomeIcon
                  className="res-arrow-disabled"
                  icon={faArrowRight}
                />
              )}
            </div>
          </div>
          <div className="res-card-container">
            <div className="res-card-selector">
              {reservationData.currentPage === "prods" &&
                reservationData.prodComponents}
              {reservationData.currentPage === "tables" &&
                reservationData.tableComponents}
              {reservationData.currentPage === "date" && (
                <div className="res-date-time">
                  <div>
                    <h1>Select date and Time</h1>
                  </div>
                  <div>
                    <ReactDatePicker
                      selected={startDate}
                      onChange={onDateChanged}
                      dateFormat="MM/dd/yyyy h:mm aa"
                      minDate={new Date()}
                      showTimeSelect
                    />
                  </div>
                </div>
              )}
              {reservationData.currentPage === "summary" && (
                <div className="res-summary">
                  <div className="res-table-container">
                    <h5>Selected Product:</h5>
                    <table className="table res-table-hover mt-3 shadow-lg">
                      <thead>
                        <tr className="res-bg-headers">
                          <th scope="col">Quantity</th>
                          <th scope="col">Name</th>
                          <th scope="col">Price</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody className="table-body res-table-body">
                        {reservationData.summaryProdComponents}
                      </tbody>
                    </table>
                    <h5 className="res-selectedtable-title">Selected Table:</h5>
                    <table className="table res-table-hover mt-3 shadow-lg">
                      <thead>
                        <tr className="res-bg-headers">
                          <th scope="col">Quantity</th>
                          <th scope="col">Table #</th>
                          <th scope="col">Capacity</th>

                          <th scope="col">Cost</th>
                        </tr>
                      </thead>
                      <tbody className="table-body res-table-body">
                        {reservationData.summaryTableComponents}
                      </tbody>
                    </table>
                    <div className="res-total">
                      <h4>Total: ${reservationData.totalToPay.toFixed(2)}</h4>
                    </div>
                    <h5>Reservation Date: </h5>
                    <p>{`${reservationData.reservationDate}`}</p>
                  </div>
                </div>
              )}
              <div className="res-total">
                {reservationData.currentPage === "summary" ? (
                  <span></span>
                ) : (
                  <h4>Total: ${reservationData.totalToPay.toFixed(2)}</h4>
                )}
              </div>
              {reservationData.currentPage === "summary" && (
                <div className="res-Checkout-btn">
                  <CheckoutButton payload={payload} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ReservationPage;

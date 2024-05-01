# Table-Reservation-and-Checkout

Table reservation system for restaurants and venues with Credit Card payment integration.

NOTE: These are just some of the files to showcase my work. Feel free to reach out if you have any questions.

## 🍽️ Table Reservation Web App

This repository contains a full-stack solution for implementing a table reservation system for venues or events within a web application. Users can make reservations, select products like drinks and food, choose a table based on capacity and cost, specify a date, and complete payment using their credit card. Upon completion, users receive a confirmation with a reservation number.

### 🛠️ Technologies Used

- **Frontend**: React components created using JavaScript.
- **Backend**: .NET/C# API controllers and methods.
- **Database**: SQL database tables and stored procedures, including user-defined tables.

https://github.com/victoremartinez18/Table-Reservation-and-Checkout/assets/123347550/4142ff77-2a04-42a6-9333-f0bce11cda22

### ℹ️ How to Use

The reservation process is divided into multiple stages: Select Products, Select Table, Select Date, Review Summary, and Checkout.

![Reservation Next and Back arrows](https://github.com/victoremartinez18/Table-Reservation-and-Checkout/assets/123347550/3c9040b0-7167-4c39-8016-c185371b4066)

#### 🛒 Select Products (Optional):

In this optional stage, users can choose desired products from a list provided by the venue or event organizer. Product information is stored in the database. The next arrow is always available in this stage. Users can modify their product selection or quantities throughout the process.

#### 🪑 Select Table (Mandatory):

Users must select a table based on price and capacity. The arrow to proceed will be disabled until a table is selected. Users can change their table selection at any point during the process.

#### 📅 Select Date (Mandatory):

Choosing a date is mandatory. The next arrow remains disabled until a valid date is selected. Users can modify their date selection during any part of the process.

#### 📝 Review Summary:

This section displays a summary of the reservation, including product selections with quantity, name, price, and total, as well as details of the chosen table (number, capacity, and cost) and the selected date.

#### 💳 Checkout:

To proceed to checkout, users click on the checkout button. A popup appears for confirmation, accompanied by a warning that selections cannot be edited after checkout. Payment processing is handled through integration with the Stripe API using .NET/C# API controllers and methods.

Upon completion of payment, users are redirected to a landing page where they receive a reservation confirmation, including a unique reservation number. The reservation details are also stored in the database.

Feel free to reach out if you have any questions, I would love to discuss the code and implementation of this project!

## Images:

#### 🛒 Select Products (Optional):

![Select Products](https://github.com/victoremartinez18/Table-Reservation-and-Checkout/assets/123347550/0fb12102-01d0-4d28-8272-8bc27cb771cf)

#### 🪑 Select Table (Mandatory):

![Select Table](https://github.com/victoremartinez18/Table-Reservation-and-Checkout/assets/123347550/e45718e6-2629-44b5-91ab-652b3f48a2ac)

#### 📅 Select Date (Mandatory):

![Select Date](https://github.com/victoremartinez18/Table-Reservation-and-Checkout/assets/123347550/a6a43643-a5f9-449d-886d-9b7ae1b062c5)

#### 📝 Review Summary:

![Summary](https://github.com/victoremartinez18/Table-Reservation-and-Checkout/assets/123347550/d539a799-baab-4e32-ba28-6d01781ffa1d)

![Confirm Checkout](https://github.com/victoremartinez18/Table-Reservation-and-Checkout/assets/123347550/70331255-c4f9-4164-8f70-970544acf937)

![Credit Card infomation](https://github.com/victoremartinez18/Table-Reservation-and-Checkout/assets/123347550/c0341295-5024-484c-a494-b8db4fbfe23e)

![Confirmation](https://github.com/victoremartinez18/Table-Reservation-and-Checkout/assets/123347550/3278618b-f6a2-4c8e-9fcb-a50a4bb7e244)

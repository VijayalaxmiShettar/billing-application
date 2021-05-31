## Point of Sale Application

This application is an invoicing and inventory solution for small businesses. The admin can store and manage products, customers and sales details.

##### Built with 

- React and Redux
- axios, react-router-dom, redux-thunk, react-google-charts, react-select, validator, jspdf, html2canvas, material-ui, sweetalert

[Try Point of Sale App](https://my-invoicing-app.herokuapp.com/)

**Demo**

![image-20210531182035979](C:\Users\Vijaylaxmi\Documents\Captura\projDemo.gif)

------

#### Features

- Authentication 

  - User should register with the application, and then login.
  - JWT is used for authentication.

- Dashboard

  - The logged in user will have access to a dashboard which displays the sales and product statistics.

- Customers Page

  - The logged in user can view all the customer details displayed as a table and the purchase history of a particular customer.
  - Can add, modify and remove customer details. Search for a customer with name or mobile.

- Products Page

  - The logged in user can view all product details displayed as a table. Can add, modify and remove product details. Search for a product with name.

- Billing Page

  - The logged in user can generate a new invoice, by adding the customer mobile information, and product details. If the customer info is not already available, a pop up window will ask for more details like name and email, after adding these the bill gets generated.

  - User is redirected to another page which displays the generated bill, with an option to download the PDF. 

  - User can also view a list of all bills generated using the application, and can remove the bills.

    




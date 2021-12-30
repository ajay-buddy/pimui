import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, Input, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { loginRequest } from "../app/authSlice";
import { getProductRequest, productSelector } from "../app/productsSlice";
import {
  orderSelector,
  addOrderRequest,
  getOrderRequest,
} from "../app/ordersSlice";
import { customerSelector, getCustomerRequest } from "../app/customerSlice";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData({
  sno,
  orderId,
  productName,
  price,
  quantity,
  direction,
  catagory,
  customer,
  mrp,
}) {
  return {
    sno,
    orderId,
    productName,
    price,
    quantity,
    direction,
    catagory,
    customer,
    mrp,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const addComponent = ({
  index,
  products,
  setProducts,
  productsList,
  setPrice,
  price,
  quantity,
  setQuantity,
}) => (
  <div>
    <div>
      <Autocomplete
        id="combo-box-demo1"
        options={productsList}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Products" variant="outlined" />
        )}
        onChange={(_, newValue) => {
          const p = [...products];
          const s = [...price];
          p[index] = newValue.id;
          setProducts(p);
          s[index] = newValue.sprice;
          setPrice(s);
        }}
      />
      <div>
        <Input
          placeholder="Enter Barcode"
          onChange={(e) => {
            const p = [...products];
            const s = [...price];
            const found = productsList.filter(
              (d) => d.sku.toLowerCase() === e.target.value.toLowerCase()
            );
            if (found.length <= 0) return;
            p[index] = found[0].id;
            setProducts(p);
            s[index] = found[0].sprice;
            setPrice(s);
          }}
        />
      </div>
    </div>

    <div>
      <Input
        value={price[index] || 0}
        // readOnly={true}
        placeholder="Enter Price"
        onChange={(e) => {
          const p = [...price];
          p[index] = parseInt(e.target.value);
          setPrice(p);
        }}
      />
    </div>
    <div>
      <Input
        placeholder="Enter Quantity"
        onChange={(e) => {
          const q = [...quantity];
          q[index] = parseInt(e.target.value);
          setQuantity(q);
        }}
      />
    </div>
  </div>
);

export default function Order() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [count, setCount] = useState(0);
  const [customerId, setCustomerId] = useState(null);
  const productsList = useSelector(productSelector);
  const ordersList = useSelector(orderSelector);
  const customerList = useSelector(customerSelector);
  const reset = () => {
    setProducts([]);
    setPrice([]);
    setQuantity([]);
    setCount(0);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductRequest());
    dispatch(getOrderRequest());
    dispatch(getCustomerRequest());
  }, []);

  const getList = () => {
    const data = [];
    let count = 0;
    for (let i = 0; i < ordersList.length; i++) {
      for (let j = 0; j < ordersList[i].transactions.length; j++) {
        count++;
        data.push(
          createData({
            sno: count,
            orderId: ordersList[i].id,
            productName: ordersList[i].transactions[j].product.name,
            mrp: ordersList[i].transactions[j].product.price,
            price: ordersList[i].transactions[j].price,
            quantity: ordersList[i].transactions[j].quantity,
            direction: ordersList[i].transactions[j].direction,
            catagory: ordersList[i].transactions[j].product.catagory
              ? ordersList[i].transactions[j].product.catagory.name
              : "NA",
            customer: ordersList[i].customer
              ? ordersList[i].customer.name
              : "NA",
          })
        );
      }
    }
    return data;
  };

  return (
    <>
      <div>
        <h1>Order</h1>
        <div>
          {count > 0 && (
            <div>
              <Autocomplete
                id="combo-box-demo"
                options={customerList}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Customer" variant="outlined" />
                )}
                onChange={(_, newValue) => setCustomerId(newValue.id)}
              />
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {[...Array(count)].map((_, index) =>
              addComponent({
                index,
                products,
                setProducts,
                productsList,
                setPrice,
                price,
                quantity,
                setQuantity,
              })
            )}
          </div>

          <Button onClick={() => setCount(count + 1)}>
            {count === 0 ? "Place Order" : "Add More"}
          </Button>
          {count > 0 && (
            <Button
              onClick={() => {
                dispatch(
                  addOrderRequest({
                    products,
                    price,
                    quantity,
                    customerId,
                  })
                );
                reset();
              }}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table
          editable="true"
          className={classes.table}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">S.No</StyledTableCell>
              <StyledTableCell align="center">Order ID</StyledTableCell>
              <StyledTableCell align="center">Product Name</StyledTableCell>
              <StyledTableCell align="center">Catagory</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">MRP</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Customer Name</StyledTableCell>
              <StyledTableCell align="center">Direction</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getList().map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="center">{row.sno}</StyledTableCell>
                <StyledTableCell align="center">{row.orderId}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.productName}
                </StyledTableCell>
                <StyledTableCell align="center">{row.catagory}</StyledTableCell>
                <StyledTableCell align="center">{row.price}</StyledTableCell>
                <StyledTableCell align="center">{row.mrp}</StyledTableCell>
                <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                <StyledTableCell align="center">{row.customer}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.direction}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

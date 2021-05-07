import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { orderSelector, getOrderByIdRequest } from "../app/ordersSlice";
import history from "../history";

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
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Invoice() {
  const classes = useStyles();
  const ordersList = useSelector(orderSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    const id = history.location.pathname.split("/")[2];
    dispatch(getOrderByIdRequest(id));
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
        <h1>Invoice</h1>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">S.No</StyledTableCell>
              <StyledTableCell align="center">Order ID</StyledTableCell>
              <StyledTableCell align="center">Product Name</StyledTableCell>
              <StyledTableCell align="center">Catagory</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
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

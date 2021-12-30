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
import { getProductRequest, productSelector } from "../app/productsSlice";
import {
  purchaseSelector,
  addPurchaseRequest,
  getPurchaseRequest,
} from "../app/purchaseSlice";
import { vendorSelector, getVendorRequest } from "../app/vendorsSlice";

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
  vendor,
}) {
  return {
    sno,
    orderId,
    productName,
    price,
    quantity,
    direction,
    catagory,
    vendor,
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
}) => {
  return (
    <div>
      <div>
        <Autocomplete
          id="combo-box-demo1"
          options={productsList}
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Product" variant="outlined" />
          )}
          onChange={(_, newValue) => {
            const p = [...products];
            p[index] = newValue.id;
            setProducts(p);
          }}
        />
        <Input
          placeholder="Enter Barcode"
          onChange={(e) => {
            const p = [...products];
            const found = productsList.filter(
              (d) => d.sku.toLowerCase() === e.target.value.toLowerCase()
            );
            p[index] = found[0].id;
            setProducts(p);
          }}
        />
      </div>
      <div>
        <Input
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
};

export default function Purchase() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [count, setCount] = useState(0);
  const [vendorId, setVendorId] = useState(null);
  const productsList = useSelector(productSelector);
  const purchasesList = useSelector(purchaseSelector);
  const vendorList = useSelector(vendorSelector);
  const reset = () => {
    setProducts([]);
    setPrice([]);
    setQuantity([]);
    setCount(0);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductRequest());
    dispatch(getPurchaseRequest());
    dispatch(getVendorRequest());
  }, []);

  const getList = () => {
    const data = [];
    let count = 0;
    for (let i = 0; i < purchasesList.length; i++) {
      for (let j = 0; j < purchasesList[i].transactions.length; j++) {
        count++;
        data.push(
          createData({
            sno: count,
            orderId: purchasesList[i].id,
            productName: purchasesList[i].transactions[j].product.name,
            price: purchasesList[i].transactions[j].price,
            quantity: purchasesList[i].transactions[j].quantity,
            direction: purchasesList[i].transactions[j].direction,
            catagory: purchasesList[i].transactions[j].product.catagory
              ? purchasesList[i].transactions[j].product.catagory.name
              : "NA",
            vendor: purchasesList[i].vendor
              ? purchasesList[i].vendor.name
              : "NA",
          })
        );
      }
    }
    return data;
  };

  return (
    <>
      <div
        style={{
          padding: "20px 20px",
        }}
      >
        <h1>Purchase</h1>
        <div>
          {count > 0 && (
            <div>
              <Autocomplete
                id="combo-box-demo"
                options={vendorList}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Vendor" variant="outlined" />
                )}
                onChange={(_, newValue) => setVendorId(newValue.id)}
              />
            </div>
          )}
          <hr />
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
            {count === 0 ? "Add Purchase" : "Add More"}
          </Button>
          {count > 0 && (
            <Button
              onClick={() => {
                dispatch(
                  addPurchaseRequest({
                    products,
                    price,
                    quantity,
                    vendorId,
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
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">S.No</StyledTableCell>
              <StyledTableCell align="center">Purchase ID</StyledTableCell>
              <StyledTableCell align="center">Product Name</StyledTableCell>
              <StyledTableCell align="center">Catagory</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Vendor Name</StyledTableCell>
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
                <StyledTableCell align="center">{row.vendor}</StyledTableCell>
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

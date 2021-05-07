import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, FormControl, Input } from "@material-ui/core";
import {
  addProductRequest,
  getProductRequest,
  productSelector,
} from "../app/productsSlice";
import { catagorySelector, getCatagoryRequest } from "../app/catagorySlice";
import { getCatagorySaga } from "../app/catagorySlice/saga";

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

function createData(sno, name, catagory, sku, price, quantity, status) {
  return { sno, name, catagory, sku, price, quantity, status };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Products() {
  console.log("===>Hello");
  const classes = useStyles();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [SKU, setSKU] = useState("");
  const [price, setPrice] = useState("");
  const [catagoryId, setCatagoryId] = useState("");
  const dispatch = useDispatch();
  const productsList = useSelector(productSelector);
  const catagoryList = useSelector(catagorySelector);

  useEffect(() => {
    dispatch(getProductRequest());
    dispatch(getCatagoryRequest());
  }, []);

  const getList = () =>
    productsList.map((item, index) =>
      createData(
        index + 1,
        item.name,
        item.catagory ? item.catagory.name : "NA",
        item.SKU,
        item.price,
        item.quantity,
        item.status
      )
    );

  return (
    <>
      <div>Products</div>
      <div>
        <Button onClick={() => setAdding(!adding)}>Add Products</Button>
      </div>
      {adding && (
        <FormControl>
          <Input
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            placeholder="SKU"
            onChange={(event) => setSKU(event.target.value)}
          />
          <Input
            placeholder="Price"
            onChange={(event) => setPrice(event.target.value)}
          />
          <Autocomplete
            id="combo-box-demo"
            options={catagoryList}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Catagory" variant="outlined" />
            )}
            onChange={(_, newValue) => setCatagoryId(newValue.id)}
          />
          <Button
            disabled={!name || !SKU || !price}
            onClick={() =>
              dispatch(
                addProductRequest({
                  name,
                  SKU,
                  price,
                  catagoryId,
                })
              )
            }
          >
            Add
          </Button>
        </FormControl>
      )}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">S.No</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Catagory</StyledTableCell>
              <StyledTableCell align="center">SKU</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getList().map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="center">{row.sno}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.catagory}</StyledTableCell>
                <StyledTableCell align="center">{row.sku}</StyledTableCell>
                <StyledTableCell align="center">{row.price}</StyledTableCell>
                <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

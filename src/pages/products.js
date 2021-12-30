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
  editProductBulkRequest,
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

function createData(
  id,
  sno,
  name,
  catagory,
  sku,
  price,
  sprice,
  igst,
  cgst,
  quantity,
  status
) {
  return {
    sno,
    name,
    catagory,
    sku,
    price,
    sprice,
    igst,
    cgst,
    quantity,
    status,
    id,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
const CustomTableCell = ({
  index,
  data,
  k,
  editing,
  editingData,
  setEditingData,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(data[k]);
  const isEditMode = editing[index];
  return (
    <StyledTableCell key={data.id} align="center">
      {isEditMode ? (
        <Input
          value={value}
          onChange={(e) => {
            e.preventDefault();
            let d = [...editingData];
            if (d[index]) {
              d[index][k] = e.target.value;
            } else {
              d[index] = { ...data };
              d[index][k] = e.target.value;
            }
            setValue(e.target.value);
            return setEditingData(d);
          }}
        />
      ) : (
        data[k]
      )}
    </StyledTableCell>
  );
};
export default function Products() {
  const classes = useStyles();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [sku, setSKU] = useState("");
  const [price, setPrice] = useState("");
  const [sprice, setSPrice] = useState(0);
  const [igst, setIgst] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [catagoryId, setCatagoryId] = useState("");
  const [editing, setEditing] = useState([]);
  const [editingData, setEditingData] = useState([]);
  const dispatch = useDispatch();
  const productsList = useSelector(productSelector);
  const catagoryList = useSelector(catagorySelector);

  useEffect(() => {
    dispatch(getProductRequest());
    dispatch(getCatagoryRequest());
  }, []);

  const getList = () =>
    productsList?.map((item, index) =>
      createData(
        item.id,
        index + 1,
        item.name,
        item.catagory ? item.catagory.name : "NA",
        item.sku,
        item.price,
        item.sprice,
        item.igst,
        item.cgst,
        item.quantity,
        item.status
      )
    );
  return (
    <>
      <div>Products</div>
      <div>
        <Button onClick={() => setAdding(!adding)}>Add Products</Button>
        {adding && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Input
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              placeholder="sku"
              onChange={(event) => setSKU(event.target.value)}
            />
            <Input
              placeholder="Price"
              onChange={(event) => setPrice(event.target.value)}
            />
            <Input
              placeholder="SPrice"
              onChange={(event) => setSPrice(event.target.value)}
            />
            <Input
              placeholder="Igst"
              onChange={(event) => setIgst(event.target.value)}
            />
            <Input
              placeholder="Cgst"
              onChange={(event) => setCgst(event.target.value)}
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
              disabled={!name || !sku || !price || !sprice}
              onClick={() =>
                dispatch(
                  addProductRequest({
                    name,
                    sku,
                    price,
                    sprice,
                    igst,
                    cgst,
                    catagoryId,
                  })
                )
              }
            >
              Add
            </Button>
          </div>
        )}
      </div>

      <hr />
      <div>
        <Button
          onClick={() => {
            const data = editingData.filter((d) => !!d);
            dispatch(editProductBulkRequest(data));
            return setEditing([]);
          }}
        >
          Update Products
        </Button>
      </div>
      <hr />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">S.No</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Catagory</StyledTableCell>
              <StyledTableCell align="center">sku</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Sales Price</StyledTableCell>
              <StyledTableCell align="center">IGST(%)</StyledTableCell>
              <StyledTableCell align="center">CGST(%)</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getList()?.map((row, index) => (
              <StyledTableRow key={row.name}>
                <CustomTableCell
                  align="center"
                  index={index}
                  editingData={editingData}
                  setEditingData={setEditingData}
                  editing={editing}
                  data={row}
                  k={"sno"}
                />
                <CustomTableCell
                  align="center"
                  index={index}
                  editingData={editingData}
                  setEditingData={setEditingData}
                  editing={editing}
                  data={row}
                  k={"name"}
                />
                <CustomTableCell
                  align="center"
                  index={index}
                  editingData={editingData}
                  setEditingData={setEditingData}
                  editing={editing}
                  data={row}
                  k={"catagory"}
                />
                <CustomTableCell
                  align="center"
                  index={index}
                  editingData={editingData}
                  setEditingData={setEditingData}
                  editing={editing}
                  data={row}
                  k={"sku"}
                />
                <CustomTableCell
                  align="center"
                  index={index}
                  editingData={editingData}
                  setEditingData={setEditingData}
                  editing={editing}
                  data={row}
                  k={"price"}
                />
                <CustomTableCell
                  align="center"
                  index={index}
                  editingData={editingData}
                  setEditingData={setEditingData}
                  editing={editing}
                  data={row}
                  k={"sprice"}
                />
                <CustomTableCell
                  align="center"
                  index={index}
                  editingData={editingData}
                  setEditingData={setEditingData}
                  editing={editing}
                  data={row}
                  k={"igst"}
                />
                <CustomTableCell
                  align="center"
                  index={index}
                  editingData={editingData}
                  setEditingData={setEditingData}
                  editing={editing}
                  data={row}
                  k={"cgst"}
                />
                <CustomTableCell
                  align="center"
                  index={index}
                  editingData={editingData}
                  setEditingData={setEditingData}
                  editing={editing}
                  data={row}
                  k={"quantity"}
                />
                <CustomTableCell
                  align="center"
                  index={index}
                  editingData={editingData}
                  setEditingData={setEditingData}
                  editing={editing}
                  data={row}
                  k={"status"}
                />
                <StyledTableCell>
                  <Button
                    onClick={() => {
                      let e = [...editing];
                      if (e[index]) {
                        let data = [...editingData];
                        data[index] = { ...row };
                        e[index] = false;
                        setEditing(e);
                        return setEditingData(data);
                      }
                      e[index] = true;
                      setEditing(e);
                    }}
                  >
                    {!editing[index] ? "Edit" : "Cancel"}
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

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
import { Button, FormControl, Input } from "@material-ui/core";
import {
  addCatagoryRequest,
  getCatagoryRequest,
  catagorySelector,
} from "../app/catagorySlice";

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

function createData(sno, name) {
  return { sno, name };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Catagories() {
  const classes = useStyles();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const catagoryList = useSelector(catagorySelector);

  useEffect(() => {
    dispatch(getCatagoryRequest());
  }, []);

  const getList = () =>
    catagoryList.map((item, index) => createData(index + 1, item.name));

  return (
    <>
      <div>Catagories</div>
      <div>
        <Button onClick={() => setAdding(!adding)}>Add Catarory</Button>
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
            <Button
              disabled={!name}
              onClick={() =>
                dispatch(
                  addCatagoryRequest({
                    name,
                  })
                )
              }
            >
              Add
            </Button>
          </div>
        )}
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">S.No</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getList().map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="center">{row.sno}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
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
import {
  Button,
  FormControl,
  Input,
  Select,
  MenuItem,
} from "@material-ui/core";
import { allProfileSelector, getAllProfileRequest } from "../app/profileSlice";
import { registerRequest } from "../app/authSlice";

import ProfileCard from "../components/molecules/profile-card";
import CandidateList from "../components/organisms/candidate-list";
import Form from "../components/organisms/form";
import history from "../history";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
const USERTYPE = ["ADMIN", "CANDIDATE"];
export default function Candidates() {
  const classes = useStyles();
  const profileData = useSelector(allProfileSelector);
  const [adding, setAdding] = useState(false);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [userType, setUserType] = useState(USERTYPE[0]);
  const dispatch = useDispatch();

  useEffect(() => {
    const { search } = history.location;
    dispatch(getAllProfileRequest(search));
  }, []);

  return (
    <>
      <Button onClick={() => setAdding(!adding)}>Add USER</Button>
      {adding && (
        <div
          style={{
            maxWidth: "300px",
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            justifyContent: "center",
          }}
        >
          <Input
            placeholder="Enter a Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            placeholder="Enter Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userType}
            label="USER TYPE"
            onChange={({ target }) => setUserType(target.value)}
          >
            {USERTYPE.map((u) => (
              <MenuItem value={u}>{u}</MenuItem>
            ))}
          </Select>
          <Button
            disabled={!username || !password}
            onClick={() => {
              dispatch(
                registerRequest({
                  username,
                  password,
                  user_type: userType,
                  user_id: localStorage.getItem("id"),
                })
              );
            }}
          >
            Register
          </Button>
        </div>
      )}
      <Form />
      <CandidateList profileData={profileData} />
    </>
  );
}

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, Input, Button, Select, MenuItem } from "@material-ui/core";
import { registerRequest } from "../app/authSlice";

const USERTYPE = ["ADMIN", "CANDIDATE"]

export default function Register() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [userType, setUserType] = useState(USERTYPE[0]);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Register</h1>
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
          onChange={({target}) => setUserType(target.value)}
        >
          {USERTYPE.map(u => <MenuItem value={u}>{u}</MenuItem>)}
        </Select>
        <Button
          disabled={!username || !password}
          onClick={() => {
            dispatch(registerRequest({ username, password, user_type: userType }));
          }}
        >
          Register
        </Button>
      </div>
    </div>
  );
}

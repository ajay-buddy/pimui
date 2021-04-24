import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, Input, Button } from "@material-ui/core";
import { registerRequest } from "../app/authSlice";

export default function Register() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Register</h1>
      <FormControl>
        <Input
          placeholder="Enter a Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          placeholder="Enter Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          disabled={!username || !password}
          onClick={() => {
            console.log(username, password);
            dispatch(registerRequest({ username, password }));
          }}
        >
          Register
        </Button>
      </FormControl>
    </div>
  );
}

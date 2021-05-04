import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, Input, Button } from "@material-ui/core";
import { registerRequest } from "../app/authSlice";
import { getClientBindingRequest, clientBindingSelector } from "../app/paSlice";

export default function Register() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const clientBinding = useSelector(clientBindingSelector);
  console.log("===>", clientBinding);
  const dispatch = useDispatch();

  useEffect(
    () =>
      dispatch(getClientBindingRequest("b1d59edf-d6f3-4c55-8570-e5a29513806f")),
    []
  );

  return (
    <div>
      <h1>PA</h1>
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

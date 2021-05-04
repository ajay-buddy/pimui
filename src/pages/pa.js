import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, Input, Button } from "@material-ui/core";
import { registerRequest } from "../app/authSlice";
import {
  getClientBindingRequest,
  clientBindingSelector,
  getClientsRequest,
  clientsSelector,
  studyGroupSelector,
  getStudyGroupRequest,
  addFeatureBindingRequest,
  addClientBindingRequest,
  getFeatureBindingRequest,
  featureBindingSelector,
  addMatrixBindingRequest,
  getMatrixBindingRequest,
  matrixBindingSelector,
} from "../app/paSlice";

export default function Register() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const clientBinding = useSelector(clientBindingSelector);
  const clientsList = useSelector(clientsSelector);
  const studyGroupList = useSelector(studyGroupSelector);
  const featureBinding = useSelector(featureBindingSelector);
  const matrixBinding = useSelector(matrixBindingSelector);
  console.log("===>", matrixBinding);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientBindingRequest("b1d59edf-d6f3-4c55-8570-e5a29513806f"));
    dispatch(getClientsRequest());
    dispatch(getStudyGroupRequest());
    dispatch(
      addClientBindingRequest({
        client: "b1d59edf-d6f3-4c55-8570-e5a29513806f",
        study_group: "3b586a49-c731-49c6-9bd6-31682bed4898",
      })
    );
    dispatch(
      addFeatureBindingRequest({
        client: "b1d59edf-d6f3-4c55-8570-e5a29513806f",
        forecast: true,
        reforecast: true,
        portfolioView: false,
      })
    );
    dispatch(getFeatureBindingRequest("b1d59edf-d6f3-4c55-8570-e5a29513806f"));
    dispatch(
      addMatrixBindingRequest({
        client: "b1d59edf-d6f3-4c55-8570-e5a29513806f",
        ctms_matrix: true,
        design_optimization_matrix: true,
        cost_matrix: false,
      })
    );
    dispatch(getMatrixBindingRequest("b1d59edf-d6f3-4c55-8570-e5a29513806f"));
  }, []);

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

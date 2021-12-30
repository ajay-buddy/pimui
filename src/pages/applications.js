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
import {
  addJobRequest,
  allProfileSelector,
  getAllProfileRequest,
  getApplicationRequest,
  getJobRequest,
  getJobSelector,
} from "../app/profileSlice";
import { registerRequest } from "../app/authSlice";

import ProfileCard from "../components/molecules/profile-card";
import ApplicationList from "../components/organisms/application-list";
import Form from "../components/organisms/form";
import history from "../history";
import { getApplicationSelector } from "../app/profileSlice/index";

export default function Jobs() {
  const applicationData = useSelector(getApplicationSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const { search } = history.location;
    dispatch(getApplicationRequest(search));
  }, []);

  return (
    <>
      <ApplicationList
        // onClick={(data) => {
        //   setJob(data);
        //   setAdding(true);
        // }}
        applicationData={applicationData}
      />
    </>
  );
}

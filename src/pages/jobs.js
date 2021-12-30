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
  getJobRequest,
  getJobSelector,
} from "../app/profileSlice";
import { registerRequest } from "../app/authSlice";

import ProfileCard from "../components/molecules/profile-card";
import JobList from "../components/organisms/job-list";
import Form from "../components/organisms/form";
import history from "../history";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
const USERTYPE = ["ADMIN", "CANDIDATE"];
export default function Jobs() {
  const classes = useStyles();
  const jobData = useSelector(getJobSelector);
  const [adding, setAdding] = useState(false);
  const [job, setJob] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const { search } = history.location;
    dispatch(getJobRequest(search));
  }, []);

  const jobFeilds = [
    {
      name: "Job Title",
      label: "Job Title",
      key: "name",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter Job Title",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Description",
      label: "Description",
      key: "description",
      type: "text",
      placeholder: "Enter Description",
      feildType: "TEXTBOX",
      rows: 4,
      cols: 50,
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Company Name",
      label: "Company Name",
      key: "company_name",
      type: "input",
      feildType: "INPUTFEILD",
      placeholder: "Enter Company Name",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Type",
      label: "Project Type",
      key: "type",
      type: "radio",
      feildType: "RADIO",
      options: [
        {
          name: "FULL TIME",
          value: "FULL_TIME",
        },
        {
          name: "PART TIME",
          value: "PART_TIME",
        },
      ],
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Active",
      label: "Active",
      key: "is_active",
      type: "radio",
      feildType: "RADIO",
      options: [
        {
          name: "YES",
          value: true,
        },
        {
          name: "NO",
          value: false,
        },
      ],
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
    {
      name: "Number of Vaccancies",
      label: "Number of Vaccancies",
      key: "vacancies",
      type: "number",
      feildType: "INPUTFEILD",
      placeholder: "Enter Number of Vaccancies",
      validations: [
        {
          type: "REQUIRED",
          message: "This Feild is Required",
        },
      ],
    },
  ];

  return (
    <>
      <Button onClick={() => setAdding(!adding)}>Add New Job</Button>
      {adding && (
        <Form
          formConfig={jobFeilds}
          values={job}
          onChange={setJob}
          show={adding}
          onClose={() => {
            setAdding(false);
            setJob({});
          }}
          onSubmit={() => {
            const jobData = { ...job };
            dispatch(addJobRequest(jobData));
            setJob({});
            setAdding(false);
          }}
        />
      )}
      <Form />
      <JobList
        onClick={(data) => {
          setJob(data);
          setAdding(true);
        }}
        jobData={jobData}
      />
    </>
  );
}

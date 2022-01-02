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
import {
  Button,
  FormControl,
  Input,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  adminProfileSelector,
  allProfileSelector,
  getAdminProfileRequest,
  getAllProfileRequest,
  adminProfileCountSelector,
  getAutoCompleteSearchRequest,
  resetAutoCompleteSearch,
  autoCompleteDataSelector,
  addTagRequest,
  addTagSelector,
} from "../app/profileSlice";
import { registerRequest } from "../app/authSlice";

import ProfileCard from "../components/molecules/profile-card";
import CandidateList from "../components/organisms/candidate-list";
import Form from "../components/organisms/form";
import FileUploader from "../components/atoms/file-uploader/file-uploader";
import history from "../history";
import Datatable from "../components/atoms/datatable";
import { getDefaultNormalizer } from "@testing-library/react";
import Paginate from "../components/molecules/paginate";
import AutoSelect from "../components/atoms/autoselect";
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
const USERTYPE = ["ADMIN", "CANDIDATE"];
export default function Admins() {
  const classes = useStyles();
  const profileData = useSelector(adminProfileSelector);
  const autoCompleteData = useSelector(autoCompleteDataSelector);
  const tagSelector = useSelector(addTagSelector);

  const totalCount = useSelector(adminProfileCountSelector);
  const [adding, setAdding] = useState(false);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [userType, setUserType] = useState(USERTYPE[0]);
  const [candidates, setCandidates] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const { search } = history.location;
    dispatch(getAdminProfileRequest(search));
  }, []);

  const header = [
    { label: "S.No", key: "sno" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "ID", key: "id" },
    { label: "Manager", key: "manager" },
  ];
  const createData = () => {
    return profileData.map((profile, index) => {
      return {
        sno: index + 1,
        name: `${profile.first_name || ""} ${profile.last_name || ""}`,
        email: profile.email,
        active: profile.active ? "Yes" : "No",
        id: profile?.belongs_to?.id || "",
        manager: profile?.belongs_to?.manager?.username || "",
        actions: {
          // onRowClick: () => history.push(`/profile/${profile.id}`),
        },
      };
    });
  };
  return (
    <>
      <Button onClick={() => setAdding(!adding)}>Add USER</Button>

      <FileUploader
        onComplete={(data) => {
          const formatedData = [];
          for (let i = 1; i < data.length; i++) {
            formatedData.push({
              username: data[i][1],
              password: "testPAssword!23",
              user_type: USERTYPE[1],
            });
          }
          setCandidates([...formatedData]);
          formatedData.forEach(({ username, password, user_type }) => {
            dispatch(registerRequest({ username, password, user_type }));
          });
        }}
      />
      <Datatable header={header} data={createData()} />
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
      {/* <CandidateList profileData={profileData} /> */}
      <Paginate total={totalCount} />
      {/* <Autocomplete
        id="combo-box-demo1"
        options={autoCompleteData}
        getOptionLabel={(option) => option?.email}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Products" variant="outlined" />
        )}
        onInputChange={(e) => {
          if (e.target.value.length < 3) return;
          dispatch(
            getAutoCompleteSearchRequest({
              type: "ADMIN-SEARCH",
              filterData: [
                {
                  key: "email",
                  value: e.target.value,
                },
              ],
            })
          );
        }}
        onChange={(_, newValue) => console.log(newValue)}
      /> */}
      {/* <AutoSelect
        getlable={(opt) => opt.name}
        label={"Tags"}
        createApi={(value) => dispatch(addTagRequest({ name: value }))}
        listner={tagSelector}
        searchApi={(value) =>
          dispatch(
            getAutoCompleteSearchRequest({
              type: "TAG-SEARCH",
              filterData: [
                {
                  key: "name",
                  value: value,
                },
              ],
            })
          )
        }
        onChange={(value) => console.log("%%%%%", value)}
        multiple={false}
        variant={"outlined"}
      /> */}

      {/* <AutoSelect
        getlable={(opt) => opt.name}
        label={"Tags"}
        createApi={(value) => dispatch(addTagRequest({ name: value }))}
        listner={tagSelector}
        searchConfig={{ type: "TAG-SEARCH", key: "name" }}
        searchApi={(value) =>
          dispatch(
            getAutoCompleteSearchRequest({
              type: "TAG-SEARCH",
              filterData: [
                {
                  key: "name",
                  value: value,
                },
              ],
            })
          )
        }
        onChange={(value) => console.log("%%%%%", value)}
        multiple={false}
        variant={"outlined"}
      /> */}
    </>
  );
}

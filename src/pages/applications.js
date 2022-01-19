import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  managerProfileListRequest,
  managerProfileListSelector,
  profileCreateRequest,
  profileListRequest,
} from "../app/profileSlice";
import { TYPE } from "../constants";
import {
  profileListSelector,
  profileDeleteRequest,
} from "../app/profileSlice/index";
import { candidateHeaders } from "../constants/headers/candidates.headers";
import ListView from "../components/organisms/tabel/tabel";
import { Button } from "@material-ui/core";
import CustomForm from "../components/organisms/form";
import { CandidateProfileFormConfig } from "../constants/form-config/candidate-profile.config";
import { AdminProfileFormConfig } from "../constants/form-config/admin-profile.config";
import { SpocFormConfig } from "../constants/form-config/spoc.config";
import { spocHeaders } from "../constants/headers/spoc.headers";
import {
  tagListSelector,
  tagCreateRequest,
  tagListRequest,
} from "../app/tagSlice/index";
import { registerRequest } from "../app/authSlice";
import {
  companyListSelector,
  companyListRequest,
  companyCreateRequest,
} from "../app/companySlice/index";
import {
  spocCreateRequest,
  spocDeleteRequest,
  spocListRequest,
} from "../app/spocSlice";
import { spocListSelector } from "../app/spocSlice/index";
import { jobHeaders } from "../constants/headers/job.headers";
import {
  jobCreateRequest,
  jobDeleteRequest,
  jobListRequest,
  jobListSelector,
  jobSearchListRequest,
  jobSearchListSelector,
} from "../app/jobSlice/index";
import { JobFormConfig } from "../constants/form-config/job.config";
import { ApplicationFormConfig } from "../constants/form-config/application.config";
import {
  applicationCreateRequest,
  applicationDeleteRequest,
  applicationListRequest,
  bulkApplicationRequest,
} from "../app/applicationSlice";
import { applicationListSelector } from "../app/applicationSlice/index";
import { applicationHeaders } from "../constants/headers/application.headers";
import {
  actionListSelector,
  actionListRequest,
} from "../app/actionSlice/index";
import { applicationDetailHeaders } from "../constants/headers/application-detail.headers";
import Paginate from "../components/molecules/paginate";
import { useHistory } from "react-router-dom";
import FileUploader from "../components/molecules/file-importer";
import { readApplication } from "../utills/bulk-file-reader/application";
import { Modal } from "bootstrap";

export default function Application() {
  const [bulUpload, setBulkUpload] = useState(false);
  const spocList = useSelector(spocListSelector);
  const [applicationList, applicationListTotal] = useSelector(
    applicationListSelector
  );
  const actionList = useSelector(actionListSelector);
  const candidateList = useSelector(managerProfileListSelector);
  const jobList = useSelector(jobSearchListSelector);
  const tagList = useSelector(tagListSelector);
  const companyList = useSelector(companyListSelector);

  const [userData, setUserData] = useState({});
  const [add, setAdding] = useState(false);
  const [edit, setEditing] = useState(false);
  const [view, setView] = useState(false);
  const [viewData, setViewData] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const createTag = (value) => {
    dispatch(tagCreateRequest(value));
  };

  const getTag = (value) => {
    dispatch(tagListRequest(value));
  };

  const getManager = (value) => {
    dispatch(profileListRequest(TYPE.ADMIN));
  };

  const getCompany = (value) => {
    dispatch(companyListRequest(value));
  };

  const createCompany = (value) => {
    dispatch(companyCreateRequest({ ...value }));
  };

  const getSpoc = (value) => {
    dispatch(spocListRequest({ ...value }));
  };

  const getJob = (value) => {
    if (!value) return;
    dispatch(jobSearchListRequest({ query: `?name=${value}` }));
  };

  const getCandidate = (value) => {
    console.log("--->+++");
    dispatch(managerProfileListRequest({ type: TYPE.CANDIDATE, value }));
  };

  const getAction = (value) => {
    dispatch(actionListRequest(value));
  };

  useEffect(() => {
    dispatch(applicationListRequest({ query: history?.location?.search }));
  }, []);
  return (
    <div>
      <Button variant="Primary" onClick={() => setAdding(!add)}>
        Create Application
      </Button>
      <Button
        variant="Primary"
        onClick={() => {
          setBulkUpload(!bulUpload);
        }}
      >
        Bulk Create Applications
      </Button>
      {bulUpload && (
        <FileUploader
          readFunction={async (data, filename) => {
            const result = readApplication(data, filename);
            console.log(result);
            result.forEach((d) => dispatch(bulkApplicationRequest(d)));
          }}
        />
      )}
      {view && (
        <Button
          variant="Primary"
          onClick={() => {
            setView(false);
            setViewData([]);
          }}
        >
          Close Detail View
        </Button>
      )}
      {(edit || add) && (
        <CustomForm
          {...ApplicationFormConfig({
            jobList,
            getJob,
            candidateList,
            getCandidate,
            getAction,
            actionList,
          })}
          onChange={setUserData}
          value={userData}
          onSubmit={() => {
            const data = { ...userData };

            if (data.applicant && data.applicant.value) {
              data.applicant = data.applicant.value;
            }
            if (data.job && data.job.value) {
              data.job = data.job.value;
            }

            if (data.action) {
              if (data.action.__isNew__) {
                data.action["name"] = data.action.value;
              } else {
                data.action = data.action.value;
              }
            }

            dispatch(applicationCreateRequest({ ...data }));
          }}
        />
      )}
      {view && (
        <div
          style={{
            margin: "80px 0px",
          }}
        >
          {<ListView headers={applicationDetailHeaders} list={viewData} />}
        </div>
      )}
      <ListView
        headers={applicationHeaders}
        list={applicationList}
        onDelete={(id) => dispatch(applicationDeleteRequest(id))}
        onEdit={(data) => {
          setEditing(true);
          setUserData({ ...data });
        }}
        onView={(data) => {
          setView(true);
          setViewData([...data.logs]);
        }}
      />
      <Paginate
        total={applicationListTotal || 0}
        updateFunction={(q) => {
          dispatch(applicationListRequest({ query: q }));
        }}
      />
    </div>
  );
}

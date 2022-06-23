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
import {
  ApplicationFilterFormConfig,
  ApplicationFormConfig,
} from "../constants/form-config/application.config";
import {
  applicationBulkUploadSelector,
  applicationCreateRequest,
  applicationDeleteRequest,
  applicationListRequest,
  bulkApplicationRequest,
} from "../app/applicationSlice";
import { applicationListSelector, applicationRequestSuccessSelector } from "../app/applicationSlice/index";
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
import { applicationBulkHeaders } from "../constants/headers/application-bulk.headers";
import { PAGELIMIT } from "../routes";

export default function Application() {
  const [bulUpload, setBulkUpload] = useState(false);
  const spocList = useSelector(spocListSelector);
  const [applicationList, applicationListTotal] = useSelector(
    applicationListSelector
  );
  const { success, failed } = useSelector(applicationBulkUploadSelector);
  const [showProgress, setShowProgress] = useState({
    success: false,
    failed: false,
  });
  const actionList = useSelector(actionListSelector);
  const candidateList = useSelector(managerProfileListSelector);
  const jobList = useSelector(jobSearchListSelector);
  const addStatus = useSelector(applicationRequestSuccessSelector)
  const tagList = useSelector(tagListSelector);
  const companyList = useSelector(companyListSelector);
  const [filtering, setFiltering] = useState(false);
  const [filterData, setFilterData] = useState({});

  const [userData, setUserData] = useState({});
  const [add, setAdding] = useState(false);
  const [edit, setEditing] = useState(false);
  const [view, setView] = useState(false);
  const [viewData, setViewData] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setAdding(false)
    setEditing(false)
    setUserData({})
  }, [addStatus])

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
      <Button variant="Primary" onClick={() => {
        setUserData({})
        setEditing(false)
        setFiltering(false)
        setAdding(!add)}}>
        Create Application
      </Button>
      <Button variant="Primary" onClick={() => {
        setEditing(false)
        setAdding(false)
        setFiltering(!filtering)}}>
        Filter Candidate
      </Button>
      <Button
        variant="Primary"
        onClick={() => {
          setBulkUpload(!bulUpload);
        }}
      >
        Bulk Create Applications
      </Button>
      <a
        download={true}
        href={`${process.env.S3URL}/application - Sheet1.csv`}
      >Download Sample File</a>
      {success && success.length > 0 && (
        <Button
          variant="Primary"
          onClick={() => {
            setShowProgress({ success: true, failed: false });
          }}
        >
          {`Successfully Uploaded: ${success.length} Records`}
        </Button>
      )}
      {failed && failed.length > 0 && (
        <Button
          variant="Primary"
          onClick={() => {
            setShowProgress({ success: false, failed: true });
          }}
        >
          {`Failed to Upload: ${failed.length} Records`}
        </Button>
      )}
      {bulUpload && (
        <FileUploader
          readFunction={async (data, filename) => {
            const result = readApplication(data, filename);
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
      {showProgress.success && success && success.length > 0 && (
        <ListView
          headers={applicationBulkHeaders}
          list={success}
          onEdit={(data) => {
            setAdding(false)
            setEditing(true);
            setUserData({ ...data });
          }}
        />
      )}
      {showProgress.failed && failed && failed.length > 0 && (
        <ListView
          headers={applicationBulkHeaders}
          list={failed}
          onEdit={(data) => {
            setEditing(true);
            setUserData({ ...data });
          }}
        />
      )}
      {filtering && (
        <CustomForm
          {...ApplicationFilterFormConfig()}
          onChange={setFilterData}
          value={filterData}
          onSubmit={() => {
            const data = { ...filterData };
            const updated = {
              ...data,
            };
            let query = "?";
            if (updated.applicant_name) {
              if (query.length > 1) {
                query += "&";
              }
              query += `applicant_name=${updated.applicant_name}`;
            }
            if (updated.applicant_email) {
              if (query.length > 1) {
                query += "&";
              }
              query += `applicant_email=${updated.applicant_email}`;
            }
            if (updated.applicant_phone) {
              if (query.length > 1) {
                query += "&";
              }
              query += `applicant_phone=${updated.applicant_phone}`;
            }
            if (updated.job_req_id) {
              if (query.length > 1) {
                query += "&";
              }
              query += `job_req_id=${updated.job_req_id}`;
            }

            if (updated.job_spoc_name) {
              if (query.length > 1) {
                query += "&";
              }
              query += `job_spoc_name=${updated.job_spoc_name}`;
            }
            if (updated.job_company_name) {
              if (query.length > 1) {
                query += "&";
              }
              query += `job_company_name=${updated.job_company_name}`;
            }

            if (query.length > 1) {
              query += "&";
            }
            query += `page=1&limit=${PAGELIMIT}`

            history.push({
              search: query,
            });
            dispatch(
              applicationListRequest({
                query,
              })
            );
          }}
        />
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

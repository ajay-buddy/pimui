import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileCreateRequest, profileListRequest } from "../app/profileSlice";
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
  bulkJobRequest,
  jobCreateRequest,
  jobDeleteRequest,
  jobListRequest,
  jobListSelector,
  jobSearchListSelector,
} from "../app/jobSlice/index";
import {
  JobFilterConfig,
  JobFormConfig,
} from "../constants/form-config/job.config";
import FileUploader from "../components/molecules/file-importer";
import { readJob } from "../utills/bulk-file-reader/job";
import Paginate from "../components/molecules/paginate";
import { useHistory } from "react-router-dom";

export default function Job() {
  const [bulUpload, setBulkUpload] = useState(false);
  const [spocList] = useSelector(spocListSelector);
  const [jobList, jobListTotal] = useSelector(jobListSelector);
  const jobSerach = useSelector(jobSearchListSelector);
  const tagList = useSelector(tagListSelector);
  const companyList = useSelector(companyListSelector);

  const [filtering, setFiltering] = useState(false);
  const [filterData, setFilterData] = useState({});

  const [userData, setUserData] = useState({});
  const [add, setAdding] = useState(false);
  const [edit, setEditing] = useState(false);
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
    if (!value) return;
    dispatch(spocListRequest({ query: `?name=${value}` }));
  };

  useEffect(() => {
    dispatch(jobListRequest({ query: history?.location?.search }));
  }, []);
  return (
    <div>
      <Button variant="Primary" onClick={() => setAdding(!add)}>
        Create Job
      </Button>
      <Button variant="Primary" onClick={() => setFiltering(!filtering)}>
        Filter Jobs
      </Button>
      <Button
        variant="Primary"
        onClick={() => {
          setBulkUpload(!bulUpload);
        }}
      >
        Bulk Create Jobs
      </Button>
      {bulUpload && (
        <FileUploader
          readFunction={async (data, filename) => {
            const result = readJob(data, filename);
            console.log(result);
            result.forEach((d) => dispatch(bulkJobRequest(d)));
            // dispatch(bulkRegisterRequest(result));
          }}
        />
      )}
      {filtering && (
        <CustomForm
          {...JobFilterConfig({
            createTag,
            tagList,
            getTag,
            spocList,
            getSpoc,
          })}
          onChange={setFilterData}
          value={filterData}
          onSubmit={() => {
            const data = { ...filterData };
            console.log(data);
            const updated = {
              ...data,
              ...{
                spoc:
                  data.spoc && data.spoc.length
                    ? data.spoc.map((d) => d?.value?.id).join(",")
                    : "",
                job_tags:
                  data.job_tags && data.job_tags.length
                    ? data.job_tags.map((d) => d?.value?.id).join(",")
                    : "",
              },
            };
            let query = "?";
            if (updated.s_req_date && updated.e_req_date) {
              if (query.length > 1) {
                query += "&";
              }
              query += `s_req_date=${updated.s_req_date}&e_req_date=${updated.e_req_date}`;
            }
            if (updated.req_id) {
              if (query.length > 1) {
                query += "&";
              }
              query += `req_id=${updated.req_id}`;
            }
            if (updated.job_tags) {
              if (query.length > 1) {
                query += "&";
              }
              query += `job_tags=${updated.job_tags}`;
            }
            if (updated.email) {
              if (query.length > 1) {
                query += "&";
              }
              query += `email=${updated.email}`;
            }
            if (updated.spoc) {
              if (query.length > 1) {
                query += "&";
              }
              query += `spoc=${updated.spoc}`;
            }
            if (updated.priority) {
              if (query.length > 1) {
                query += "&";
              }
              query += `priority=${updated.priority}`;
            }

            if (updated.submited_by) {
              if (query.length > 1) {
                query += "&";
              }
              query += `submited_by=${updated.submited_by}`;
            }
            // if (updated.name) {
            //   if (query.length > 1) {
            //     query += "&";
            //   }
            //   query += `name=${updated.name}`;
            // }

            history.push({
              search: query,
            });
            dispatch(
              jobListRequest({
                query,
              })
            );
          }}
        />
      )}
      {(edit || add) && (
        <CustomForm
          {...JobFormConfig({ tagList, getTag, spocList, getSpoc })}
          // {...CandidateProfileFormConfig({ createTag, tagList, getTag })}
          onChange={setUserData}
          value={userData}
          onSubmit={() => {
            const data = { ...userData };
            if (data.spoc) {
              if (data.spoc.__isNew__) {
                data.spoc = { email: data.spoc.value };
              } else if (data.spoc.value) {
                data.spoc = data.spoc.value;
              }
            }
            if (data.job_tags) {
              data["job_tags"] = data["job_tags"].map((d) => {
                if (d.__isNew__) {
                  return { name: d.value };
                } else {
                  return d.value || d;
                }
              });
            }
            dispatch(jobCreateRequest({ ...data }));
          }}
        />
      )}
      <ListView
        headers={jobHeaders}
        list={jobList}
        onDelete={(id) => dispatch(jobDeleteRequest(id))}
        onEdit={(data) => {
          setEditing(true);
          setUserData({ ...data });
        }}
      />
      <Paginate
        total={jobListTotal || 0}
        updateFunction={(q) => {
          console.log(q);
          dispatch(jobListRequest({ query: q }));
        }}
      />
    </div>
  );
}

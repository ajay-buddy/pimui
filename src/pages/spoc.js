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
import {
  SpocFormConfig,
  SpocFilterConfig,
} from "../constants/form-config/spoc.config";
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
  bulkSpocRequest,
  spocCreateRequest,
  spocDeleteRequest,
  spocListRequest,
} from "../app/spocSlice";
import { spocListSelector } from "../app/spocSlice/index";
import { readSpoc } from "../utills/bulk-file-reader/spoc";
import FileUploader from "../components/molecules/file-importer/index";
import Paginate from "../components/molecules/paginate";
import { useHistory } from "react-router-dom";

export default function Spoc() {
  const [bulUpload, setBulkUpload] = useState(false);
  const [spocList, spocListTotal] = useSelector(spocListSelector);
  const tagList = useSelector(tagListSelector);
  const companyList = useSelector(companyListSelector);
  const recruiterList = useSelector(managerProfileListSelector);

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

  const getRecruiter = (value) => {
    dispatch(
      managerProfileListRequest({
        type: TYPE.ADMIN,
        value: value,
      })
    );
  };

  const getCompany = (value) => {
    dispatch(companyListRequest(value));
  };

  const createCompany = (value) => {
    dispatch(companyCreateRequest({ ...value }));
  };

  useEffect(() => {
    dispatch(spocListRequest({ query: history?.location?.search }));
  }, []);
  return (
    <div>
      <Button variant="Primary" onClick={() => setAdding(!add)}>
        Create Spoc
      </Button>
      <Button variant="Primary" onClick={() => setFiltering(!filtering)}>
        Filter Soc
      </Button>
      <Button
        variant="Primary"
        onClick={() => {
          setBulkUpload(!bulUpload);
        }}
      >
        Bulk Create Spoc
      </Button>
      {bulUpload && (
        <FileUploader
          readFunction={async (data, filename) => {
            const result = readSpoc(data, filename);
            console.log(result);
            result.forEach((d) => dispatch(bulkSpocRequest(d)));
            // dispatch(bulkRegisterRequest(result));
          }}
        />
      )}
      {filtering && (
        <CustomForm
          {...SpocFilterConfig({
            companyList,
            getCompany,
            createCompany,
            recruiterList,
            getRecruiter,
          })}
          onChange={setFilterData}
          value={filterData}
          onSubmit={() => {
            const data = { ...filterData };
            console.log(data);
            const updated = {
              ...data,
              ...{
                company:
                  data.company && data.company.length
                    ? data.company.map((d) => d?.value?.id).join(",")
                    : "",
                owner:
                  data.owner && data.owner.length
                    ? data.owner.map((d) => d?.value?.id).join(",")
                    : "",
                recruiters:
                  data.recruiters && data.recruiters.length
                    ? data.recruiters.map((d) => d?.value?.id).join(",")
                    : "",
              },
            };
            let query = "?";
            if (updated.name) {
              if (query.length > 1) {
                query += "&";
              }
              query += `name=${updated.name}`;
            }
            if (updated.email) {
              if (query.length > 1) {
                query += "&";
              }
              query += `email=${updated.email}`;
            }
            if (updated.phone) {
              if (query.length > 1) {
                query += "&";
              }
              query += `phone=${updated.phone}`;
            }

            if (updated.company) {
              if (query.length > 1) {
                query += "&";
              }
              query += `company=${updated.company}`;
            }
            if (updated.owner) {
              if (query.length > 1) {
                query += "&";
              }
              query += `owner=${updated.owner}`;
            }
            if (updated.recruiters) {
              if (query.length > 1) {
                query += "&";
              }
              query += `recruiters=${updated.recruiters}`;
            }

            history.push({
              search: query,
            });
            dispatch(
              spocListRequest({
                query,
              })
            );
          }}
        />
      )}
      {(edit || add) && (
        <CustomForm
          {...SpocFormConfig({
            companyList,
            getCompany,
            createCompany,
            recruiterList,
            getRecruiter,
          })}
          // {...CandidateProfileFormConfig({ createTag, tagList, getTag })}
          onChange={setUserData}
          value={userData}
          onSubmit={() => {
            const data = { ...userData };
            if (data.company) {
              if (data.company.__isNew__) {
                data.company = { name: data.company.value };
              } else if (data.company.value) {
                data.company = data.company.value;
              }
            }
            if (data.recruiters) {
              data.recruiters = data.recruiters?.map((d) => {
                if (d.__isNew__) {
                  return { email: d.value };
                } else if (d.value) {
                  return { ...d.value };
                }
              });
            }
            dispatch(spocCreateRequest({ ...data }));
          }}
        />
      )}
      <ListView
        headers={spocHeaders}
        list={spocList}
        onDelete={(id) => dispatch(spocDeleteRequest(id))}
        onEdit={(data) => {
          setEditing(true);
          setUserData({ ...data });
        }}
      />
      <Paginate
        total={spocListTotal || 0}
        updateFunction={(q) => {
          console.log(q);
          dispatch(spocListRequest({ query: q }));
        }}
      />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "query-string";
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
import { uuid } from "uuidv4";
import {
  CandidateProfileFormConfig,
  CandidateProfileFilterFormConfig,
} from "../constants/form-config/candidate-profile.config";
import { AdminProfileFormConfig } from "../constants/form-config/admin-profile.config";
import {
  tagListSelector,
  tagCreateRequest,
  tagListRequest,
} from "../app/tagSlice/index";
import {
  bulkRegisterRequest,
  getProfileUrlRequest,
  profileUrlSelector,
  registerRequest,
} from "../app/authSlice";
import { actionListRequest } from "../app/actionSlice";
import FileUploader from "../components/molecules/file-importer";
import { readCandidates } from "../utills/bulk-file-reader/candidates";
import { useHistory } from "react-router-dom";
import Paginate from "../components/molecules/paginate";
import axios from "axios";

export default function Candidates() {
  const [bulUpload, setBulkUpload] = useState(false);
  const [profileList, profileTotal] = useSelector(profileListSelector);
  const tagList = useSelector(tagListSelector);
  const [managerList, managerListTotal] = useSelector(profileListSelector);
  const [fileData, setFileDate] = useState(null);
  const resumeUploadUrl = useSelector(profileUrlSelector);
  const history = useHistory();

  useEffect(() => {
    dispatch(
      profileListRequest({
        type: TYPE.CANDIDATE,
        query: history?.location?.search,
      })
    );
  }, []);

  const [userData, setUserData] = useState({});
  const [add, setAdding] = useState(false);
  const [edit, setEditing] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [filterData, setFilterData] = useState({});
  const dispatch = useDispatch();

  useEffect(async () => {
    console.log("****", resumeUploadUrl);
    if (resumeUploadUrl && fileData) {
      try {
        const resp = await axios({
          method: "PUT",
          data: fileData,
          url: resumeUploadUrl,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (e) => console.log("==>", e),
        });
        console.log("--->", resp);
      } catch (e) {
        console.log(e, e.message);
      }
    }
  }, [resumeUploadUrl]);

  const createTag = (value) => {
    dispatch(tagCreateRequest(value));
  };

  const getTag = (value) => {
    dispatch(tagListRequest(value));
  };

  const getManager = (value) => {
    dispatch(profileListRequest(TYPE.ADMIN));
  };

  const onResumeUpload = (file) => {
    const fileName = `${uuid()}.pdf`;
    Object.defineProperty(file, "name", {
      writable: true,
      value: fileName,
    });
    setUserData({ ...userData, ...{ resumeUrl: fileName } });
    setFileDate(file);
    dispatch(getProfileUrlRequest({ image_name: fileName, image_type: "pdf" }));
  };

  return (
    <div>
      <Button variant="Primary" onClick={() => setAdding(!add)}>
        Create Candidate
      </Button>
      <Button variant="Primary" onClick={() => setFiltering(!filtering)}>
        Filter Candidate
      </Button>
      <Button
        variant="Primary"
        onClick={() => {
          setBulkUpload(!bulUpload);
        }}
      >
        Bulk Create Candidate
      </Button>
      {bulUpload && (
        <FileUploader
          readFunction={async (data, filename) => {
            const result = readCandidates(data, filename);
            console.log(result);
            result.forEach((d) => dispatch(bulkRegisterRequest(d)));
            // dispatch(bulkRegisterRequest(result));
          }}
        />
      )}
      {(edit || add) && (
        <CustomForm
          {...CandidateProfileFormConfig({
            createTag,
            tagList,
            getTag,
            onResumeUpload,
          })}
          onChange={setUserData}
          value={userData}
          onSubmit={() => {
            const data = { ...userData };
            if (data.profile_tags) {
              data["profile_tags"] = data["profile_tags"].map((d) => {
                if (d.__isNew__) {
                  return { name: d.value };
                } else {
                  return d.value || d;
                }
              });
            }

            if (data.profile_stags) {
              data["profile_stags"] = data["profile_stags"].map((d) => {
                if (d.__isNew__) {
                  return { name: d.value };
                } else {
                  return d.value || d;
                }
              });
            }
            if (data.manager) {
              if (data.manager.label) {
                data.manager = data.manager.value;
              }
            }

            if (edit) {
              return dispatch(profileCreateRequest({ ...data }));
            }

            return dispatch(
              registerRequest({
                username: data.email,
                password: "%^VB^^ggY&b",
                user_type: TYPE.CANDIDATE,
                profile: { ...data },
              })
            );

            // dispatch(profileCreateRequest(data));
          }}
        />
      )}
      {filtering && (
        <CustomForm
          {...CandidateProfileFilterFormConfig({ createTag, tagList, getTag })}
          onChange={setFilterData}
          value={filterData}
          onSubmit={() => {
            const data = { ...filterData };
            console.log(data);
            const updated = {
              ...data,
              ...{
                profile_tags:
                  data.profile_tags && data.profile_tags.length
                    ? data.profile_tags.map((d) => d?.value?.id).join(",")
                    : "",
                profile_stags:
                  data.profile_stags && data.profile_stags.length
                    ? data.profile_stags.map((d) => d?.value?.id).join(",")
                    : "",
              },
            };
            let query = "?";
            if (updated.profile_stags) {
              if (query.length > 1) {
                query += "&";
              }
              query += `s_tags=${updated.profile_stags}`;
            }
            if (updated.profile_tags) {
              if (query.length > 1) {
                query += "&";
              }
              query += `p_tags=${updated.profile_tags}`;
            }
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
            console.log(updated);
            if (updated.c_location) {
              if (query.length > 1) {
                query += "&";
              }
              query += `c_location=${updated.c_location}`;
            }
            if (updated.p_location) {
              if (query.length > 1) {
                query += "&";
              }
              query += `p_location=${updated.p_location}`;
            }
            if (updated.min_experience) {
              if (query.length > 1) {
                query += "&";
              }
              query += `min_experience=${updated.min_experience}`;
            }
            if (updated.max_experience) {
              if (query.length > 1) {
                query += "&";
              }
              query += `max_experience=${updated.max_experience}`;
            }
            if (updated.min_current_ctc) {
              if (query.length > 1) {
                query += "&";
              }
              query += `min_current_ctc=${updated.min_current_ctc}`;
            }
            if (updated.max_current_ctc) {
              if (query.length > 1) {
                query += "&";
              }
              query += `max_current_ctc=${updated.max_current_ctc}`;
            }
            if (updated.min_expected_ctc) {
              if (query.length > 1) {
                query += "&";
              }
              query += `min_expected_ctc=${updated.min_expected_ctc}`;
            }
            if (updated.max_expected_ctc) {
              if (query.length > 1) {
                query += "&";
              }
              query += `max_expected_ctc=${updated.max_expected_ctc}`;
            }
            if (updated.min_notice) {
              if (query.length > 1) {
                query += "&";
              }
              query += `min_notice=${updated.min_notice}`;
            }
            if (updated.max_notice) {
              if (query.length > 1) {
                query += "&";
              }
              query += `max_notice=${updated.max_notice}`;
            }
            if (updated.headline) {
              if (query.length > 1) {
                query += "&";
              }
              query += `headline=${updated.headline}`;
            }

            history.push({
              search: query,
            });
            dispatch(
              profileListRequest({
                type: TYPE.CANDIDATE,
                query,
              })
            );
          }}
        />
      )}
      <ListView
        headers={candidateHeaders}
        list={profileList}
        onDelete={(id) => dispatch(profileDeleteRequest(id))}
        onEdit={(data) => {
          setEditing(true);
          setUserData({ ...data });
        }}
      />
      <Paginate
        total={profileTotal || 0}
        updateFunction={(q) => {
          console.log(q);
          dispatch(profileListRequest({ type: TYPE.CANDIDATE, query: q }));
        }}
      />
    </div>
  );
}

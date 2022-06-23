import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "query-string";
import {
  profileCreateRequest,
  profileListRequest,
  profileBulkCreateRequest,
  profileBulkUploadSelector,
} from "../app/profileSlice";
import { TYPE } from "../constants";
import {
  profileListSelector,
  profileDeleteRequest,
  profileRequestSuccessSelector,
} from "../app/profileSlice/index";
import { candidateHeaders, candidateStatusHeaders } from "../constants/headers/candidates.headers";
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
import {
  userApplicationListRequest,
  userApplicationRequestSuccessSelector,
} from "../app/applicationSlice";
import { actionListRequest } from "../app/actionSlice";
import FileUploader from "../components/molecules/file-importer";
import { readCandidates } from "../utills/bulk-file-reader/candidates";
import { useHistory } from "react-router-dom";
import Paginate from "../components/molecules/paginate";
import axios from "axios";
import { candidateBulkHeaders } from "../constants/headers/candidates-bulk.headers";
import { PAGELIMIT } from "../routes";

export default function Candidates() {
  const [bulUpload, setBulkUpload] = useState(false);
  const [profileList, profileTotal] = useSelector(profileListSelector);
  const tagList = useSelector(tagListSelector);
  const [managerList, managerListTotal] = useSelector(profileListSelector);
  const addStatus = useSelector(profileRequestSuccessSelector);
  
  const { success, failed } = useSelector(profileBulkUploadSelector);
  const [showProgress, setShowProgress] = useState({
    success: false,
    failed: false,
  });
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
  useEffect(() => {
    setUserData({});
    setAdding(false);
    setEditing(false);
  }, [addStatus]);
  const [userData, setUserData] = useState({});
  const [add, setAdding] = useState(false);
  const [edit, setEditing] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [userApplication, userApplicationCount] = useSelector(userApplicationRequestSuccessSelector);
  const [statusLogs, setStatusLogs] = useState([]);

  useEffect(() => {
     
     const logs = [];

     if(userApplication && Array.isArray(userApplication)) {
      for(let i = 0; i < userApplication.length; i++) {
       if(!userApplication[i].logs) continue;
        for(let j = 0; j < userApplication[i].logs.length; j++) {
          console.log(userApplication[i])
         if(userApplication[i] && userApplication[i].logs) {
           logs.push({
             name: userApplication[i].logs[j]?.action?.name,
             createdAt: userApplication[i].logs[j]?.created_at,
             createdBy: userApplication[i].logs[j]?.profile?.name,
           })
         }
        }
      }
     }
     setStatusLogs(logs)
  }, [userApplication]);
console.log("====> ", statusLogs )
  const dispatch = useDispatch();
  useEffect(async () => {
    if (resumeUploadUrl && fileData) {
      try {
        const resp = await axios({
          method: "PUT",
          data: fileData,
          url: resumeUploadUrl,
          headers: {
            "Content-Type": "multipart/form-data",
            "Content-Disposition": "inline",
          },
          onUploadProgress: (e) => console.log("==>", e),
        });
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
      <Button
        variant="Primary"
        onClick={() => {
          setUserData({});
          setAdding(!add);
          setFiltering(false);
          setEditing(false);
        }}
      >
        Create Candidate
      </Button>
      <Button
        variant="Primary"
        onClick={() => {
          setAdding(false);
          setEditing(false);
          setFiltering(!filtering);
        }}
      >
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
      <a
        download={true}
        href={`${process.env.S3URL}/candidate - Sheet1.csv`}
      >
        Download Sample File
      </a>
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
            const result = readCandidates(data, filename);
            result.forEach((d) => dispatch(profileBulkCreateRequest(d)));
            // dispatch(bulkRegisterRequest(result));
          }}
        />
      )}
      {showProgress.success && success && success.length > 0 && (
        <ListView
          headers={candidateBulkHeaders}
          list={success}
          onEdit={(data) => {
            setAdding(false);
            setEditing(true);
            setUserData({ ...data });
          }}
        />
      )}
      {showProgress.failed && failed && failed.length > 0 && (
        <ListView
          headers={candidateBulkHeaders}
          list={failed}
          onEdit={(data) => {
            setAdding(false);
            setEditing(true);
            setUserData({ ...data });
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
            data.user_type = TYPE.CANDIDATE;

            if (edit) {
              return dispatch(profileCreateRequest({ ...data }));
            }

            return dispatch(profileCreateRequest({ ...data }));

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

            if (query.length > 1) {
              query += "&";
            }
            query += `page=1&limit=${PAGELIMIT}`;

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
         viewDetails={d => {
          setStatusLogs([]);
          dispatch(userApplicationListRequest({
          id: d.id
        }));
      }}
        details={{
          headers: candidateStatusHeaders,
          list: statusLogs
        }}
      />
     
      <Paginate
        total={profileTotal || 0}
        updateFunction={(q) => {
          dispatch(profileListRequest({ type: TYPE.CANDIDATE, query: q }));
        }}
      />
    </div>
  );
}
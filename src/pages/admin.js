import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileCreateRequest, profileListRequest } from "../app/profileSlice";
import { TYPE } from "../constants";
import {
  profileListSelector,
  profileDeleteRequest,
  managerProfileListRequest,
  managerProfileListSelector,
  profileRequestSuccessSelector,
} from "../app/profileSlice/index";
import { adminHeaders } from "../constants/headers/admin.headers";
import ListView from "../components/organisms/tabel/tabel";
import { Button } from "@material-ui/core";
import CustomForm from "../components/organisms/form";
import FileUploader from "../components/molecules/file-importer";
import { readAdmin } from "../utills/bulk-file-reader/admin";
import { CandidateProfileFormConfig } from "../constants/form-config/candidate-profile.config";
import { AdminProfileFormConfig } from "../constants/form-config/admin-profile.config";
import {
  tagListSelector,
  tagCreateRequest,
  tagListRequest,
} from "../app/tagSlice/index";
import {adminBulkHeaders} from "../constants/headers/admin-bulk.headers"
import { bulkRegisterRequest, registerRequest,registerSelector, bulkRegisterSuccessSelector } from "../app/authSlice";
import { actionListRequest } from "../app/actionSlice";
import Paginate from "../components/molecules/paginate";
import { useHistory } from "react-router-dom";

export default function Admin() {
  const [bulUpload, setBulkUpload] = useState(false);
  const [profileList, profileTotal] = useSelector(profileListSelector);
  const tagList = useSelector(tagListSelector);
  const managerList = useSelector(managerProfileListSelector);
  const addStatus = useSelector(profileRequestSuccessSelector);
  const { success, failed } = useSelector(bulkRegisterSuccessSelector);

  const [showProgress, setShowProgress] = useState({
    success: false,
    failed: false,
  });
  const registerStatus = useSelector(registerSelector);

  const [userData, setUserData] = useState({});
  const [add, setAdding] = useState(false);
  const [edit, setEditing] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setUserData({})
    setAdding(false);
    setEditing(false)
  },[addStatus,registerStatus])

  const createTag = (value) => {
    dispatch(tagCreateRequest(value));
  };

  const getTag = (value) => {
    dispatch(tagListRequest(value));
  };

  const getManager = (value) => {
    dispatch(
      managerProfileListRequest({
        type: TYPE.ADMIN,
        value: value,
      })
    );
  };

  useEffect(() => {
    dispatch(
      profileListRequest({
        type: TYPE.ADMIN,
        query: history?.location?.search,
      })
    );
  }, []);
  return (
    <div>
      <Button variant="Primary" onClick={() => {
        setUserData({});
        setEditing(false)
        setAdding(!add)}}>
        Create Admin
      </Button>
      <Button
        variant="Primary"
        onClick={() => {
          setBulkUpload(!bulUpload);
        }}
      >
        Bulk Create Admin
      </Button>
      <a
        download={true}
        href={`${process.env.S3URL}/admin - Admin.csv`}
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
            const result = readAdmin(data, filename);
            dispatch(bulkRegisterRequest(result));
          }}
        />
      )}
      {showProgress.success && success && success.length > 0 && (
        <ListView
          headers={adminBulkHeaders}
          list={success}
          onEdit={(data) => {
            if(data && data.profile) {
              setAdding(false)
              setEditing(true);
              setUserData({ ...data.profile });
            }
          }}
        />
      )}
      {showProgress.failed && failed && failed.length > 0 && (
        <ListView
          headers={adminBulkHeaders}
          list={failed}
          onEdit={(data) => {
            if(data && data.profile) {
              setAdding(false)
              setEditing(true);
              setUserData({ ...data.profile });
            }
          }}
        />
      )}
      {(edit || add) && (
        <CustomForm
          {...AdminProfileFormConfig({ managerList, getManager })}
          // {...CandidateProfileFormConfig({ createTag, tagList, getTag })}
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
            data.user_type = TYPE.ADMIN;

            return dispatch(
              registerRequest({
                username: data.email,
                password: "%^VB^^ggY&b",
                user_type: TYPE.ADMIN,
                profile: { ...data },
              })
            );

            // dispatch(profileCreateRequest(data));
          }}
        />
      )}
      <ListView
        headers={adminHeaders}
        list={profileList}
        onDelete={(id) => dispatch(profileDeleteRequest(id))}
        onEdit={(data) => {
          setAdding(false)
          setEditing(true);
          setUserData({ ...data });
        }}
      />
      <Paginate
        total={profileTotal || 0}
        updateFunction={(q) => {
          dispatch(profileListRequest({ type: TYPE.ADMIN, query: q }));
        }}
      />
    </div>
  );
}
